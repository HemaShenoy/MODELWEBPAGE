import { Box, Typography, AppBar, Toolbar, Paper, List, ListItem, ListItemText } from '@mui/material';
import Sidebar from '../components/Sidebar/Sidebar.jsx';
import Footer from '../components/Footer/Footer.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { storage } from '../services/storage.js';
import { useState } from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import { useNavigate } from 'react-router-dom';

const ORDERS_KEY = 'app_orders';

const Orders = () => {
  const { user } = useAuth();
  const [sidebarWidth, setSidebarWidth] = useState(240);
  const navigate = useNavigate();

  const publicItems = [
    { key: 'home', label: 'Welcome', icon: <HomeIcon />, onClick: () => navigate('/dashboard') },
    { key: 'about', label: 'About', icon: <InfoIcon />, onClick: () => alert('SweetShop demo app') }
  ];
  const authItems = [
    { key: 'orders', label: 'My Orders', icon: <ShoppingCartIcon />, onClick: () => navigate('/orders') }
  ];

  const orders = storage.get(ORDERS_KEY, []);

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <Sidebar
        onCategorySelect={(cat) => navigate('/dashboard')} // ✅ redirect to Dashboard when category clicked
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
          </Toolbar>
        </AppBar>

        {/* Orders list */}
        <Box sx={{ flex: 1, p: 2 }}>
          {!orders.length ? (
            <Typography>No orders yet.</Typography>
          ) : (
            orders.map((order, idx) => (
              <Paper key={idx} sx={{ p: 2, mb: 2 }}>
                <Typography variant="subtitle1">Order {idx + 1}</Typography>
                <Typography variant="caption">Date: {new Date(order.date).toLocaleString()}</Typography>
                <List dense>
                  {order.items.map(item => (
                    <ListItem key={item.key}>
                      <ListItemText
                        primary={`${item.name} — ${item.weight}g`}
                        secondary={`Qty: ${item.quantity} | Subtotal: ₹${item.totalPrice}`}
                      />
                    </ListItem>
                  ))}
                </List>
                <Typography variant="subtitle2">Order Total: ₹{order.totalPrice}</Typography>
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
