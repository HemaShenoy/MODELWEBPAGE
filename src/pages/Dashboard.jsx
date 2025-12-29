import { useState } from 'react';
import {
  Box,
  Typography,
  AppBar,
  Toolbar,
  Badge,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Tooltip
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

import Sidebar from '../components/Sidebar/Sidebar.jsx';
import ProductList from '../components/Product/ProductList.jsx';
import Footer from '../components/Footer/Footer.jsx';
import Welcome from '../components/Welcome/Welcome.jsx';

import { useAuth } from '../context/AuthContext.jsx';
import { useCart } from '../context/CartContext.jsx';
import { useThemeMode } from '../context/ThemeContext.jsx';
import { useNavigate, useParams } from 'react-router-dom';

const Dashboard = () => {
  const [sidebarWidth, setSidebarWidth] = useState(240);
  const { user } = useAuth();
  const { totalCount } = useCart();
  const { mode, toggleMode } = useThemeMode();
  const navigate = useNavigate();
  const { id } = useParams(); // ✅ category from URL

  const [aboutDialog, setAboutDialog] = useState(false);

  const publicItems = [
    { key: 'home', label: 'Welcome', icon: <HomeIcon />, onClick: () => navigate('/dashboard') },
    { key: 'about', label: 'About', icon: <InfoIcon />, onClick: () => setAboutDialog(true) }
  ];

  const authItems = [
    { key: 'orders', label: 'My Orders', icon: <ReceiptLongIcon />, onClick: () => navigate('/orders') }
  ];

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <Sidebar
        onCategorySelect={(catId) => navigate(`/category/${catId}`)} // ✅ navigate instead of setActiveCategory
        publicItems={publicItems}
        authItems={authItems}
        onWidthChange={setSidebarWidth}
        activeCategory={id}
      />

      {/* Main content */}
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', ml: `${sidebarWidth}px` }}>
        {/* Top AppBar */}
        <AppBar position="static" color="default" elevation={0}>
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h6">Welcome {user ? user.email : 'Guest'}</Typography>
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

        {/* Body */}
        <Box sx={{ flex: 1, p: 2 }}>
          {!id ? (
            <Welcome onCategorySelect={(catId) => navigate(`/category/${catId}`)} />
          ) : (
            <ProductList activeCategory={id} />
          )}
        </Box>

        {/* Footer */}
        <Footer />
      </Box>

      {/* About dialog */}
      <Dialog open={aboutDialog} onClose={() => setAboutDialog(false)}>
        <DialogTitle>About SweetShop</DialogTitle>
        <DialogContent>
          <Typography>
            SweetShop brings you authentic sweets, snacks, beverages, and gift packs inspired by tradition.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAboutDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Dashboard;
