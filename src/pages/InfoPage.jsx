// src/pages/InfoPage.jsx
import { Box, Typography, AppBar, Toolbar, IconButton, Badge, Tooltip } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar/Sidebar.jsx';
import Footer from '../components/Footer/Footer.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { useCart } from '../context/CartContext.jsx';
import { useThemeMode } from '../context/ThemeContext.jsx';

// Icons
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import HomeIcon from '@mui/icons-material/Home';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';

const sections = {
  terms: {
    title: 'Terms & Conditions',
    content: 'Here you can add detailed terms and conditions for SweetShop...'
  },
  privacy: {
    title: 'Privacy Policy',
    content: 'This section explains how SweetShop handles customer data and privacy...'
  },
  shipping: {
    title: 'Shipping Policy',
    content: 'Details about shipping timelines, charges, and regions covered...'
  },
  cancellation: {
    title: 'Cancellation Policy',
    content: 'Rules for cancelling orders, refunds, and timelines...'
  },
  delivery: {
    title: 'Delivery Policy',
    content: 'Information about delivery process, tracking, and handling delays...'
  },
  about: {
    title: 'About Us',
    content: 'SweetShop brings authentic sweets, snacks, and beverages inspired by tradition...'
  },
  contact: {
    title: 'Contact Us',
    content: 'Reach us at support@sweetshop.com or call +91-XXXXXXXXXX...'
  },
  faqs: {
    title: 'FAQs',
    content: 'Common questions about orders, payments, and products...'
  }
};

const InfoPage = () => {
  const { section } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { totalCount } = useCart();
  const { mode, toggleMode } = useThemeMode();

  const data = sections[section];

  // ✅ Proper icons for public/auth items
  const publicItems = [
    { key: 'home', label: 'Welcome', icon: <HomeIcon />, onClick: () => navigate('/dashboard') }
  ];
  const authItems = [
    { key: 'orders', label: 'My Orders', icon: <ReceiptLongIcon />, onClick: () => navigate('/orders') }
  ];

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar always visible */}
      <Sidebar
        onCategorySelect={(catId) => navigate(`/category/${catId}`)}
        publicItems={publicItems}
        authItems={authItems}
        onWidthChange={() => {}}
        activeCategory={null}
      />

      {/* Main content area */}
      <Box sx={{ flexGrow: 1, ml: '240px', display: 'flex', flexDirection: 'column' }}>
        {/* Header (AppBar) */}
        <AppBar position="static" color="default" elevation={0}>
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h6">
              Welcome {user ? user.email : 'Guest'}
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

        {/* Info section content */}
        <Box sx={{ flex: 1, p: 3 }}>
          {data ? (
            <>
              <Typography variant="h4" sx={{ mb: 2 }}>{data.title}</Typography>
              <Typography variant="body1">{data.content}</Typography>
            </>
          ) : (
            <Typography variant="h5">Section not found</Typography>
          )}
        </Box>

        {/* Footer */}
        <Footer />
      </Box>
    </Box>
  );
};

export default InfoPage;
