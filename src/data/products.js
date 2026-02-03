// Import images
import gulabjamunImg from '../assets/images/gulabjamun.jpg';
import rasgullaImg from '../assets/images/rasgulla.jpg';
import kajukatliImg from '../assets/images/kajukatli.jpg';
import kajurolImg from '../assets/images/kajurol.jpg';

import masalchipsImg from '../assets/images/masalchips.jpg';

import pakoraImg from '../assets/images/pakora.jpg';

import mangolassiImg from '../assets/images/mangolassi.jpg';
import masalachaiImg from '../assets/images/chai.jpg';
import coldcoffeeImg from '../assets/images/coldcoffee.jpg';

import motichoorImg from '../assets/images/motichoor.jpg';
import soanpapdiImg from '../assets/images/soanpapdi.jpg';
import kachoriImg from '../assets/images/kachori.jpg';
import dhoklaImg from '../assets/images/dhokla.jpg';
import badammilkImg from '../assets/images/badammilk.jpg';
import jaljeeraImg from '../assets/images/jaljeera.jpg';

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
    expiry: 'Best before 5 days',
    details: 'Soft, spongy balls soaked in rose-flavored sugar syrup. A festive favorite across India.',
    shelfLife: '5 Days',
    piecesPerKg: '40 Approx',
    shipping: 'India only'
  },
  {
    id: 'sw2',
    category: 'sweets',
    name: 'Rasgulla',
    image: rasgullaImg,
    prices: { '200': 100, '400': 180, '600': 250 },
    ingredients: 'Chenna, sugar syrup',
    uses: 'Popular Bengali sweet, served chilled',
    expiry: 'Best before 3 days',
    details: 'Spongy white balls made from chenna, soaked in light sugar syrup. Refreshing and light dessert.',
    shelfLife: '3 Days',
    piecesPerKg: '30 Approx',
    shipping: 'India only'
  },
  {
    id: 'sw3',
    category: 'sweets',
    name: 'Kaju Katli',
    image: kajukatliImg,
    prices: { '200': 150, '400': 280, '600': 400 },
    ingredients: 'Cashew nuts, sugar, ghee',
    uses: 'Gift sweet during Diwali and weddings',
    expiry: 'Best before 7 days',
    details: 'Thin diamond-shaped cashew fudge. Rich and melt-in-mouth, perfect for gifting during festivals.',
    shelfLife: '7 Days',
    piecesPerKg: '50 Approx',
    shipping: 'Worldwide Shipping: Yes'
  },
  {
    id: 'sw4',
    category: 'sweets',
    name: 'Motichoor Laddu',
    image: motichoorImg,
    prices: { '200': 130, '400': 240, '600': 350 },
    ingredients: 'Gram flour, sugar, ghee, cardamom',
    uses: 'Served during weddings and pujas',
    expiry: 'Best before 5 days',
    details: 'Tiny boondi pearls bound with sugar syrup into golden laddus. Traditional wedding and puja sweet.',
    shelfLife: '5 Days',
    piecesPerKg: '25 Approx',
    shipping: 'India only'
  },
  {
    id: 'sw5',
    category: 'sweets',
    name: 'Soan Papdi',
    image: soanpapdiImg,
    prices: { '200': 100, '400': 180, '600': 260 },
    ingredients: 'Gram flour, sugar, ghee, cardamom',
    uses: 'Light flaky sweet, popular gift item',
    expiry: 'Best before 10 days',
    details: 'Flaky, cube-shaped sweet with a melt-in-mouth texture. Popular as a gift sweet.',
    shelfLife: '10 Days',
    piecesPerKg: '40 Approx',
    shipping: 'Worldwide Shipping: Yes'
  },
  {
    id: 'sw6',
    category: 'sweets',
    name: 'Kaju Rolls',
    image: kajurolImg, 
    prices: { '200': 160, '400': 300, '600': 450 },
    ingredients: 'Cashews, Sugar, Ghee',
    uses: 'Luxurious sweet for Diwali, Holi, weddings, and celebrations',
    expiry: 'Best before 5 days',
    details: 'Kaju Rolls are a luxurious and delicious Indian sweet made primarily from cashew nuts (kaju), sugar, and ghee. These rolls are a rich, melt-in-the-mouth treat often made during festivals or special occasions.',
    shelfLife: '5 Days',
    piecesPerKg: '36 Approx',
    shipping: 'USA/Canada Shipping: Yes'
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
    expiry: 'Best before 10 days',
    details: 'Crispy potato chips tossed with aromatic spices. Perfect companion for tea or coffee breaks.',
    shelfLife: '10 Days',
    shipping: 'India only'
  },

  {
    id: 'sn2',
    category: 'snacks',
    name: 'Pakora',
    image: pakoraImg,
    prices: { '200': 70, '400': 130, '600': 180 },
    ingredients: 'Gram flour, vegetables, spices',
    uses: 'Rainy‑day snack with tea',
    expiry: 'Best before 1 day',
    details: 'Vegetables dipped in gram flour batter and deep fried. Crunchy and perfect with chai.',
    shelfLife: '1 Day',
    shipping: 'Not available'
  },
  {
    id: 'sn3',
    category: 'snacks',
    name: 'Kachori',
    image: kachoriImg,
    prices: { '200': 80, '400': 150, '600': 210 },
    ingredients: 'Flour, lentils, spices',
    uses: 'Spicy snack with chutney',
    expiry: 'Best before 1 day',
    details: 'Round, flaky pastry stuffed with spicy lentil filling. Popular in North India.',
    shelfLife: '1 Day',
    shipping: 'Not available'
  },
  {
    id: 'sn4',
    category: 'snacks',
    name: 'Dhokla',
    image: dhoklaImg,
    prices: { '200': 90, '400': 160, '600': 230 },
    ingredients: 'Gram flour, yogurt, spices',
    uses: 'Gujarati steamed snack',
    expiry: 'Best before 2 days',
    details: 'Soft, spongy steamed cake made from gram flour. Light and healthy snack.',
    shelfLife: '2 Days',
    shipping: 'India only'
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
    expiry: 'Best before 2 days',
    details: 'A chilled yogurt-based drink blended with ripe mango pulp. Sweet, tangy, and refreshing.',
    shelfLife: '2 Days',
    shipping: 'India only'
  },
    {
    id: 'bv2',
    category: 'beverages',
    name: 'Masala Chai',
    image: masalachaiImg,
    prices: { '200': 50, '400': 90, '600': 120 },
    ingredients: 'Tea leaves, milk, spices',
    uses: 'Daily beverage',
    expiry: 'Best before 1 day',
    details: 'Aromatic Indian tea brewed with milk and a blend of spices like cardamom, ginger, and cloves. Comforting and energizing, enjoyed daily across households.',
    shelfLife: '1 Day',
    shipping: 'India only'
  },
  {
    id: 'bv3',
    category: 'beverages',
    name: 'Cold Coffee',
    image: coldcoffeeImg,
    prices: { '200': 100, '400': 180, '600': 250 },
    ingredients: 'Coffee, milk, sugar, ice',
    uses: 'Chilled drink for summer',
    expiry: 'Best before 2 days',
    details: 'Refreshing iced coffee blended with milk and sugar. A perfect chilled drink for hot summer days.',
    shelfLife: '2 Days',
    shipping: 'India only'
  },
  {
    id: 'bv4',
    category: 'beverages',
    name: 'Badam Milk',
    image: badammilkImg,
    prices: { '200': 90, '400': 170, '600': 240 },
    ingredients: 'Milk, almonds, saffron, sugar',
    uses: 'Nutritious drink, served warm or chilled',
    expiry: 'Best before 2 days',
    details: 'Rich almond-flavored milk infused with saffron. Nutritious and aromatic, can be served warm or chilled.',
    shelfLife: '2 Days',
    shipping: 'Worldwide Shipping: Yes'
  },
  {
    id: 'bv5',
    category: 'beverages',
    name: 'Jal Jeera',
    image: jaljeeraImg,
    prices: { '200': 60, '400': 110, '600': 160 },
    ingredients: 'Cumin, mint, lemon, water',
    uses: 'Tangy digestive drink',
    expiry: 'Best before 1 day',
    details: 'A tangy, spiced drink made with cumin, mint, and lemon. Popular as a digestive and cooling summer beverage.',
    shelfLife: '1 Day',
    shipping: 'India only'
  }
];
