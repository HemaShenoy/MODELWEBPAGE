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
import ProductDetail from './pages/ProdutDetails.jsx';   // ✅ new detail page
import ProtectedRoute from './routes/ProtectedRoutes.jsx';

const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <ThemeModeProvider>
          <BrowserRouter>
            <Routes>
              {/* Default route */}
              <Route path="/" element={<Navigate to="/login" replace />} />

              {/* Public routes */}
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/orders" element={<Orders />} />

              {/* Product detail route */}
              <Route path="/product/:id" element={<ProductDetail />} />

              {/* Protected route: checkout only */}
              <Route
                path="/checkout"
                element={
                  <ProtectedRoute>
                    <Checkout />
                  </ProtectedRoute>
                }
              />

              {/* Catch‑all fallback */}
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
          </BrowserRouter>
        </ThemeModeProvider>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
