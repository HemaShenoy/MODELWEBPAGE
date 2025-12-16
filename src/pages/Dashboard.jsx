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
  Button
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

import Sidebar from '../components/Sidebar/Sidebar.jsx';
import ProductList from '../components/Product/ProductList.jsx';
import Footer from '../components/Footer/Footer.jsx';
import Welcome from '../components/Welcome/Welcome.jsx'; // ✅ import new Welcome

import { useAuth } from '../context/AuthContext.jsx';
import { useCart } from '../context/CartContext.jsx';
import { useThemeMode } from '../context/ThemeContext.jsx';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [sidebarWidth, setSidebarWidth] = useState(240);
  const { user } = useAuth();
  const { totalCount } = useCart();
  const { mode, toggleMode } = useThemeMode();
  const navigate = useNavigate();

  const [aboutDialog, setAboutDialog] = useState(false);

  const publicItems = [
    { key: 'home', label: 'Welcome', icon: <HomeIcon />, onClick: () => setActiveCategory(null) },
    { key: 'about', label: 'About', icon: <InfoIcon />, onClick: () => setAboutDialog(true) }
  ];

  const authItems = [
    { key: 'orders', label: 'My Orders', icon: <ShoppingCartIcon />, onClick: () => navigate('/orders') }
  ];

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar
        onCategorySelect={setActiveCategory}
        publicItems={publicItems}
        authItems={authItems}
        onWidthChange={setSidebarWidth}
      />

      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', ml: `${sidebarWidth}px` }}>
        <AppBar position="static" color="default" elevation={0}>
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h6">Welcome {user ? user.email : 'Guest'}</Typography>
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

        <Box sx={{ flex: 1, p: 2 }}>
          {!activeCategory ? (
            <Welcome onCategorySelect={setActiveCategory} />
          ) : (
            <ProductList activeCategory={activeCategory} />
          )}
        </Box>

        <Footer />
      </Box>

      {/* About dialog */}
      <Dialog open={aboutDialog} onClose={() => setAboutDialog(false)}>
        <DialogTitle>About SweetShop</DialogTitle>
        <DialogContent>
          <Typography>This is a demo SweetShop app built with React & Material‑UI.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAboutDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Dashboard;

