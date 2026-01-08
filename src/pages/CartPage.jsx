import { Box, Typography, Button } from '@mui/material';
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
      
      {/* Topbar (cart icon stays here automatically) */}
      <Topbar />

      {/* Cart Content */}
      <Box sx={{ flex: 1, p: 3 }}>
        {totalCount > 0 ? (
          <>
            {/* Keep Shopping */}
            <Box sx={{ mb: 2 }}>
              <Button
                variant="outlined"
                onClick={() => navigate('/dashboard')}
              >
                ← Keep Shopping
              </Button>
            </Box>

            {/* Cart Items */}
            <CartSummary />
          </>
        ) : (
          <>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Your cart is empty.
            </Typography>

            <Button
              variant="contained"
              onClick={() => navigate('/dashboard')}
            >
              Start Shopping
            </Button>
          </>
        )}
      </Box>

      {/* Footer */}
      <Footer />
    </Box>
  );
};

export default CartPage;
