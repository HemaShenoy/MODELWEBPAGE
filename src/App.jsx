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

// ✅ Import ScrollToTop
import ScrollToTop from './components/scroll totop.jsx';

const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <ThemeModeProvider>
          <BrowserRouter>
            
            <ScrollToTop />

            <Routes>
              <Route path="/" element={<Navigate to="/login" replace />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/category/:id" element={<Dashboard />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route
                path="/checkout"
                element={
                  <ProtectedRoute>
                    <Checkout />
                  </ProtectedRoute>
                }
              />
              <Route path="/info/:section" element={<InfoPage />} />
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
          </BrowserRouter>
        </ThemeModeProvider>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
