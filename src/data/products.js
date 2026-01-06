// Import images
import gulabjamunImg from '../assets/images/gulabjamun.jpg';
import rasgullaImg from '../assets/images/rasgulla.jpg';
import kajukatliImg from '../assets/images/kajukatli.jpg';

import masalchipsImg from '../assets/images/masalchips.jpg';
import samosaImg from '../assets/images/samosa.jpg';
import pakoraImg from '../assets/images/pakora.jpg';

import mangolassiImg from '../assets/images/mangolassi.jpg';
import masalachaiImg from '../assets/images/chai.jpg';
import coldcoffeeImg from '../assets/images/coldcoffee.jpg';

export const PRODUCTS = [
  // ✅ Sweets
  {
    id: 'sw1',
    category: 'sweets',
    name: 'Gulab Jamun',
    image: gulabjamunImg,
    prices: { '200': 120, '400': 220, '600': 300 },
    ingredients: 'Milk solids, sugar, cardamom, rose water',
    uses: 'Served as dessert during festivals and celebrations',
    expiry: 'Best before 5 days'
  },
  {
    id: 'sw2',
    category: 'sweets',
    name: 'Rasgulla',
    image: rasgullaImg,
    prices: { '200': 100, '400': 180, '600': 250 },
    ingredients: 'Chenna, sugar syrup',
    uses: 'Popular Bengali sweet, served chilled',
    expiry: 'Best before 3 days'
  },
  {
    id: 'sw3',
    category: 'sweets',
    name: 'Kaju Katli',
    image: kajukatliImg,
    prices: { '200': 150, '400': 280, '600': 400 },
    ingredients: 'Cashew nuts, sugar, ghee',
    uses: 'Gift sweet during Diwali and weddings',
    expiry: 'Best before 7 days'
  },

  // ✅ Snacks
  {
    id: 'sn1',
    category: 'snacks',
    name: 'Masala Chips',
    image: masalchipsImg,
    prices: { '200': 90, '400': 160, '600': 220 },
    ingredients: 'Potatoes, spices, salt',
    uses: 'Tea‑time snack',
    expiry: 'Best before 10 days'
  },
  {
    id: 'sn2',
    category: 'snacks',
    name: 'Samosa',
    image: samosaImg,
    prices: { '200': 60, '400': 110, '600': 160 },
    ingredients: 'Potatoes, peas, spices, flour',
    uses: 'Popular street snack',
    expiry: 'Best before 1 day'
  },
  {
    id: 'sn3',
    category: 'snacks',
    name: 'Pakora',
    image: pakoraImg,
    prices: { '200': 70, '400': 130, '600': 180 },
    ingredients: 'Gram flour, vegetables, spices',
    uses: 'Rainy‑day snack with tea',
    expiry: 'Best before 1 day'
  },

  // ✅ Beverages
  {
    id: 'bv1',
    category: 'beverages',
    name: 'Mango Lassi',
    image: mangolassiImg,
    prices: { '200': 80, '400': 150, '600': 200 },
    ingredients: 'Yogurt, mango pulp, sugar',
    uses: 'Refreshing summer drink',
    expiry: 'Best before 2 days'
  },
  {
    id: 'bv2',
    category: 'beverages',
    name: 'Masala Chai',
    image: masalachaiImg,
    prices: { '200': 50, '400': 90, '600': 120 },
    ingredients: 'Tea leaves, milk, spices',
    uses: 'Daily beverage',
    expiry: 'Best before 1 day'
  },
  {
    id: 'bv3',
    category: 'beverages',
    name: 'Cold Coffee',
    image: coldcoffeeImg,
    prices: { '200': 100, '400': 180, '600': 250 },
    ingredients: 'Coffee, milk, sugar, ice',
    uses: 'Chilled drink for summer',
    expiry: 'Best before 2 days'
  }
];
