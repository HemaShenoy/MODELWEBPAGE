import { useState } from 'react';
import { Box, Typography, AppBar, Toolbar, Badge, IconButton } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

import Sidebar from '../components/Sidebar/Sidebar.jsx';
import ProductList from '../components/Product/ProductList.jsx';
import CartSummary from '../components/Cart/CartSummary.jsx';
import Footer from '../components/Footer/Footer.jsx';

import { useAuth } from '../context/AuthContext.jsx';
import { useCart } from '../context/CartContext.jsx';
import { useThemeMode } from '../context/ThemeContext.jsx';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [sidebarWidth, setSidebarWidth] = useState(240); // default expanded
  const { user } = useAuth();
  const { totalCount } = useCart();
  const { mode, toggleMode } = useThemeMode();   // ✅ theme hook
  const navigate = useNavigate();

  const publicItems = [
    { key: 'home', label: 'Welcome', icon: <HomeIcon />, onClick: () => setActiveCategory(null) },
    { key: 'about', label: 'About', icon: <InfoIcon />, onClick: () => alert('SweetShop demo app') }
  ];

  const authItems = [
    { key: 'orders', label: 'My Orders', icon: <ShoppingCartIcon />, onClick: () => navigate('/orders') }
  ];

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <Sidebar
        onCategorySelect={setActiveCategory}
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
            <Typography variant="h6">Welcome {user ? user.email : 'Guest'}</Typography>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              {/* ✅ Dark/Light mode toggle */}
              <IconButton onClick={toggleMode}>
                {mode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
              </IconButton>
              {/* Cart icon */}
              <IconButton onClick={() => navigate('/orders')}>
                <Badge badgeContent={totalCount} color="primary">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>

        {/* Page content */}
        <Box sx={{ flex: 1, p: 2 }}>
          {!activeCategory && (
            <Typography variant="h5" sx={{ mb: 2 }}>
              Welcome to SweetShop
            </Typography>
          )}
          <ProductList activeCategory={activeCategory} />
          <CartSummary />
        </Box>

        {/* Footer */}
        <Footer />
      </Box>
    </Box>
  );
};

export default Dashboard;
