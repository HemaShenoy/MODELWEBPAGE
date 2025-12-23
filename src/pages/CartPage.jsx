import { useState } from 'react';
import {
  Box,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Tooltip
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

import { useAuth } from '../context/AuthContext.jsx';
import { useCart } from '../context/CartContext.jsx';
import { useThemeMode } from '../context/ThemeContext.jsx';
import CartSummary from '../components/Cart/CartSummary.jsx';
import Footer from '../components/Footer/Footer.jsx';
import Sidebar from '../components/Sidebar/Sidebar.jsx';

import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const { user } = useAuth();
  const { totalCount } = useCart();
  const { mode, toggleMode } = useThemeMode();
  const [sidebarWidth, setSidebarWidth] = useState(240);
  const navigate = useNavigate();

  const publicItems = [
    { key: 'home', label: 'Welcome', icon: <HomeIcon />, onClick: () => navigate('/dashboard') },
    { key: 'about', label: 'About', icon: <InfoIcon />, onClick: () => alert('SweetShop demo app') }
  ];
  const authItems = [
    { key: 'orders', label: 'My Orders', icon: <ReceiptLongIcon />, onClick: () => navigate('/orders') }
  ];

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <Sidebar
        onCategorySelect={() => navigate('/dashboard')}
        publicItems={publicItems}
        authItems={authItems}
        onWidthChange={setSidebarWidth}
      />

      {/* Main content area */}
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
            <Typography variant="h6">
              Cart — {user ? user.email : 'Guest'}
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <Tooltip title="Toggle theme">
                <IconButton onClick={toggleMode}>
                  {mode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
                </IconButton>
              </Tooltip>
              <IconButton onClick={() => navigate('/cart')}>
                <Badge badgeContent={totalCount} color="primary">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>

        {/* Cart summary content */}
        <Box sx={{ flex: 1, p: 2 }}>
          {totalCount > 0 ? (
            <CartSummary />
          ) : (
            <Typography variant="body1" sx={{ mt: 2 }}>
              Your cart is empty. Browse products to add items.
            </Typography>
          )}
        </Box>

        {/* Footer */}
        <Footer />
      </Box>
    </Box>
  );
};

export default CartPage;
