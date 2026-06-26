import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.join(__dirname, 'data', 'db.json');

const unsplashImages = {
  oilslubricants: [
    'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&q=80&w=600',
    'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=600',
    'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&q=80&w=600'
  ],
  batteriespower: [
    'https://images.unsplash.com/photo-1615906655593-ad0386982a0f?auto=format&fit=crop&q=80&w=600',
    'https://images.unsplash.com/photo-1552656967-7a0991a13906?auto=format&fit=crop&q=80&w=600',
    'https://images.unsplash.com/photo-1615906655593-ad0386982a0f?auto=format&fit=crop&q=80&w=600'
  ],
  tyreswheels: [
    'https://images.unsplash.com/photo-1506015391300-4802dc74de2e?auto=format&fit=crop&q=80&w=600',
    'https://images.unsplash.com/photo-1616422285623-13ff0162193c?auto=format&fit=crop&q=80&w=600',
    'https://images.unsplash.com/photo-1578844251758-2f71da64c96f?auto=format&fit=crop&q=80&w=600'
  ],
  spareparts: [
    'https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?auto=format&fit=crop&q=80&w=600',
    'https://images.unsplash.com/photo-1517524206127-48bbd363f3d7?auto=format&fit=crop&q=80&w=600',
    'https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?auto=format&fit=crop&q=80&w=600'
  ],
  toolsequipment: [
    'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&q=80&w=600',
    'https://images.unsplash.com/photo-1534224039826-c7a0eda0e6b3?auto=format&fit=crop&q=80&w=600',
    'https://images.unsplash.com/photo-1508974239320-0a029497e820?auto=format&fit=crop&q=80&w=600'
  ]
};


const categories = {
  'Oils & Lubricants': {
    brands: ['Mobil', 'Castrol', 'Fuchs', 'Shell', 'Motul', 'Valvoline', 'WD-40'],
    unit: 'per Litre',
    items: [
      { name: 'Grease HP 222 Multi-Purpose', brand: 'Mobil', price: 550, unit: 'per Piece', imageIdx: 3 },
      { name: 'ATF Dex III Automatic Fluid', brand: 'Castrol', price: 900, unit: 'per Litre', imageIdx: 1 },
      { name: 'Titan GT1 Pro 2312 0W-30', brand: 'Fuchs', price: 4500, unit: 'per Litre', imageIdx: 0 },
      { name: 'WD-40 Smart Straw Multi-Use Can', brand: 'WD-40', price: 350, unit: 'per Can', imageIdx: 2 },
      { name: 'Helix Ultra 5W-40 Synthetic Oil', brand: 'Shell', price: 3800, unit: 'per Litre', imageIdx: 0 },
      { name: 'EDGE Advanced Full Synthetic 5W-30', brand: 'Castrol', price: 4200, unit: 'per Litre', imageIdx: 1 },
      { name: '8100 X-cess Gen2 5W-40 Motor Oil', brand: 'Motul', price: 5200, unit: 'per Litre', imageIdx: 2 },
      { name: 'SynPower Full Synthetic 0W-20', brand: 'Valvoline', price: 4100, unit: 'per Litre', imageIdx: 0 },
      { name: 'Super 3000 Formula V 5W-30', brand: 'Mobil', price: 3900, unit: 'per Litre', imageIdx: 3 },
      { name: 'Titan Supersyn 5W-40 Performance Oil', brand: 'Fuchs', price: 3200, unit: 'per Litre', imageIdx: 1 },
      { name: 'Rotella T6 Full Synthetic Diesel 5W-40', brand: 'Shell', price: 4900, unit: 'per Litre', imageIdx: 2 },
      { name: '300V Factory Line Road Racing 10W-40', brand: 'Motul', price: 7800, unit: 'per Litre', imageIdx: 0 },
      { name: 'High Mileage with MaxLife 10W-30', brand: 'Valvoline', price: 2800, unit: 'per Litre', imageIdx: 1 },
      { name: 'Magnatec Stop-Start 5W-30 Engine Oil', brand: 'Castrol', price: 3400, unit: 'per Litre', imageIdx: 3 },
      { name: 'Special Tec F 5W-30 Fuel Tech Oil', brand: 'Shell', price: 4600, unit: 'per Litre', imageIdx: 2 }
    ]
  },
  'Batteries & Power': {
    brands: ['Optima', 'Exide', 'Bosch', 'ACDelco', 'Varta'],
    unit: 'per Piece',
    items: [
      { name: 'Yellow Top 12V 55Ah AGM Battery', brand: 'Optima', price: 11000, unit: 'per Piece', imageIdx: 0 },
      { name: 'Red Top Start-Stop Heavy Duty Battery', brand: 'Optima', price: 12500, unit: 'per Piece', imageIdx: 1 },
      { name: 'Exide Xpress Heavy Vehicle Battery', brand: 'Exide', price: 7500, unit: 'per Piece', imageIdx: 2 },
      { name: 'S5 Premium AGM Car Battery 80Ah', brand: 'Bosch', price: 9800, unit: 'per Piece', imageIdx: 0 },
      { name: 'Gold AGM Maintenance Free 70Ah', brand: 'ACDelco', price: 8900, unit: 'per Piece', imageIdx: 1 },
      { name: 'Silver Dynamic AGM 12V 95Ah', brand: 'Varta', price: 14200, unit: 'per Piece', imageIdx: 2 },
      { name: 'Exide Mileage Car Battery ML38B20R', brand: 'Exide', price: 4200, unit: 'per Piece', imageIdx: 0 },
      { name: 'Blue Top Marine Deep Cycle Battery', brand: 'Optima', price: 13500, unit: 'per Piece', imageIdx: 1 },
      { name: 'S4 High Performance Battery 60Ah', brand: 'Bosch', price: 6500, unit: 'per Piece', imageIdx: 2 },
      { name: 'Professional Series Gold Car Battery', brand: 'ACDelco', price: 7800, unit: 'per Piece', imageIdx: 0 },
      { name: 'Black Dynamic Budget Car Battery', brand: 'Varta', price: 4900, unit: 'per Piece', imageIdx: 1 },
      { name: 'Exide EEZY 12V 45Ah Vehicle Power', brand: 'Exide', price: 4800, unit: 'per Piece', imageIdx: 2 },
      { name: 'Heavy Duty Commercial AGM Power cell', brand: 'Bosch', price: 15500, unit: 'per Piece', imageIdx: 0 },
      { name: 'Ultra Gold AGM Power Battery 90Ah', brand: 'ACDelco', price: 11200, unit: 'per Piece', imageIdx: 1 },
      { name: 'Varta Promotive Black Truck Battery', brand: 'Varta', price: 18000, unit: 'per Piece', imageIdx: 2 }
    ]
  },
  'Tyres & Wheels': {
    brands: ['Michelin', 'Bridgestone', 'Continental', 'Pirelli', 'Goodyear', 'Dunlop'],
    unit: 'per Tyre',
    items: [
      { name: 'Defender LTX M/S Radial Tyre', brand: 'Michelin', price: 18900, unit: 'per Tyre', imageIdx: 0 },
      { name: 'Turanza QuietTrack All-Season Tyre', brand: 'Bridgestone', price: 14900, unit: 'per Tyre', imageIdx: 1 },
      { name: 'ExtremeContact DWS06 Plus Ultra', brand: 'Continental', price: 16500, unit: 'per Tyre', imageIdx: 2 },
      { name: 'P Zero High Performance Summer Tyre', brand: 'Pirelli', price: 22000, unit: 'per Tyre', imageIdx: 0 },
      { name: 'Assurance MaxLife Long Wear Tyre', brand: 'Goodyear', price: 11500, unit: 'per Tyre', imageIdx: 1 },
      { name: 'Grandtrek AT20 All-Terrain SUV Tyre', brand: 'Dunlop', price: 13800, unit: 'per Tyre', imageIdx: 2 },
      { name: 'Pilot Sport 4 S Premium Sports Tyre', brand: 'Michelin', price: 24500, unit: 'per Tyre', imageIdx: 0 },
      { name: 'Potenza RE980AS Performance Radial', brand: 'Bridgestone', price: 15800, unit: 'per Tyre', imageIdx: 1 },
      { name: 'ContiPremiumContact 5 Safety Tyre', brand: 'Continental', price: 12500, unit: 'per Tyre', imageIdx: 2 },
      { name: 'Cinturato P7 Blue Eco Touring Tyre', brand: 'Pirelli', price: 14500, unit: 'per Tyre', imageIdx: 0 },
      { name: 'Eagle F1 Asymmetric 5 Race Tyre', brand: 'Goodyear', price: 19800, unit: 'per Tyre', imageIdx: 1 },
      { name: 'Dunlop SP Sport Maxx 050 Performance', brand: 'Dunlop', price: 17500, unit: 'per Tyre', imageIdx: 2 },
      { name: 'Primacy 4 Comfort touring Tyre', brand: 'Michelin', price: 13900, unit: 'per Tyre', imageIdx: 0 },
      { name: 'Alenza AS Ultra Premium SUV Tyre', brand: 'Bridgestone', price: 18500, unit: 'per Tyre', imageIdx: 1 },
      { name: 'Scorpion Verde All-Season SUV Tyre', brand: 'Pirelli', price: 19200, unit: 'per Tyre', imageIdx: 2 }
    ]
  },
  'Spare Parts': {
    brands: ['Brembo', 'Bosch', 'Monroe', 'EBC', 'Akebono', 'Denso', 'NGK'],
    unit: 'per Piece',
    items: [
      { name: 'Ceramic Front Brake Pads Set', brand: 'Brembo', price: 6400, unit: 'per Set', imageIdx: 0 },
      { name: 'Double Platinum Spark Plug Premium', brand: 'Bosch', price: 850, unit: 'per Piece', imageIdx: 1 },
      { name: 'OESpectrum Front Strut Assembly', brand: 'Monroe', price: 7200, unit: 'per Piece', imageIdx: 2 },
      { name: 'Redstuff Premium Ceramic Brake Pads', brand: 'EBC', price: 8500, unit: 'per Set', imageIdx: 0 },
      { name: 'ProACT Ultra-Premium Ceramic Pads', brand: 'Akebono', price: 5900, unit: 'per Set', imageIdx: 1 },
      { name: 'Iridium Power Spark Plug high spark', brand: 'Denso', price: 950, unit: 'per Piece', imageIdx: 2 },
      { name: 'Laser Iridium High Performance Plug', brand: 'NGK', price: 1200, unit: 'per Piece', imageIdx: 0 },
      { name: 'UV Coated Front Brake Rotor Disc', brand: 'Brembo', price: 9500, unit: 'per Piece', imageIdx: 1 },
      { name: 'QuietCast Premium Disc Brake Rotor', brand: 'Bosch', price: 5400, unit: 'per Piece', imageIdx: 2 },
      { name: 'Gas-Magnum Heavy Duty Shock Absorber', brand: 'Monroe', price: 4800, unit: 'per Piece', imageIdx: 0 },
      { name: 'Yellowstuff High Friction Brake Pads', brand: 'EBC', price: 9800, unit: 'per Set', imageIdx: 1 },
      { name: 'Cabin Carbon Premium Air Filter', brand: 'Bosch', price: 1450, unit: 'per Piece', imageIdx: 2 },
      { name: 'High Premium Engine Oil Filter', brand: 'Bosch', price: 890, unit: 'per Piece', imageIdx: 0 },
      { name: 'G-Force Performance Strut Mount', brand: 'Monroe', price: 2900, unit: 'per Piece', imageIdx: 1 },
      { name: 'Brembo Sport HP2000 Track Day Pads', brand: 'Brembo', price: 14500, unit: 'per Set', imageIdx: 2 }
    ]
  }
};

const unsplashImagesByTag = {
  // Oils & Lubricants
  'car,grease': [
    'https://images.unsplash.com/photo-1530047625168-4b18fa25d2c0?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1552656967-7a0991a13906?auto=format&fit=crop&w=600&q=80'
  ],
  'lubricant,spray': [
    'https://images.unsplash.com/photo-1607603750909-408e193868c7?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=600&q=80'
  ],
  'transmission,fluid': [
    'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1552656967-7a0991a13906?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=600&q=80'
  ],
  'motor,oil': [
    'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1552656967-7a0991a13906?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=600&q=80'
  ],
  // Batteries & Power
  'jumper,cables': [
    'https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1615906655593-ad0386982a0f?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1551524559-8af4e6624178?auto=format&fit=crop&w=600&q=80'
  ],
  'car,battery': [
    'https://images.unsplash.com/photo-1615906655593-ad0386982a0f?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1551524559-8af4e6624178?auto=format&fit=crop&w=600&q=80'
  ],
  // Tyres & Wheels
  'race,tire': [
    'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1578844251758-2f71da64c96f?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1506015391300-4802dc74de2e?auto=format&fit=crop&w=600&q=80'
  ],
  'suv,tire': [
    'https://images.unsplash.com/photo-1506015391300-4802dc74de2e?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1616422285623-13ff0162193c?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=600&q=80'
  ],
  'car,tire': [
    'https://images.unsplash.com/photo-1616422285623-13ff0162193c?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1506015391300-4802dc74de2e?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&q=80'
  ],
  // Spare Parts
  'car,brake': [
    'https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1605557626697-2e87166d88f9?auto=format&fit=crop&w=600&q=80'
  ],
  'sparkplug': [
    'https://images.unsplash.com/photo-1517524206127-48bbd363f3d7?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=600&q=80'
  ],
  'car,suspension': [
    'https://images.unsplash.com/photo-1605557626697-2e87166d88f9?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1517524206127-48bbd363f3d7?auto=format&fit=crop&w=600&q=80'
  ],
  'oil,filter': [
    'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1552656967-7a0991a13906?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=600&q=80'
  ],
  'car,engine,parts': [
    'https://images.unsplash.com/photo-1517524206127-48bbd363f3d7?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=600&q=80'
  ],
  // Fallbacks
  'car,parts': [
    'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1517524206127-48bbd363f3d7?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?auto=format&fit=crop&w=600&q=80'
  ]
};

function getProductImages(categoryName, itemName, idCounter) {
  let tags = 'car,parts';
  const nameLower = itemName.toLowerCase();
  
  if (categoryName === 'Oils & Lubricants') {
    if (nameLower.includes('grease')) {
      tags = 'car,grease';
    } else if (nameLower.includes('wd-40') || nameLower.includes('spray')) {
      tags = 'lubricant,spray';
    } else if (nameLower.includes('fluid') || nameLower.includes('atf')) {
      tags = 'transmission,fluid';
    } else {
      tags = 'motor,oil';
    }
  } else if (categoryName === 'Batteries & Power') {
    if (nameLower.includes('booster') || nameLower.includes('cable') || nameLower.includes('charger')) {
      tags = 'jumper,cables';
    } else {
      tags = 'car,battery';
    }
  } else if (categoryName === 'Tyres & Wheels') {
    if (nameLower.includes('sport') || nameLower.includes('performance') || nameLower.includes('race')) {
      tags = 'race,tire';
    } else if (nameLower.includes('all-terrain') || nameLower.includes('suv') || nameLower.includes('ltx')) {
      tags = 'suv,tire';
    } else {
      tags = 'car,tire';
    }
  } else if (categoryName === 'Spare Parts') {
    if (nameLower.includes('brake') || nameLower.includes('pads') || nameLower.includes('rotor') || nameLower.includes('disc')) {
      tags = 'car,brake';
    } else if (nameLower.includes('spark') || nameLower.includes('plug')) {
      tags = 'sparkplug';
    } else if (nameLower.includes('shock') || nameLower.includes('absorber') || nameLower.includes('strut')) {
      tags = 'car,suspension';
    } else if (nameLower.includes('filter')) {
      tags = 'oil,filter';
    } else {
      tags = 'car,engine,parts';
    }
  }

  const pool = unsplashImagesByTag[tags] || unsplashImagesByTag['car,parts'];
  const baseIndex = idCounter % pool.length;
  
  const image = pool[baseIndex];
  const images = [
    pool[baseIndex],
    pool[(baseIndex + 1) % pool.length],
    pool[(baseIndex + 2) % pool.length]
  ];

  return { image, images };
}

async function seed() {
  try {
    const rawData = await fs.readFile(dbPath, 'utf8');
    const db = JSON.parse(rawData);

    const products = [];
    let idCounter = 1;

    for (const [categoryName, categoryConfig] of Object.entries(categories)) {
      for (const item of categoryConfig.items) {
        const { image, images } = getProductImages(categoryName, item.name, idCounter);
        
        // Define stock levels mapping to shop-1, shop-2, shop-3
        const stock = {
          'shop-1': Math.floor(Math.random() * 50) + 5,
          'shop-2': Math.floor(Math.random() * 40) + 2,
          'shop-3': Math.floor(Math.random() * 10) === 0 ? 0 : Math.floor(Math.random() * 30) + 1
        };

        // Generate rating between 4.1 and 4.9
        const rating = parseFloat((4.1 + Math.random() * 0.8).toFixed(1));

        products.push({
          id: `prod-${idCounter++}`,
          name: item.name,
          description: `Premium ${item.brand} ${item.name} designed for maximum reliability and vehicle performance. Extensively tested in professional labs to meet standard OEM criteria and ensure long-term durability.`,
          price: item.price,
          category: categoryName,
          brand: item.brand,
          unit: item.unit,
          image: image,
          images: images,
          stock: stock,
          rating: rating,
          reviews: [
            {
              userId: 'user-cust2',
              userName: 'Sarah Jenkins',
              rating: 5,
              comment: `Top quality product. Highly durable and fits perfectly!`,
              createdAt: new Date(Date.now() - 3600000 * 24 * 5).toISOString()
            },
            {
              userId: 'user-cust2',
              userName: 'Sarah Jenkins',
              rating: Math.floor(rating),
              comment: `Excellent quality, works exactly as advertised. Delivered quickly.`,
              createdAt: new Date(Date.now() - 3600000 * 24 * 3).toISOString()
            }
          ]
        });
      }
    }

    console.log(`Generated ${products.length} products total.`);
    db.products = products;

    await fs.writeFile(dbPath, JSON.stringify(db, null, 2), 'utf8');
    console.log('Successfully wrote to db.json database.');
  } catch (error) {
    console.error('Seeding failed:', error);
  }
}

seed();
