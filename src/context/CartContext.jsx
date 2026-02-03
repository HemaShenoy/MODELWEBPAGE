import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback
} from 'react';
import { storage } from '../services/storage.js';
import { useAuth } from './AuthContext.jsx';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const userCartKey = user?.email ? `cart_${user.email}` : 'cart_guest';
  const [items, setItems] = useState(() => storage.get(userCartKey, []) || []);

  useEffect(() => {
    const currentItems = storage.get(userCartKey, []) || [];
    if (user?.email) {
      const guestItems = storage.get('cart_guest', []) || [];
      if (guestItems.length > 0) {
        const merged = [...currentItems];
        guestItems.forEach(g => {
          const existing = merged.find(i => i.key === g.key);
          if (existing) {
            existing.quantity += g.quantity;
            existing.totalPrice = existing.quantity * existing.unitPrice;
          } else {
            merged.push(g);
          }
        });
        storage.set(userCartKey, merged);
        storage.set('cart_guest', []);
        setItems(merged);
        return;
      }
    }
    setItems(currentItems);
  }, [userCartKey, user]);

  useEffect(() => {
    storage.set(userCartKey, items);
  }, [items, userCartKey]);

  const key = (productId, weight) => `${productId}_${weight}`;

  // ✅ Modified addItem to accept quantity
  const addItem = useCallback(
  ({ productId, name, weight, unitPrice, quantity = 1, image }) => {
    const k = key(productId, weight);
    setItems(prev => {
      const existing = prev.find(i => i.key === k);
      if (existing) {
        return prev.map(i =>
          i.key === k
            ? {
                ...i,
                quantity: i.quantity + quantity,
                totalPrice: (i.quantity + quantity) * i.unitPrice
              }
            : i
        );
      }
      const newItem = {
        key: k,
        productId,
        name,
        weight,
        quantity,
        unitPrice,
        totalPrice: quantity * unitPrice,
        image // ✅ now valid
      };
      return [...prev, newItem];
    });
    return { ok: true };
  },
  []
);


  const updateQuantity = useCallback((productId, weight, quantity) => {
    const k = key(productId, weight);
    setItems(prev => {
      const existing = prev.find(i => i.key === k);
      if (!existing) return prev;
      if (quantity <= 0) return prev.filter(i => i.key !== k);
      return prev.map(i =>
        i.key === k
          ? { ...i, quantity, totalPrice: quantity * i.unitPrice }
          : i
      );
    });
    return { ok: true };
  }, []);

  const updateWeight = useCallback(
    (productId, oldWeight, newWeight, newUnitPrice) => {
      const oldKey = key(productId, oldWeight);
      setItems(prev => {
        const existing = prev.find(i => i.key === oldKey);
        if (!existing) return prev;
        const newKey = key(productId, newWeight);
        const updated = {
          ...existing,
          weight: newWeight,
          unitPrice: newUnitPrice,
          totalPrice: existing.quantity * newUnitPrice,
          key: newKey
        };
        const filtered = prev.filter(i => i.key !== oldKey);
        const same = filtered.find(i => i.key === newKey);
        if (same) {
          return filtered.map(i =>
            i.key === newKey
              ? {
                  ...i,
                  quantity: i.quantity + updated.quantity,
                  totalPrice:
                    (i.quantity + updated.quantity) * updated.unitPrice
                }
              : i
          );
        }
        return [...filtered, updated];
      });
      return { ok: true };
    },
    []
  );

  const clearCart = useCallback(() => {
    setItems([]);
    return { ok: true };
  }, []);

  const totalCount = useMemo(
    () => (Array.isArray(items) ? items.reduce((sum, i) => sum + i.quantity, 0) : 0),
    [items]
  );
  const totalPrice = useMemo(
    () => (Array.isArray(items) ? items.reduce((sum, i) => sum + i.totalPrice, 0) : 0),
    [items]
  );

  const value = useMemo(
    () => ({
      items,
      addItem,
      updateQuantity,
      updateWeight,
      clearCart,
      totalCount,
      totalPrice,
      setItems
    }),
    [items, totalCount, totalPrice, addItem, updateQuantity, updateWeight, clearCart]
  );

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
