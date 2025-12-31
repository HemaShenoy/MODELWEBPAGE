// src/pages/Orders.jsx
import { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Button,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip
} from '@mui/material';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import Footer from '../components/Footer/Footer.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { useCart } from '../context/CartContext.jsx';
import { storage } from '../services/storage.js';
import { useNavigate } from 'react-router-dom';
import Topbar from '../components/TopBar/Topbar.jsx';

const Orders = () => {
  const { user } = useAuth();
  const { setItems } = useCart();
  const [filter, setFilter] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  const navigate = useNavigate();

  const ORDERS_KEY = user ? `orders_${user.email}` : 'orders_guest';
  const orders = storage.get(ORDERS_KEY, []) || [];

  const filteredOrders = orders.filter(
    (o) =>
      o.date?.includes(filter) ||
      (o.status && o.status.toLowerCase().includes(filter.toLowerCase())) ||
      (o.paymentStatus && o.paymentStatus.toLowerCase().includes(filter.toLowerCase()))
  );

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
      <Topbar
        publicItems={[
          { key: 'home', label: 'Home', onClick: () => navigate('/dashboard') },
          { key: 'about', label: 'About', onClick: () => alert('SweetShop demo app') }
        ]}
        authItems={[
          { key: 'orders', label: 'My Orders', onClick: () => navigate('/orders') }
        ]}
      />

      {/* Body */}
      <Box sx={{ flex: 1, p: 2 }}>
        <Typography variant="subtitle1" sx={{ mb: 2 }}>
          You have placed {orders.length} orders so far.
        </Typography>

        <TextField
          label="Search by date or status"
          variant="outlined"
          size="small"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          sx={{ mb: 3 }}
        />

        {!Array.isArray(filteredOrders) || filteredOrders.length === 0 ? (
          <Box>
            <Typography>You have no orders yet.</Typography>
            <Button variant="contained" sx={{ mt: 2 }} onClick={() => navigate('/dashboard')}>
              Start Shopping
            </Button>
          </Box>
        ) : (
          filteredOrders.map((order, idx) => (
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

              <Accordion sx={{ mt: 2 }} defaultExpanded={idx === 0}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>View Details</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="subtitle1">Billing Details</Typography>
                  <Typography>Name: {order.billing?.name || order.userDetails?.name}</Typography>
                  <Typography>Email: {order.billing?.email || order.userDetails?.email}</Typography>
                  <Typography>Phone: {order.billing?.phone || order.userDetails?.phone}</Typography>
                  <Typography>Address: {order.billing?.address || order.userDetails?.address}</Typography>

                  <Typography variant="subtitle1" sx={{ mt: 2 }}>
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

                  <Typography variant="subtitle1" sx={{ mt: 2 }}>
                    Total Payable: ₹{order.totalPrice || order.totalAmount}
                  </Typography>

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
                </AccordionDetails>
              </Accordion>
            </Paper>
          ))
        )}
      </Box>

      <Footer />

      {/* Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>
          {dialogMessage.includes('cart') ? 'Reorder Successful' : 'Payment Action'}
        </DialogTitle>
        <DialogContent>
          <Typography>{dialogMessage}</Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setDialogOpen(false);
              navigate('/cart');
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

export default Orders;
