import { useAuth } from '../../context/AuthContext.jsx';
import { useCart } from '../../context/CartContext.jsx';
import {
  Paper,
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
  Chip
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const CartSummary = () => {
  const { user } = useAuth();
  const { items, totalCount, totalPrice, clearCart, updateQuantity } = useCart();
  const navigate = useNavigate();

  const [loginDialog, setLoginDialog] = useState(false);

  return (
    <Paper sx={{ p: 2, mt: 2 }}>
      <Typography variant="h6">Cart Summary</Typography>

      {items.length === 0 ? (
        <Box sx={{ mt: 2 }}>
          <Typography>Your cart is empty.</Typography>
          <Button variant="contained" sx={{ mt: 2 }} onClick={() => navigate('/dashboard')}>
            Start Shopping
          </Button>
        </Box>
      ) : (
        <>
          <List dense>
            {items.map(i => (
              <ListItem
                key={`${i.productId}-${i.weight}`}
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <Box>
                  <Typography variant="subtitle1">
                    {i.name} — {i.weight}g
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Unit: ₹{i.unitPrice} | Subtotal: ₹{i.totalPrice}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <IconButton
                    size="small"
                    onClick={() =>
                      i.quantity > 1 && updateQuantity(i.productId, i.weight, i.quantity - 1)
                    }
                  >
                    <RemoveIcon />
                  </IconButton>

                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    {i.quantity}
                  </Typography>

                  <IconButton
                    size="small"
                    onClick={() =>
                      updateQuantity(i.productId, i.weight, i.quantity + 1)
                    }
                  >
                    <AddIcon />
                  </IconButton>

                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => updateQuantity(i.productId, i.weight, 0)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </ListItem>
            ))}
          </List>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <Chip label={`Items: ${totalCount}`} color="primary" />
            <Chip label={`Total: ₹${totalPrice}`} color="secondary" />
          </Box>

          <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
            <Button
              variant="outlined"
              onClick={clearCart}
              disabled={!items.length}
            >
              Clear Cart
            </Button>

            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                if (user) {
                  navigate('/checkout');
                } else {
                  setLoginDialog(true);
                }
              }}
              disabled={!items.length}
            >
              {user ? 'Go to Checkout' : 'Login to Checkout'}
            </Button>
          </Box>
        </>
      )}

      {/* Dialog for guests */}
      <Dialog open={loginDialog} onClose={() => setLoginDialog(false)}>
        <DialogTitle>Login Required</DialogTitle>
        <DialogContent>
          <Typography>Please login to continue to checkout.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setLoginDialog(false)}>Cancel</Button>
          <Button
            onClick={() => {
              setLoginDialog(false);
              navigate('/login');
            }}
            variant="contained"
            color="primary"
          >
            Login
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default CartSummary;
