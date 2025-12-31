// src/pages/Checkout.jsx
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
  ListItemAvatar,
  Avatar,
  Snackbar,
  Alert,
  Grid
} from '@mui/material';

import { useAuth } from '../context/AuthContext.jsx';
import { useCart } from '../context/CartContext.jsx';
import { storage } from '../services/storage.js';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer/Footer.jsx';
import { PRODUCTS } from '../data/products.js';
import Topbar from '../components/TopBar/Topbar.jsx';

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
  const [newLabel, setNewLabel] = useState('');

  const savedAddresses = storage.get(`addresses_${user?.email}`, []) || [];

  const handleChange = (field, value) =>
    setBilling((prev) => ({ ...prev, [field]: value }));

  const handleSelectAddress = (value) => {
    setBilling((prev) => ({ ...prev, address: value }));
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

  // ✅ Load Razorpay script dynamically
  const loadRazorpay = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    if (!items.length) {
      setPopup('Your cart is empty.');
      return;
    }
    if (!billing.name || !billing.email || !billing.phone || !billing.address) {
      setPopup('Please fill in all billing details before proceeding.');
      return;
    }

    const res = await loadRazorpay();
    if (!res) {
      setPopup('Failed to load payment gateway. Please try again.');
      return;
    }

    const options = {
      key: 'rzp_test_RqB16rwHoMJwx7', // Razorpay test key
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

      {/* Main content */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          p: 3
        }}
      >
        <Grid container spacing={3} sx={{ maxWidth: 1100 }}>
          {/* Left: Billing form */}
          <Grid item xs={12} md={7}>
            <Paper sx={{ p: 4, borderRadius: 3, boxShadow: 3 }}>
              <Typography variant="h5" sx={{ mb: 2 }}>
                Billing Details
              </Typography>

              <TextField
                label="Name"
                fullWidth
                sx={{ mb: 2 }}
                value={billing.name}
                onChange={(e) => handleChange('name', e.target.value)}
              />
              <TextField
                label="Email"
                fullWidth
                sx={{ mb: 2 }}
                value={billing.email}
                onChange={(e) => handleChange('email', e.target.value)}
              />
              <TextField
                label="Phone"
                fullWidth
                sx={{ mb: 2 }}
                value={billing.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
              />

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

              <TextField
                label="Address"
                fullWidth
                sx={{ mb: 2 }}
                value={billing.address}
                onChange={(e) => handleChange('address', e.target.value)}
              />

              <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                <TextField
                  label="Label (e.g. Home, Office)"
                  value={newLabel}
                  onChange={(e) => setNewLabel(e.target.value)}
                  sx={{ flex: 1 }}
                />
                <Button variant="outlined" onClick={handleSaveAddress}>
                  Save Address
                </Button>
              </Box>

              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 3 }}
                onClick={handlePayment}
                disabled={
                  !items.length ||
                  !billing.name ||
                  !billing.email ||
                  !billing.phone ||
                  !billing.address
                }
              >
                Pay Now
              </Button>
            </Paper>
          </Grid>

          {/* Right: Cart details with images */}
          <Grid item xs={12} md={5}>
            <Paper sx={{ p: 4, borderRadius: 3, boxShadow: 3 }}>
              <Typography variant="h5" sx={{ mb: 2 }}>
                Your Cart
              </Typography>
              <List>
                {items.map((item) => {
                  const product = PRODUCTS.find((p) => p.id === item.productId);
                  return (
                    <ListItem
                      key={`${item.productId}-${item.weight}`}
                      alignItems="flex-start"
                    >
                      <ListItemAvatar>
                        <Avatar
                          variant="rounded"
                          src={product?.image}
                          sx={{ width: 56, height: 56, mr: 2 }}
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary={`${item.name} — ${item.weight}g`}
                        secondary={`Qty: ${item.quantity} | Price: ₹${item.totalPrice}`}
                      />
                    </ListItem>
                  );
                })}
              </List>
              <Typography variant="h6" sx={{ mt: 2 }}>
                Total: ₹{totalPrice}
              </Typography>
            </Paper>
          </Grid>
                </Grid>
      </Box>

      {/* Snackbar */}
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

      {/* Footer */}
      <Footer />
    </Box>
  );
};

export default Checkout;

      

