import { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  List,
  ListItem,
  ListItemText,
  Snackbar
} from '@mui/material';
import { useAuth } from '../context/AuthContext.jsx';
import { useCart } from '../context/CartContext.jsx';
import { storage } from '../services/storage.js';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { user } = useAuth();
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  const [billing, setBilling] = useState({
    name: user?.email?.split('@')[0] || '',
    email: user?.email || '',
    phone: '',
    address: ''
  });
  const [popup, setPopup] = useState('');

  const handleChange = (field, value) =>
    setBilling(prev => ({ ...prev, [field]: value }));

  const handlePayment = () => {
    if (!user) {
      setPopup('Please login to continue to payment.');
      return;
    }
    if (!items.length) {
      setPopup('Your cart is empty.');
      return;
    }

    const options = {
      key: 'rzp_test_RqB16rwHoMJwx7', // replace with your Razorpay Key ID
      amount: totalPrice * 100, // Razorpay works in paise
      currency: 'INR',
      name: 'SweetShop Checkout',
      description: 'Order Payment',
      handler: function (response) {
       
        const order = {
          orderId: response.razorpay_payment_id,
          userDetails: billing,
          cartItems: items,
          totalAmount: totalPrice,
          paymentStatus: 'success',
          date: new Date().toISOString()
        };
        storage.set(`orders_${user.email}`, [
          ...(storage.get(`orders_${user.email}`, [])),
          order
        ]);
        clearCart();
        navigate('/orders');
      },
      prefill: {
        name: billing.name,
        email: billing.email,
        contact: billing.phone
      },
      theme: {
        color: '#3399cc'
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
    rzp.on('payment.failed', function () {
      setPopup('Payment failed. Please try again.');
    });
  };

  return (
    <Box sx={{ display: 'grid', placeItems: 'center', minHeight: '100vh', p: 2 }}>
      <Paper sx={{ p: 4, width: '100%', maxWidth: 600 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>Checkout</Typography>

        {/* Billing Details */}
        <TextField label="Name" fullWidth sx={{ mb: 2 }}
          value={billing.name} onChange={e => handleChange('name', e.target.value)} />
        <TextField label="Email" fullWidth sx={{ mb: 2 }}
          value={billing.email} onChange={e => handleChange('email', e.target.value)} />
        <TextField label="Phone" fullWidth sx={{ mb: 2 }}
          value={billing.phone} onChange={e => handleChange('phone', e.target.value)} />
        <TextField label="Address" fullWidth sx={{ mb: 2 }}
          value={billing.address} onChange={e => handleChange('address', e.target.value)} />

        {/* Cart Summary */}
        <Typography variant="h6" sx={{ mt: 3 }}>Cart Summary</Typography>
        <List dense>
          {items.map(item => (
            <ListItem key={item.key}>
              <ListItemText
                primary={`${item.name} — ${item.weight}g`}
                secondary={`Qty: ${item.quantity} | Price: ₹${item.totalPrice}`}
              />
            </ListItem>
          ))}
        </List>
        <Typography variant="h6" sx={{ mt: 2 }}>
          Total Payable: ₹{totalPrice}
        </Typography>

        {/* Pay Now Button */}
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 3 }}
          onClick={handlePayment}
        >
          Pay Now
        </Button>
      </Paper>

      {/* Popup Snackbar */}
      <Snackbar
        open={!!popup}
        autoHideDuration={3000}
        onClose={() => setPopup('')}
        message={popup}
      />
    </Box>
  );
};

export default Checkout;
