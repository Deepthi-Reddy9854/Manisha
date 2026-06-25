import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Keep localStorage in sync with cart state
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, shopId, shopName, quantity = 1, purchaseType = 'single') => {
    const availableStock = product.stock[shopId] || 0;
    const itemsPerCarton = 20;
    
    if (availableStock <= 0) {
      throw new Error(`This item is currently out of stock at ${shopName}.`);
    }

    const maxStockAllowed = purchaseType === 'carton' ? Math.floor(availableStock / itemsPerCarton) : availableStock;
    if (purchaseType === 'carton' && maxStockAllowed < 1) {
      throw new Error(`Not enough stock at ${shopName} to form a full carton (requires at least ${itemsPerCarton} units). Only ${availableStock} units left.`);
    }

    // Clamp the requested quantity to [1, 20]
    const clampedQty = Math.max(1, Math.min(20, quantity));

    setCartItems(prevItems => {
      // Find if item already exists in cart for the SAME shop and SAME purchaseType
      const existingIndex = prevItems.findIndex(
        item => item.productId === product.id && item.shopId === shopId && item.purchaseType === purchaseType
      );

      if (existingIndex > -1) {
        const existingItem = prevItems[existingIndex];
        const maxAllowed = Math.min(20, maxStockAllowed);
        const newQuantity = Math.min(maxAllowed, existingItem.quantity + clampedQty);

        if (newQuantity === existingItem.quantity) {
          throw new Error(`Cannot add more. The limit is 20 ${purchaseType === 'carton' ? 'cartons' : 'units'}, and you already have ${existingItem.quantity} in your cart.`);
        }

        const updatedItems = [...prevItems];
        updatedItems[existingIndex] = {
          ...existingItem,
          quantity: newQuantity
        };
        return updatedItems;
      } else {
        // New item entry
        if (clampedQty > maxStockAllowed) {
          throw new Error(`Cannot add requested amount. Stock only has ${maxStockAllowed} ${purchaseType === 'carton' ? 'cartons' : 'units'} at ${shopName}.`);
        }

        return [
          ...prevItems,
          {
            productId: product.id,
            name: purchaseType === 'carton' ? `${product.name} (Carton of 20)` : product.name,
            price: purchaseType === 'carton' ? product.price * itemsPerCarton : product.price,
            image: product.image,
            category: product.category,
            quantity: clampedQty,
            purchaseType,
            shopId,
            shopName,
            maxStock: maxStockAllowed
          }
        ];
      }
    });
  };

  const updateQuantity = (productId, shopId, newQuantity, purchaseType = 'single') => {
    const clampedQty = Math.max(1, Math.min(20, newQuantity));

    setCartItems(prevItems =>
      prevItems.map(item => {
        if (item.productId === productId && item.shopId === shopId && item.purchaseType === purchaseType) {
          const maxAllowed = Math.min(20, item.maxStock);
          const finalQuantity = Math.min(maxAllowed, clampedQty);
          return { ...item, quantity: finalQuantity };
        }
        return item;
      })
    );
  };

  const removeFromCart = (productId, shopId, purchaseType = 'single') => {
    setCartItems(prevItems =>
      prevItems.filter(item => !(item.productId === productId && item.shopId === shopId && item.purchaseType === purchaseType))
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  // Calculations
  const totalPrice = parseFloat(
    cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)
  );
  
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        totalPrice,
        totalItems
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
