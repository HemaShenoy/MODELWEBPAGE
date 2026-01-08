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
import footerImg from '../../assets/images/img.jpg';


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
<Grid container columnSpacing={15}> 
  {/* Left: Brand/About */}
  <Grid item xs={12} md={3}>

    <Typography
      variant="body2"
      sx={{
        color: '#ddd',
        lineHeight: 1.8,
        maxWidth: 400,
        whiteSpace: 'normal'
      }}
    >
      Ah, the flavours of home… the taste of tradition! 
      Our grandmothers used to spend hours on feeding us, 
      preparing special pickles, sweets, snacks and savouries 
      for our summer vacations.
    </Typography>
      <Box
    component="img"
    src={footerImg}
    alt="Vellanki Foods"
    sx={{
      width: '100%',
      maxWidth: 100,
      mt: 1,
      borderRadius: 1
    }}
  />
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
          onClick={() => handleNavigate(`/dashboard/${cat.id}`)}
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
      <Box sx={{ textAlign: 'center', mt: 6, pt: 3, borderTop: '1px solid #666' }}>
        <Typography variant="caption" sx={{ color: '#ccc' }}>
          © {new Date().getFullYear()} vellankifoods. Powered by Shopify
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
