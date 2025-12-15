import { useState } from 'react';
import {
  Box,
  Typography,
  AppBar,
  Toolbar,
  Badge,
  IconButton,
  Paper,
  List,
  ListItem,
  ListItemText,
  Button,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import Sidebar from '../components/Sidebar/Sidebar.jsx';
import Footer from '../components/Footer/Footer.jsx';

import { useAuth } from '../context/AuthContext.jsx';
import { useCart } from '../context/CartContext.jsx';
import { useThemeMode } from '../context/ThemeContext.jsx';
import { storage } from '../services/storage.js';
import { useNavigate } from 'react-router-dom';

const Orders = () => {
  const { user } = useAuth();
  const { setItems, totalCount } = useCart();
  const { mode, toggleMode } = useThemeMode();
  const [sidebarWidth, setSidebarWidth] = useState(240);
  const [filter, setFilter] = useState('');
  const navigate = useNavigate();

  const publicItems = [
    { key: 'home', label: 'Welcome', icon: <HomeIcon />, onClick: () => navigate('/dashboard') },
    { key: 'about', label: 'About', icon: <InfoIcon />, onClick: () => alert('SweetShop demo app') }
  ];
  const authItems = [
    { key: 'orders', label: 'My Orders', icon: <ShoppingCartIcon />, onClick: () => navigate('/orders') }
  ];

  const ORDERS_KEY = user ? `orders_${user.email}` : 'orders_guest';
  const orders = storage.get(ORDERS_KEY, []) || [];

  const filteredOrders = orders.filter(o =>
    o.date?.includes(filter) ||
    (o.status && o.status.toLowerCase().includes(filter.toLowerCase())) ||
    (o.paymentStatus && o.paymentStatus.toLowerCase().includes(filter.toLowerCase()))
  );

  const handleReorder = (order) => {
    setItems(order.items || order.cartItems || []);
    alert('Items added back to cart!');
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <Sidebar
        onCategorySelect={() => navigate('/dashboard')}
        publicItems={publicItems}
        authItems={authItems}
        onWidthChange={setSidebarWidth}
      />

      {/* Main content */}
      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          ml: `${sidebarWidth}px`,
          transition: 'margin-left 0.25s ease'
        }}
      >
        {/* Top bar */}
        <AppBar position="static" color="default" elevation={0}>
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h6">My Orders — {user ? user.email : 'Guest'}</Typography>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <IconButton onClick={toggleMode}>
                {mode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
              </IconButton>
              <IconButton onClick={() => navigate('/checkout')}>
                <Badge badgeContent={totalCount} color="primary">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>

        {/* Orders list */}
        <Box sx={{ flex: 1, p: 2 }}>
          <Typography variant="subtitle1" sx={{ mb: 2 }}>
            You have placed {orders.length} orders so far.
          </Typography>

          <TextField
            label="Search by date or status"
            variant="outlined"
            size="small"
            value={filter}
            onChange={e => setFilter(e.target.value)}
            sx={{ mb: 3 }}
          />

          {!Array.isArray(filteredOrders) || filteredOrders.length === 0 ? (
            <Typography>You have no orders yet. Start shopping now!</Typography>
          ) : (
            filteredOrders.map((order, idx) => (
              <Paper key={idx} sx={{ p: 2, mb: 2 }}>
                <Typography variant="subtitle1">Order ID: {order.orderId || idx + 1}</Typography>
                <Typography variant="caption">
                  Date: {order.date ? new Date(order.date).toLocaleString() : 'N/A'}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Total Amount: ₹{order.totalPrice || order.totalAmount}
                </Typography>
                {(order.status || order.paymentStatus) && (
                  <Typography
                    variant="body2"
                    sx={{ mt: 1, color: (order.status === 'Paid' || order.paymentStatus === 'success') ? 'green' : 'red' }}
                  >
                    Status: {order.status || order.paymentStatus}
                  </Typography>
                )}

                {/* Expandable details */}
                <Accordion sx={{ mt: 2 }}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>View Details</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography variant="subtitle1">Billing Details</Typography>
                    <Typography>Name: {order.billing?.name || order.userDetails?.name}</Typography>
                    <Typography>Email: {order.billing?.email || order.userDetails?.email}</Typography>
                    <Typography>Phone: {order.billing?.phone || order.userDetails?.phone}</Typography>
                    <Typography>Address: {order.billing?.address || order.userDetails?.address}</Typography>

                    <Typography variant="subtitle1" sx={{ mt: 2 }}>Items Ordered</Typography>
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

        {/* Footer */}
        <Footer />
      </Box>
    </Box>
  );
};

export default Orders;
