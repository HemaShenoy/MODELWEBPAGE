// src/pages/CartPage.jsx
import { Box, Typography } from '@mui/material';
import { useAuth } from '../context/AuthContext.jsx';
import { useCart } from '../context/CartContext.jsx';
import CartSummary from '../components/Cart/CartSummary.jsx';
import Footer from '../components/Footer/Footer.jsx';
import { useNavigate } from 'react-router-dom';
import Topbar from '../components/TopBar/Topbar.jsx';

const CartPage = () => {
  const { user } = useAuth();
  const { totalCount } = useCart();
  const navigate = useNavigate();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Topbar */}
      <Topbar
        publicItems={[
          { key: 'home', label: 'Home', onClick: () => navigate('/dashboard') },
          { key: 'about', label: 'About', onClick: () => alert('SweetShop demo app') }
        ]}
        authItems={[
          { key: 'orders', label: 'My Orders', onClick: () => navigate('/orders') }
        ]}
      />

      {/* Cart summary content */}
      <Box sx={{ flex: 1, p: 2 }}>
        {totalCount > 0 ? (
          <CartSummary />
        ) : (
          <Typography variant="body1" sx={{ mt: 2 }}>
            Your cart is empty. Browse products to add items.
          </Typography>
        )}
      </Box>

      {/* Footer */}
      <Footer />
    </Box>
  );
};

export default CartPage;
