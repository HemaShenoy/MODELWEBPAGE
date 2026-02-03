import { useAuth } from '../../context/AuthContext.jsx';
import { useCart } from '../../context/CartContext.jsx';
import {
  Typography,
  List,
  ListItem,
  Box,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  Avatar,
  ListItemAvatar,
  ListItemText,
  Divider,
  Card
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { PRODUCTS } from '../../data/products.js';
import PaymentIcon from '@mui/icons-material/Payment';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';

const CartSummary = () => {
  const { user } = useAuth();
  const { items, totalCount, totalPrice, clearCart, updateQuantity } = useCart();
  const navigate = useNavigate();

  const [loginDialog, setLoginDialog] = useState(false);

  return (
    <Card
      sx={{
        p: 4,
        mt: 2,
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
        borderRadius: 2
      }}
    >
      {items.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography color="text.secondary" sx={{ mb: 2 }}>
            Your cart is empty.
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate('/dashboard')}
            sx={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              textTransform: 'none',
              fontWeight: 600
            }}
          >
            Start Shopping
          </Button>
        </Box>
      ) : (
        <>
          {/* Cart Items List */}
          <List disablePadding>
            {items.map((i, index) => {
              const product = PRODUCTS.find(p => p.id === i.productId);
              return (
                <Box key={`${i.productId}-${i.weight}`}>
                  <ListItem
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      cursor: 'pointer',
                      py: 2.5,
                      transition: 'all 0.3s',
                      '&:hover': {
                        backgroundColor: 'rgba(102, 126, 234, 0.05)',
                        borderRadius: 1,
                        pl: 1
                      }
                    }}
                    onClick={() => navigate(`/product/${i.productId}`)}
                  >
                    {/* Product Image + Info */}
                    <ListItemAvatar>
                      <Avatar
                        variant="rounded"
                        src={product?.image}
                        alt={i.name}
                        sx={{
                          width: 70,
                          height: 70,
                          mr: 2,
                          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                        }}
                      />
                    </ListItemAvatar>

                    <Box sx={{ flex: 1 }}>
                      <ListItemText
                        primary={
                          <Typography sx={{ fontWeight: 700, color: '#333', fontSize: '1rem' }}>
                            {i.name}
                          </Typography>
                        }
                        secondary={
                          <Box sx={{ mt: 0.5 }}>
                            <Typography variant="caption" sx={{ display: 'block', color: '#666' }}>
                              {i.weight}g • ₹{i.unitPrice} per unit
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{
                                fontWeight: 700,
                                color: '#667eea',
                                mt: 0.5
                              }}
                            >
                              Subtotal: ₹{i.totalPrice}
                            </Typography>
                          </Box>
                        }
                      />
                    </Box>

                    {/* Quantity Controls */}
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        border: '1px solid #eee',
                        borderRadius: 1,
                        p: 0.5,
                        mr: 2
                      }}
                    >
                      <IconButton
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          const newQty = i.quantity - 1;
                          updateQuantity(i.productId, i.weight, newQty);
                        }}
                        sx={{ color: '#667eea' }}
                      >
                        <RemoveIcon fontSize="small" />
                      </IconButton>

                      <Typography
                        variant="body2"
                        sx={{ fontWeight: 'bold', minWidth: 20, textAlign: 'center', color: '#333' }}
                      >
                        {i.quantity}
                      </Typography>

                      <IconButton
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          updateQuantity(i.productId, i.weight, i.quantity + 1);
                        }}
                        sx={{ color: '#667eea' }}
                      >
                        <AddIcon fontSize="small" />
                      </IconButton>
                    </Box>

                    {/* Delete Button */}
                    <IconButton
                      size="small"
                      color="error"
                      onClick={(e) => {
                        e.stopPropagation();
                        updateQuantity(i.productId, i.weight, 0); // delete when 0
                      }}
                      sx={{
                        transition: 'all 0.3s',
                        '&:hover': {
                          bgcolor: '#ffebee'
                        }
                      }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </ListItem>

                  {index < items.length - 1 && <Divider sx={{ my: 0.5 }} />}
                </Box>
              );
            })}
          </List>

          <Divider sx={{ my: 3 }} />

          {/* Summary Section */}
          <Box sx={{ mb: 3 }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 2
              }}
            >
              <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
                Items in Cart:
              </Typography>
              <Chip
                label={`${totalCount} item${totalCount !== 1 ? 's' : ''}`}
                color="primary"
                variant="outlined"
                sx={{ fontWeight: 700 }}
              />
            </Box>

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                p: 2,
                bgcolor: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
                borderRadius: 1.5,
                border: '1px solid #e8e8f5'
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#333' }}>
                Total:
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 800,
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                ₹{totalPrice}
              </Typography>
            </Box>
          </Box>

          {/* Action Buttons */}
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="outlined"
              startIcon={<DeleteSweepIcon />}
              onClick={clearCart}
              disabled={!items.length}
              sx={{
                borderColor: '#e0e0e0',
                color: '#999',
                textTransform: 'none',
                fontWeight: 600,
                '&:hover': {
                  borderColor: '#d32f2f',
                  color: '#d32f2f',
                  bgcolor: '#ffebee'
                }
              }}
            >
              Clear Cart
            </Button>

            <Button
              variant="contained"
              fullWidth
              size="large"
              startIcon={<PaymentIcon />}
              onClick={() => {
                if (user) {
                  navigate('/checkout');
                } else {
                  setLoginDialog(true);
                }
              }}
              disabled={!items.length}
              sx={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                textTransform: 'none',
                fontWeight: 700,
                fontSize: '1rem',
                py: 1.5,
                transition: 'all 0.3s',
                '&:hover:not(:disabled)': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 10px 25px rgba(102, 126, 234, 0.4)'
                }
              }}
            >
              {user ? 'Proceed to Checkout' : 'Login to Checkout'}
            </Button>
          </Box>
        </>
      )}

      {/* Dialog for guests */}
      <Dialog open={loginDialog} onClose={() => setLoginDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 700, color: '#333' }}>Login Required</DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <Typography color="text.secondary" sx={{ lineHeight: 1.6 }}>
            You need to login to proceed to checkout. Please sign in with your account to complete your purchase.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2, gap: 1 }}>
          <Button
            onClick={() => setLoginDialog(false)}
            sx={{ textTransform: 'none', fontWeight: 600 }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              setLoginDialog(false);
              navigate('/login');
            }}
            variant="contained"
            sx={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              textTransform: 'none',
              fontWeight: 700
            }}
          >
            Go to Login
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default CartSummary;
