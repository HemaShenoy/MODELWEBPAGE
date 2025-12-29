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
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Alert,
  Grid
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
import { PRODUCTS } from '../data/products.js'; // ✅ import products with images

const Checkout = () => {
  const { user } = useAuth();
  const { items, totalPrice, clearCart, totalCount } = useCart();
  const { mode, toggleMode } = useThemeMode();
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
    if (!billing.name || !billing.email || !billing.phone || !billing.address) {
      setPopup('Please fill in all billing details before proceeding.');
      return;
    }
    // Razorpay integration...
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

      {/* Main content centered */}
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
              <Typography variant="h5" sx={{ mb: 2 }}>Billing Details</Typography>

              <TextField label="Name" fullWidth sx={{ mb: 2 }}
                value={billing.name} onChange={e => handleChange('name', e.target.value)} />
              <TextField label="Email" fullWidth sx={{ mb: 2 }}
                value={billing.email} onChange={e => handleChange('email', e.target.value)} />
              <TextField label="Phone" fullWidth sx={{ mb: 2 }}
                value={billing.phone} onChange={e => handleChange('phone', e.target.value)} />

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
              <Typography variant="h5" sx={{ mb: 2 }}>Your Cart</Typography>
              <List>
                {items.map(item => {
                  const product = PRODUCTS.find(p => p.id === item.productId);
                  return (
                    <ListItem key={`${item.productId}-${item.weight}`} alignItems="flex-start">
                      <ListItemAvatar>
                        <Avatar
                          variant="rounded"
                          src={product?.image}
                          alt={item.name}
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

      <Footer />
    </Box>
  );
};

export default Checkout;
