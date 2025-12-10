// Import images
import gulabjamunImg from '../assets/images/gulabjamun.jpg';
import rasgullaImg from '../assets/images/rasgulla.jpg';
import kajukatliImg from '../assets/images/kajukatli.jpg';

import masalchipsImg from '../assets/images/masalchips.jpg';
import samosaImg from '../assets/images/samosa.jpg';
import pakoraImg from '../assets/images/pakora.jpg';

import mangolassiImg from '../assets/images/mangolassi.jpg';
import masalachaiImg from '../assets/images/masalachai.jpg';
import coldcoffeeImg from '../assets/images/coldcoffee.jpg';

export const PRODUCTS = [
  // ✅ Sweets
  {
    id: 'sw1',
    category: 'sweets',
    name: 'Gulab Jamun',
    image: gulabjamunImg,
    prices: { '200': 120, '400': 220, '600': 300 }
  },
  {
    id: 'sw2',
    category: 'sweets',
    name: 'Rasgulla',
    image: rasgullaImg,
    prices: { '200': 100, '400': 180, '600': 250 }
  },
  {
    id: 'sw3',
    category: 'sweets',
    name: 'Kaju Katli',
    image: kajukatliImg,
    prices: { '200': 150, '400': 280, '600': 400 }
  },

  // ✅ Snacks
  {
    id: 'sn1',
    category: 'snacks',
    name: 'Masala Chips',
    image: masalchipsImg,
    prices: { '200': 90, '400': 160, '600': 220 }
  },
  {
    id: 'sn2',
    category: 'snacks',
    name: 'Samosa',
    image: samosaImg,
    prices: { '200': 60, '400': 110, '600': 160 }
  },
  {
    id: 'sn3',
    category: 'snacks',
    name: 'Pakora',
    image: pakoraImg,
    prices: { '200': 70, '400': 130, '600': 180 }
  },

  // ✅ Beverages
  {
    id: 'bv1',
    category: 'beverages',
    name: 'Mango Lassi',
    image: mangolassiImg,
    prices: { '200': 80, '400': 150, '600': 200 }
  },
  {
    id: 'bv2',
    category: 'beverages',
    name: 'Masala Chai',
    image: masalachaiImg,
    prices: { '200': 50, '400': 90, '600': 120 }
  },
  {
    id: 'bv3',
    category: 'beverages',
    name: 'Cold Coffee',
    image: coldcoffeeImg,
    prices: { '200': 100, '400': 180, '600': 250 }
  }
];
