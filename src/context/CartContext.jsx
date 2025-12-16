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

  // Use guest cart key if no user
  const userCartKey = user?.email ? `cart_${user.email}` : 'cart_guest';

  // Always default to [] if storage returns null/undefined
  const [items, setItems] = useState(() => storage.get(userCartKey, []) || []);

  // Reset items when userCartKey changes (login/logout)
  useEffect(() => {
    setItems(storage.get(userCartKey, []) || []);
  }, [userCartKey]);

  // Persist cart whenever items change
  useEffect(() => {
    storage.set(userCartKey, items);
  }, [items, userCartKey]);

  // Clear guest cart when user logs in
  useEffect(() => {
    if (user?.email) {
      storage.set('cart_guest', []);
    }
  }, [user]);

  const key = (productId, weight) => `${productId}_${weight}`;

  /** Add item to cart */
  const addItem = useCallback(({ productId, name, weight, unitPrice }) => {
    const k = key(productId, weight);
    setItems(prev => {
      const existing = prev.find(i => i.key === k);
      if (existing) {
        return prev.map(i =>
          i.key === k
            ? {
                ...i,
                quantity: i.quantity + 1,
                totalPrice: (i.quantity + 1) * i.unitPrice
              }
            : i
        );
      }
      const newItem = {
        key: k,
        productId,
        name,
        weight,
        quantity: 1,
        unitPrice,
        totalPrice: unitPrice
      };
      return [...prev, newItem];
    });
    return { ok: true };
  }, []);

  /** Update quantity of an item */
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

  /** Update weight/price of an item */
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

  /** Clear cart */
  const clearCart = useCallback(() => {
    setItems([]);
    return { ok: true };
  }, []);

  /** Totals */
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
