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
  Snackbar,
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Alert
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

import { useAuth } from '../context/AuthContext.jsx';
import { useCart } from '../context/CartContext.jsx';
import { storage } from '../services/storage.js';
import { useNavigate } from 'react-router-dom';
import { useThemeMode } from '../context/ThemeContext.jsx';
import Footer from '../components/Footer/Footer.jsx';

const Checkout = () => {
  const { user } = useAuth();
  const { items, totalPrice, clearCart, totalCount } = useCart();
  const { mode, toggleMode } = useThemeMode();
  const navigate = useNavigate();

  // Billing form state
  const [billing, setBilling] = useState({
    name: user?.email?.split('@')[0] || '',
    email: user?.email || '',
    phone: '',
    address: ''
  });
  const [popup, setPopup] = useState('');
  const [newLabel, setNewLabel] = useState('');

  const savedAddresses = storage.get(`addresses_${user?.email}`, []) || [];

  const handleChange = (field, value) =>
    setBilling(prev => ({ ...prev, [field]: value }));

  const handleSelectAddress = (value) => {
    setBilling(prev => ({ ...prev, address: value }));
  };

  const handleSaveAddress = () => {
    if (!newLabel || !billing.address) {
      setPopup('Please enter a label and address to save.');
      return;
    }
    const newAddr = { label: newLabel, address: billing.address };
    const updated = [...savedAddresses, newAddr];
    storage.set(`addresses_${user?.email}`, updated);
    setPopup('Address saved successfully!');
    setNewLabel('');
  };

  const handlePayment = () => {
    if (!items.length) {
      setPopup('Your cart is empty.');
      return;
    }

    const options = {
      key: 'rzp_test_RqB16rwHoMJwx7',
      amount: totalPrice * 100,
      currency: 'INR',
      name: 'SweetShop Checkout',
      description: 'Order Payment',
      handler: function (response) {
        const order = {
          orderId: response.razorpay_payment_id,
          billing,
          items,
          totalPrice,
          status: 'Paid',
          paymentStatus: 'success',
          date: new Date().toISOString()
        };
        storage.set(`orders_${user?.email}`, [
          ...(storage.get(`orders_${user?.email}`, [])),
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
      theme: { color: '#3399cc' },
      modal: {
        ondismiss: function () {
          navigate('/cart');
        }
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();

    rzp.on('payment.failed', function (response) {
      const order = {
        orderId: response.error.metadata?.payment_id || `fail_${Date.now()}`,
        billing,
        items,
        totalPrice,
        status: 'Failed',
        paymentStatus: 'failed',
        date: new Date().toISOString()
      };
      storage.set(`orders_${user?.email}`, [
        ...(storage.get(`orders_${user?.email}`, [])),
        order
      ]);
      clearCart();
      navigate('/orders');
    });
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Top bar */}
      <AppBar position="static" color="default" elevation={0}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6">
            Checkout — {user?.email || 'Guest'}
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <IconButton onClick={toggleMode}>
              {mode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
            </IconButton>
            <IconButton onClick={() => navigate('/cart')}>
              <Badge badgeContent={totalCount} color="primary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Main content */}
      <Box sx={{ flex: 1, display: 'grid', placeItems: 'center', p: 2 }}>
        <Paper sx={{ p: 4, width: '100%', maxWidth: 600 }}>
          <Typography variant="h5" sx={{ mb: 2 }}>Checkout</Typography>

          {/* Billing form */}
          <TextField label="Name" fullWidth sx={{ mb: 2 }}
            value={billing.name} onChange={e => handleChange('name', e.target.value)} />
          <TextField label="Email" fullWidth sx={{ mb: 2 }}
            value={billing.email} onChange={e => handleChange('email', e.target.value)} />
          <TextField label="Phone" fullWidth sx={{ mb: 2 }}
            value={billing.phone} onChange={e => handleChange('phone', e.target.value)} />

          {/* Saved addresses */}
          {savedAddresses.length > 0 && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                Saved Addresses
              </Typography>
              {savedAddresses.map((addrObj, idx) => (
                <Paper
                  key={idx}
                  sx={{ p: 2, mb: 1, cursor: 'pointer' }}
                  onClick={() => handleSelectAddress(addrObj.address)}
                >
                  <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                    {addrObj.label}
                  </Typography>
                  <Typography variant="body2">{addrObj.address}</Typography>
                </Paper>
              ))}
            </Box>
          )}

          <TextField label="Address" fullWidth sx={{ mb: 2 }}
            value={billing.address} onChange={e => handleChange('address', e.target.value)} />

          {/* Save new address option */}
          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <TextField
              label="Label (e.g. Home, Office)"
              value={newLabel}
              onChange={e => setNewLabel(e.target.value)}
              sx={{ flex: 1 }}
            />
            <Button variant="outlined" onClick={handleSaveAddress}>
              Save Address
            </Button>
          </Box>

          {/* Cart summary */}
          <Typography variant="h6" sx={{ mt: 3 }}>Cart Summary</Typography>
          <List dense>
            {items.map(item => (
              <ListItem key={`${item.productId}-${item.weight}`}>
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

          {/* Pay button */}
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3 }}
            onClick={handlePayment}
            disabled={!items.length}
          >
            Pay Now
          </Button>
        </Paper>

        {/* Snackbar with Alert */}
        <Snackbar
          open={!!popup}
          autoHideDuration={3000}
          onClose={() => setPopup('')}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert severity="info" onClose={() => setPopup('')} sx={{ width: '100%' }}>
            {popup}
          </Alert>
        </Snackbar>
      </Box>

      <Footer />
    </Box>
  );
};

export default Checkout;
