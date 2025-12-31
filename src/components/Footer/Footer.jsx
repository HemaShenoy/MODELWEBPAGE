// src/components/Footer/Footer.jsx
import { useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  Link,
  TextField,
  Button,
  Snackbar,
  Alert
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { CATEGORIES } from '../../data/categories.js';

const Footer = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [popup, setPopup] = useState('');

  const infoLinks = [
    { label: 'Terms & Conditions', route: '/info/terms' },
    { label: 'Privacy Policy', route: '/info/privacy' },
    { label: 'Shipping Policy', route: '/info/shipping' },
    { label: 'Cancellation Policy', route: '/info/cancellation' },
    { label: 'Delivery Policy', route: '/info/delivery' },
    { label: 'About Us', route: '/info/about' },
    { label: 'Contact Us', route: '/info/contact' },
    { label: 'FAQs', route: '/info/faqs' }
  ];

  const handleSignup = () => {
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setPopup('Please enter a valid email address');
      return;
    }
    setPopup(`Subscribed successfully with ${email}`);
    setEmail('');
  };

  const handleNavigate = (route) => {
    navigate(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#444',
        color: '#fff',
      
        pt: 6,
        pb: 4,
        px: { xs: 2, md: 6 }
      }}
    >
      <Grid container spacing={4}>
        {/* Brand / About */}
        <Grid item xs={12} md={3}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: '#fff' }}>
            SweetShop
          </Typography>
          <Typography variant="body2" sx={{ mb: 1, color: '#ddd' }}>
            Freshly made • Authentic taste • Gifting
          </Typography>
          <Typography variant="body2" sx={{ mt: 2, color: '#ddd' }}>
            Ah, the flavours of home… the taste of tradition! Relive childhood memories with our sweets, snacks and beverages.
          </Typography>
        </Grid>

        {/* Shop links */}
        <Grid item xs={12} md={3}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: '#fff' }}>
            Shop
          </Typography>
          {CATEGORIES.map(cat => (
            <Typography key={cat.id} variant="body2" sx={{ mb: 1 }}>
              <Link
                component="button"
                underline="hover"
                sx={{ color: '#ddd' }}
                onClick={() => handleNavigate(`/dashboard/${cat.id}`)} // ✅ correct route
              >
                {cat.label}
              </Link>
            </Typography>
          ))}
        </Grid>

        {/* Important links */}
        <Grid item xs={12} md={3}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: '#fff' }}>
            Important Links
          </Typography>
          {infoLinks.map(link => (
            <Typography key={link.label} variant="body2" sx={{ mb: 1 }}>
              <Link
                component="button"
                underline="hover"
                sx={{ color: '#ddd' }}
                onClick={() => handleNavigate(link.route)}
              >
                {link.label}
              </Link>
            </Typography>
          ))}
        </Grid>

        {/* Newsletter */}
        <Grid item xs={12} md={3}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: '#fff' }}>
            Newsletter
          </Typography>
          <Typography variant="body2" sx={{ mb: 2, color: '#ddd' }}>
            Sign up for exclusive offers, recipes, and updates.
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <TextField
              variant="outlined"
              size="small"
              placeholder="Enter email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              sx={{ flex: 1, bgcolor: '#fff', borderRadius: 1 }}
            />
            <Button
              variant="contained"
              color="secondary"
              onClick={handleSignup}
            >
              Sign up
            </Button>
          </Box>
        </Grid>
      </Grid>

      {/* Bottom bar */}
      <Box sx={{ textAlign: 'center', mt: 4, pt: 2, borderTop: '1px solid #666' }}>
        <Typography variant="caption" sx={{ color: '#ccc' }}>
          © {new Date().getFullYear()} SweetShop. All rights reserved.
        </Typography>
      </Box>

      {/* Snackbar confirmation */}
      <Snackbar
        open={!!popup}
        autoHideDuration={3000}
        onClose={() => setPopup('')}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          severity={popup.startsWith('Subscribed') ? 'success' : 'error'}
          onClose={() => setPopup('')}
          sx={{ width: '100%' }}
        >
          {popup}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Footer;
