import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { storage } from '../services/storage.js';
import { encryptPassword, decryptPassword } from '../utils/crypto.js';

const AuthContext = createContext(null);

const USERS_KEY = 'app_users';
const AUTH_KEY = 'app_auth';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => storage.get(AUTH_KEY, null));
  const [users, setUsers] = useState(() => storage.get(USERS_KEY, []));

  useEffect(() => {
    storage.set(AUTH_KEY, user);
  }, [user]);

  useEffect(() => {
    storage.set(USERS_KEY, users);
  }, [users]);

  const register = ({ email, password }) => {
    if (users.find(u => u.email === email)) {
      throw new Error('Email already registered');
    }
    const encrypted = encryptPassword(password);
    const newUser = { email, password: encrypted, createdAt: Date.now() };
    setUsers(prev => [...prev, newUser]);
    setUser({ email }); // auto login
    return true;
  };

  const login = ({ email, password }) => {
    const found = users.find(u => u.email === email);
    if (!found) throw new Error('User not found');
    const plain = decryptPassword(found.password);
    if (plain !== password) throw new Error('Invalid credentials');
    setUser({ email });
    return true;
  };

  const logout = () => {
    setUser(null);
    return true;
  };

  // Guest browsing: just clear user (null)
  const guestLogin = () => {
    setUser(null);
    return true;
  };

  const value = useMemo(
    () => ({ user, register, login, logout, guestLogin }),
    [user, users]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
