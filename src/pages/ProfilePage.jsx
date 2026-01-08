// src/pages/ProfilePage.jsx
import {
  Box,
  Typography,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemText,
  Button,
  TextField,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';

import { useAuth } from '../context/AuthContext.jsx';
import { useCart } from '../context/CartContext.jsx';
import { storage } from '../services/storage.js';
import Topbar from '../components/TopBar/Topbar.jsx';
import Footer from '../components/Footer/Footer.jsx';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const { setItems } = useCart();
  const navigate = useNavigate();

  const [newLabel, setNewLabel] = useState('');
  const [newAddress, setNewAddress] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');

  if (!user) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h6">Please log in to view your profile.</Typography>
      </Box>
    );
  }

  // ✅ Load addresses and orders for this account
  const addresses = storage.get(`addresses_${user.email}`, []) || [];
  const orders = storage.get(`orders_${user.email}`, []) || [];

  const handleSaveAddress = () => {
    if (!newLabel || !newAddress) {
      setDialogMessage('Please enter both label and address.');
      setDialogOpen(true);
      return;
    }
    const newAddr = { label: newLabel, address: newAddress };
    const updated = [...addresses, newAddr];
    storage.set(`addresses_${user.email}`, updated);
    setNewLabel('');
    setNewAddress('');
    setDialogMessage('Address saved successfully!');
    setDialogOpen(true);
  };

  const handleReorder = (order) => {
    setItems(order.items || order.cartItems || []);
    setDialogMessage('Items added back to cart!');
    setDialogOpen(true);
  };

  const handlePayAgain = (order) => {
    setItems(order.items || order.cartItems || []);
    setDialogMessage('Redirecting to checkout...');
    setDialogOpen(true);
    navigate('/checkout');
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Topbar */}
      <Topbar />

      {/* Header buttons */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', px: 3, mt: 2 }}>
        <Button variant="outlined" onClick={() => navigate('/dashboard')}>
          Back to Shopping
        </Button>
        <Button
          variant="outlined"
          color="error"
          onClick={() => {
            logout();
            navigate('/login');
          }}
        >
          Log out
        </Button>
      </Box>

      {/* Main content fills width */}
      <Box sx={{ flex: 1, p: 3 }}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          MY ACCOUNT
        </Typography>

        {/* Profile Details */}
        <Paper sx={{ p: 2, mb: 2 }}>
          <Typography variant="subtitle1" sx={{ fontFamily: 'monospace' }}>
            Profile Details
          </Typography>
          <Divider sx={{ my: 1 }} />
          <Typography>Name: {user.name || user.email.split('@')[0]}</Typography>
          <Typography>Email: {user.email}</Typography>
          <Typography>Location: {user.location || 'India'}</Typography>
        </Paper>

        {/* Saved Addresses */}
        <Paper sx={{ p: 2, mb: 2 }}>
          <Typography variant="subtitle1" sx={{ fontFamily: 'monospace' }}>
            Saved Addresses
          </Typography>
          <Divider sx={{ my: 1 }} />
          {addresses.length ? (
            <List dense>
              {addresses.map((addr, idx) => (
                <ListItem key={idx}>
                  <ListItemText primary={addr.label} secondary={addr.address} />
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography>You haven't added any addresses yet.</Typography>
          )}

          {/* Add new address form */}
          <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
            <TextField
              label="Label (e.g. Home, Office)"
              value={newLabel}
              onChange={(e) => setNewLabel(e.target.value)}
              sx={{ flex: 1 }}
            />
            <TextField
              label="Address"
              value={newAddress}
              onChange={(e) => setNewAddress(e.target.value)}
              sx={{ flex: 2 }}
            />
            <Button variant="contained" onClick={handleSaveAddress}>
              Save
            </Button>
          </Box>
        </Paper>

        {/* Orders */}
        <Paper sx={{ p: 2 }}>
          <Typography variant="subtitle1" sx={{ fontFamily: 'monospace' }}>
            Orders
          </Typography>
          <Divider sx={{ my: 1 }} />
          {orders.length ? (
            orders.map((order, idx) => (
              <Paper key={idx} sx={{ p: 2, mb: 2 }}>
                <Typography variant="subtitle1" sx={{ fontFamily: 'monospace' }}>
                  Order ID: {order.orderId || idx + 1}
                </Typography>
                <Typography variant="caption">
                  Date: {order.date ? new Date(order.date).toLocaleString() : 'N/A'}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Total Amount: ₹{order.totalPrice || order.totalAmount}
                </Typography>
                {(order.status || order.paymentStatus) && (
                  <Chip
                    label={order.status || order.paymentStatus}
                    color={
                      order.status === 'Paid' || order.paymentStatus === 'success'
                        ? 'success'
                        : 'error'
                    }
                    size="small"
                    sx={{ mt: 1 }}
                  />
                )}

                <Divider sx={{ my: 1 }} />
                <Typography variant="subtitle2">Billing Details</Typography>
                <Typography>Name: {order.billing?.name}</Typography>
                <Typography>Email: {order.billing?.email}</Typography>
                <Typography>Phone: {order.billing?.phone}</Typography>
                <Typography>Address: {order.billing?.address}</Typography>

                <Typography variant="subtitle2" sx={{ mt: 2 }}>
                  Items Ordered
                </Typography>
                <List dense>
                  {(order.items || order.cartItems || []).map((i, j) => (
                    <ListItem key={j}>
                      <ListItemText
                        primary={`${i.name} — ${i.weight}g`}
                        secondary={`Qty: ${i.quantity} | Unit: ₹${i.unitPrice} | Subtotal: ₹${i.totalPrice}`}
                      />
                    </ListItem>
                  ))}
                </List>

                {/* Action buttons */}
                {(order.status === 'Pending' ||
                  order.status === 'Failed' ||
                  order.paymentStatus === 'failed') && (
                  <Button
                    variant="contained"
                    color="secondary"
                    sx={{ mt: 2, mr: 2 }}
                    onClick={() => handlePayAgain(order)}
                  >
                    Pay Again
                  </Button>
                )}

                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
                  onClick={() => handleReorder(order)}
                >
                  Reorder
                </Button>
              </Paper>
            ))
          ) : (
            <Typography>You haven't placed any orders yet.</Typography>
          )}
        </Paper>
      </Box>

      {/* Footer */}
      <Footer />

      {/* Dialog for feedback */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>
          {dialogMessage.includes('cart') ? 'Reorder Successful' : 'Action'}
        </DialogTitle>
        <DialogContent>
          <Typography>{dialogMessage}</Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setDialogOpen(false);
              if (dialogMessage.includes('cart')) navigate('/cart');
            }}
            color="primary"
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProfilePage;
