import { Box, Typography, Button, Container, Paper } from '@mui/material';
import { useCart } from '../context/CartContext.jsx';
import CartSummary from '../components/Cart/CartSummary.jsx';
import Footer from '../components/Footer/Footer.jsx';
import { useNavigate } from 'react-router-dom';
import Topbar from '../components/TopBar/Topbar.jsx';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const CartPage = () => {
  const { totalCount } = useCart();
  const navigate = useNavigate();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: '#f5f5f5' }}>
      
      {/* Topbar */}
      <Topbar />

      {/* Cart Content */}
      <Box sx={{ flex: 1, py: 5 }}>
        <Container maxWidth="md">
          {totalCount > 0 ? (
            <>
              {/* Header */}
              <Box sx={{ mb: 4 }}>
                <Button
                  startIcon={<ArrowBackIcon />}
                  onClick={() => navigate('/dashboard')}
                  sx={{
                    color: '#667eea',
                    fontWeight: 600,
                    mb: 3,
                    transition: 'all 0.3s',
                    '&:hover': {
                      color: '#764ba2',
                      pl: 0.5
                    }
                  }}
                >
                  Continue Shopping
                </Button>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 50,
                      height: 50,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                    }}
                  >
                    <ShoppingCartIcon sx={{ color: '#fff', fontSize: 28 }} />
                  </Box>
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 800, color: '#333' }}>
                      Shopping Cart
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {totalCount} item{totalCount !== 1 ? 's' : ''} in your cart
                    </Typography>
                  </Box>
                </Box>
              </Box>

              {/* Cart Items */}
              <CartSummary />
            </>
          ) : (
            <>
              {/* Empty Cart State */}
              <Paper
                sx={{
                  p: 6,
                  textAlign: 'center',
                  borderRadius: 3,
                  bgcolor: '#fff',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'
                }}
              >
                <Box
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 100,
                    height: 100,
                    borderRadius: '50%',
                    bgcolor: '#f0f0f0',
                    mb: 3
                  }}
                >
                  <ShoppingBagIcon sx={{ fontSize: 50, color: '#bbb' }} />
                </Box>

                <Typography variant="h5" sx={{ fontWeight: 700, mb: 1, color: '#333' }}>
                  Your Cart is Empty
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 4, maxWidth: 400, mx: 'auto', lineHeight: 1.6 }}
                >
                  Looks like you haven't added anything to your cart yet. Start shopping to find your favorite sweets and snacks!
                </Typography>

                <Button
                  variant="contained"
                  size="large"
                  startIcon={<ShoppingBagIcon />}
                  onClick={() => navigate('/dashboard')}
                  sx={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    py: 1.5,
                    px: 4,
                    textTransform: 'none',
                    fontSize: '1rem',
                    fontWeight: 600,
                    transition: 'all 0.3s',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 10px 25px rgba(102, 126, 234, 0.4)'
                    }
                  }}
                >
                  Start Shopping
                </Button>
              </Paper>
            </>
          )}
        </Container>
      </Box>

      {/* Footer */}
      <Footer />
    </Box>
  );
};

export default CartPage;
