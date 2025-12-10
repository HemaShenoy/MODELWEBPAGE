import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { storage } from '../services/storage.js';
import { useAuth } from './AuthContext.jsx';

const CartContext = createContext(null);
const CART_KEY = 'app_cart';

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [items, setItems] = useState(storage.get(CART_KEY, []));

  useEffect(() => storage.set(CART_KEY, items), [items]);

  const key = (productId, weight) => `${productId}_${weight}`;

  const addItem = ({ productId, name, weight, unitPrice }) => {
    if (!user) return { error: 'AUTH_REQUIRED' };
    const k = key(productId, weight);
    setItems(prev => {
      const existing = prev.find(i => i.key === k);
      if (existing) {
        return prev.map(i => i.key === k ? { ...i, quantity: i.quantity + 1, totalPrice: (i.quantity + 1) * i.unitPrice } : i);
      }
      const newItem = { key: k, productId, name, weight, quantity: 1, unitPrice, totalPrice: unitPrice };
      return [...prev, newItem];
    });
    return { ok: true };
  };

  const updateQuantity = (productId, weight, quantity) => {
    const k = key(productId, weight);
    setItems(prev => {
      const existing = prev.find(i => i.key === k);
      if (!existing) return prev;
      if (quantity <= 0) return prev.filter(i => i.key !== k);
      return prev.map(i =>
        i.key === k ? { ...i, quantity, totalPrice: quantity * i.unitPrice } : i
      );
    });
  };

  const updateWeight = (productId, oldWeight, newWeight, newUnitPrice) => {
    const oldKey = key(productId, oldWeight);
    setItems(prev => {
      const existing = prev.find(i => i.key === oldKey);
      if (!existing) return prev;
      const newKey = key(productId, newWeight);
      const updated = { ...existing, weight: newWeight, unitPrice: newUnitPrice, totalPrice: existing.quantity * newUnitPrice, key: newKey };
      const filtered = prev.filter(i => i.key !== oldKey);
      // Merge if an item with newKey already exists
      const same = filtered.find(i => i.key === newKey);
      if (same) {
        return filtered.map(i => i.key === newKey
          ? { ...i, quantity: i.quantity + updated.quantity, totalPrice: (i.quantity + updated.quantity) * updated.unitPrice }
          : i
        );
      }
      return [...filtered, updated];
    });
  };

  const clearCart = () => setItems([]);

  const totalCount = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.totalPrice, 0);

  const value = useMemo(() => ({
    items, addItem, updateQuantity, updateWeight, clearCart, totalCount, totalPrice
  }), [items, totalCount, totalPrice]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);
