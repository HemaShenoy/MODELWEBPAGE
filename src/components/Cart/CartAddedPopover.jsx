import { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Avatar,
  Divider,
  Card,
  Slide
} from '@mui/material';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import CloseIcon from '@mui/icons-material/Close';

export const useCartPopover = () => {
  const [open, setOpen] = useState(false);
  const [lastAddedItem, setLastAddedItem] = useState(null);

  const showPopover = (event, item) => {
    setLastAddedItem(item);
    setOpen(true);
    
    // Auto close after 5 seconds
    setTimeout(() => {
      setOpen(false);
    }, 5000);
  };

  const hidePopover = () => {
    setOpen(false);
  };

  return { open, setOpen, showPopover, hidePopover, lastAddedItem };
};

const CartAddedPopover = ({ open, onClose, lastAddedItem }) => {
  const { totalCount, totalPrice } = useCart();
  const navigate = useNavigate();

  const handleClose = () => {
    onClose();
  };

  const handleContinueShopping = () => {
    onClose();
    navigate('/dashboard');
  };

  const handleViewCart = () => {
    onClose();
    navigate('/cart');
  };

  return (
    <Slide direction="down" in={open} mountOnEnter unmountOnExit timeout={300}>
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1300,
          display: 'flex',
          justifyContent: 'center',
          p: 2,
          pt: 3,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0) 100%)',
          backdropFilter: 'blur(4px)'
        }}
      >
        <Card
          sx={{
            p: 3,
            border: 'none',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)',
            borderRadius: 2.5,
            width: '100%',
            maxWidth: 420,
            background: 'linear-gradient(135deg, #fff 0%, #f9fbff 100%)'
          }}
        >
          {/* Header with Close Button */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2, position: 'relative' }}>
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 45,
                height: 45,
                borderRadius: '50%',
                bgcolor: '#e8f5e9'
              }}
            >
              <CheckCircleIcon sx={{ color: '#4caf50', fontSize: 28 }} />
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography sx={{ fontWeight: 700, color: '#333', fontSize: '0.95rem' }}>
                Added to Cart
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Item successfully added
              </Typography>
            </Box>
            <Button
              size="small"
              onClick={handleClose}
              sx={{
                minWidth: 32,
                color: '#999',
                '&:hover': { color: '#333' }
              }}
            >
              <CloseIcon fontSize="small" />
            </Button>
          </Box>

          {/* Last Added Item */}
          {lastAddedItem && (
            <>
              <Divider sx={{ my: 2 }} />

              <Box sx={{ mb: 2.5 }}>
                <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                  <Avatar
                    variant="rounded"
                    src={lastAddedItem.image}
                    alt={lastAddedItem.name}
                    sx={{
                      width: 60,
                      height: 60,
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Box>
                    <Typography sx={{ fontWeight: 700, color: '#333', mb: 0.5 }}>
                      {lastAddedItem.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                      {lastAddedItem.weight}g × {lastAddedItem.quantity}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 700,
                        color: '#667eea',
                        mt: 0.5
                      }}
                    >
                      ₹{lastAddedItem.totalPrice}
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Divider sx={{ my: 2 }} />
            </>
          )}

          {/* Cart Summary */}
          <Box
            sx={{
              p: 2,
              bgcolor: 'rgba(102, 126, 234, 0.05)',
              borderRadius: 1.5,
              border: '1px solid #e8e8f5',
              mb: 2.5
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
              <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                Items in Cart:
              </Typography>
              <Typography sx={{ fontWeight: 700, color: '#667eea' }}>
                {totalCount}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="body2" sx={{ fontWeight: 600, color: '#333' }}>
                Cart Total:
              </Typography>
              <Typography
                sx={{
                  fontWeight: 800,
                  color: '#667eea',
                  fontSize: '1.1rem'
                }}
              >
                ₹{totalPrice}
              </Typography>
            </Box>
          </Box>

          {/* Action Buttons */}
          <Box sx={{ display: 'flex', gap: 1.5 }}>
            <Button
              variant="outlined"
              fullWidth
              size="small"
              startIcon={<ShoppingBagIcon />}
              onClick={handleContinueShopping}
              sx={{
                textTransform: 'none',
                fontWeight: 600,
                borderColor: '#667eea',
                color: '#667eea',
                transition: 'all 0.3s',
                '&:hover': {
                  borderColor: '#764ba2',
                  color: '#764ba2',
                  bgcolor: 'rgba(102, 126, 234, 0.08)'
                }
              }}
            >
              Continue Shopping
            </Button>

            <Button
              variant="contained"
              fullWidth
              size="small"
              startIcon={<ShoppingCartIcon />}
              onClick={handleViewCart}
              sx={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                textTransform: 'none',
                fontWeight: 700,
                transition: 'all 0.3s',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 20px rgba(102, 126, 234, 0.3)'
                }
              }}
            >
              View Cart
            </Button>
          </Box>
        </Card>
      </Box>
    </Slide>
  );
};

export default CartAddedPopover;
