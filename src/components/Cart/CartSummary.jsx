import { useAuth } from '../../context/AuthContext.jsx';
import { useCart } from '../../context/CartContext.jsx';
import { Paper, Typography, List, ListItem, ListItemText, Box, Button } from '@mui/material';
import { storage } from '../../services/storage.js';

const ORDERS_KEY = 'app_orders';

const CartSummary = () => {
  const { user } = useAuth();
  const { items, totalCount, totalPrice, clearCart } = useCart();

  const handleCheckout = () => {
    if (!items.length) return;
    const existingOrders = storage.get(ORDERS_KEY, []);
    const newOrder = { items, totalPrice, date: new Date().toISOString() };
    storage.set(ORDERS_KEY, [...existingOrders, newOrder]);
    clearCart();
    alert('Order placed successfully!');
  };

  if (!user) {
    return <Typography variant="body2" sx={{ mt: 2 }}>Please login to view your cart.</Typography>;
  }

  return (
    <Paper sx={{ p: 2, mt: 2 }}>
      <Typography variant="h6">Cart Summary</Typography>
      <List dense>
        {items.map(i => (
          <ListItem key={i.key}>
            <ListItemText
              primary={`${i.name} — ${i.weight}g`}
              secondary={`Qty: ${i.quantity} | Unit: ₹${i.unitPrice} | Subtotal: ₹${i.totalPrice}`}
            />
          </ListItem>
        ))}
      </List>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
        <Typography variant="subtitle1">Items: {totalCount}</Typography>
        <Typography variant="subtitle1">Total: ₹ {totalPrice}</Typography>
      </Box>
      <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
        <Button variant="outlined" onClick={clearCart} disabled={!items.length}>Clear Cart</Button>
        <Button variant="contained" onClick={handleCheckout} disabled={!items.length}>Checkout</Button>
      </Box>
    </Paper>
  );
};

export default CartSummary;
