// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import { CartProvider } from './context/CartContext.jsx';
import { ThemeModeProvider } from './context/ThemeContext.jsx';

import Register from './pages/Register.jsx';
import Login from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Orders from './pages/Orders.jsx';
import Checkout from './pages/CheckOut.jsx';
import CartPage from './pages/CartPage.jsx';
import ProductDetail from './pages/ProdutDetails.jsx';
import ProtectedRoute from './routes/ProtectedRoutes.jsx';
import InfoPage from './pages/InfoPage.jsx';
import SearchResults from './pages/SearchResults.jsx'; 
import ProfilePage from './pages/ProfilePage.jsx';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import ScrollToTop from './components/scroll totop.jsx';

const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <ThemeModeProvider>
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              {/* Default route */}
              <Route path="/" element={<Navigate to="/dashboard" replace />} />

              {/* Public routes */}
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard/:id" element={<Dashboard />} /> {/* ✅ category inside dashboard */}
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/info/:section" element={<InfoPage />} />
              <Route path="/search/:term" element={<SearchResults />} /> {/* ✅ global search */}
              <Route path="/profile" element={<ProfilePage />} />
              {/* Protected routes */}
              <Route
                path="/orders"
                element={
                  <ProtectedRoute>
                    <Orders />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/checkout"
                element={
                  <ProtectedRoute>
                    <Checkout />
                  </ProtectedRoute>
                }
              />

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </BrowserRouter>
        </ThemeModeProvider>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
