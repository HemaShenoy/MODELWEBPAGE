// src/pages/InfoPage.jsx
import { Box, Typography } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer/Footer.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import Topbar from '../components/TopBar/Topbar.jsx';

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

  const data = sections[section];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Topbar */}
      <Topbar
        publicItems={[
          { key: 'home', label: 'Home', onClick: () => navigate('/dashboard') },
          { key: 'about', label: 'About', onClick: () => navigate('/info/about') }
        ]}
        authItems={[
          { key: 'orders', label: 'My Orders', onClick: () => navigate('/orders') }
        ]}
      />

      {/* Info section content */}
      <Box sx={{ flex: 1, p: 3 }}>
        {data ? (
          <>
            <Typography variant="h4" sx={{ mb: 2 }}>
              {data.title}
            </Typography>
            <Typography variant="body1">{data.content}</Typography>
          </>
        ) : (
          <Typography variant="h5">Section not found</Typography>
        )}
      </Box>

      {/* Footer */}
      <Footer />
    </Box>
  );
};

export default InfoPage;
