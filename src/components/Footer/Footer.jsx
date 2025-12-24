import {
  Box,
  Grid,
  Typography,
  Link,
  TextField,
  Button
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { CATEGORIES } from '../../data/categories.js';

const Footer = () => {
  const navigate = useNavigate();

  const infoLinks = [
    { label: 'Terms & Conditions', route: '/terms' },
    { label: 'Privacy Policy', route: '/privacy' },
    { label: 'Shipping Policy', route: '/shipping' },
    { label: 'Cancellation Policy', route: '/cancellation' },
    { label: 'Delivery Policy', route: '/delivery' },
    { label: 'About Us', route: '/about' },
    { label: 'Contact Us', route: '/contact' },
    { label: 'FAQs', route: '/faqs' }
  ];

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#f8f8f8',
        color: '#333',
        mt: 4,
        pt: 6,
        pb: 4,
        px: { xs: 2, md: 6 }
      }}
    >
      <Grid container spacing={4}>
        {/* Brand / About */}
        <Grid item xs={12} md={3}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
            SweetShop
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Freshly made • Authentic taste • Gifting
          </Typography>
          <Typography variant="body2" sx={{ mt: 2 }}>
            Ah, the flavours of home… the taste of tradition! Relive childhood memories with our sweets, snacks and beverages.
          </Typography>
        </Grid>

        {/* Shop links (from CATEGORIES) */}
        <Grid item xs={12} md={3}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
            Shop
          </Typography>
          {CATEGORIES.map(cat => (
            <Typography key={cat.id} variant="body2" sx={{ mb: 1 }}>
              <Link
                component="button"
                underline="hover"
                color="inherit"
                onClick={() => navigate(`/category/${cat.id}`)}
              >
                {cat.label}
              </Link>
            </Typography>
          ))}
        </Grid>

        {/* Important links */}
        <Grid item xs={12} md={3}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
            Important Links
          </Typography>
          {infoLinks.map(link => (
            <Typography key={link.label} variant="body2" sx={{ mb: 1 }}>
              <Link
                component="button"
                underline="hover"
                color="inherit"
                onClick={() => navigate(link.route)}
              >
                {link.label}
              </Link>
            </Typography>
          ))}
        </Grid>

        {/* Newsletter */}
        <Grid item xs={12} md={3}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
            Newsletter
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Sign up for exclusive offers, recipes, and updates.
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <TextField
              variant="outlined"
              size="small"
              placeholder="Enter email"
              sx={{ flex: 1 }}
            />
            <Button variant="contained" color="primary">
              Sign up
            </Button>
          </Box>
        </Grid>
      </Grid>

      {/* Bottom bar */}
      <Box sx={{ textAlign: 'center', mt: 4, pt: 2, borderTop: '1px solid #ddd' }}>
        <Typography variant="caption" color="text.secondary">
          © {new Date().getFullYear()} SweetShop. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
