// src/pages/ProductDetail.jsx
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Select,
  MenuItem,
  Snackbar,
  Alert,
  Grid,
  Chip
} from '@mui/material';

import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

import { PRODUCTS } from '../data/products.js';
import { useCart } from '../context/CartContext.jsx';
import Footer from '../components/Footer/Footer.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import Topbar from '../components/TopBar/Topbar.jsx';

const WEIGHTS = ['200', '400', '600'];

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = PRODUCTS.find((p) => p.id === id);

  const { addItem, updateQuantity, items } = useCart();
  const { user } = useAuth();

  const [weight, setWeight] = useState('200');
  const [popup, setPopup] = useState('');
  const unitPrice = product?.prices[weight];
  const cartItem = items.find(
    (i) => i.productId === product?.id && i.weight === weight
  );
  const quantity = cartItem?.quantity || 0;

  if (!product) {
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

        {/* Not found body */}
        <Box
          sx={{
            flex: 1,
            p: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <ErrorOutlineIcon color="error" sx={{ fontSize: 48, mb: 2 }} />
          <Typography variant="h6" sx={{ mb: 2 }}>
            Sorry, this product does not exist.
          </Typography>
          <Button
            variant="contained"
            onClick={() => {
              navigate('/dashboard');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            Back to Dashboard
          </Button>
        </Box>
        <Footer />
      </Box>
    );
  }

  const handleAdd = () => {
    addItem({
      productId: product.id,
      name: product.name,
      weight,
      unitPrice
    });
    setPopup('');
    setTimeout(() => setPopup(`${product.name} (${weight}g) added to cart!`), 50);
  };

  const handleBuyNow = () => {
    handleAdd();
    navigate('/checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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

      {/* Product detail body */}
      <Box sx={{ flex: 1, p: 3 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={5}>
            <img
              src={product.image}
              alt={product.name}
              style={{
                width: '250px',
                height: '250px',
                objectFit: 'contain',
                borderRadius: '8px',
                display: 'block',
                margin: '0 auto'
              }}
            />
          </Grid>
          <Grid item xs={12} md={7}>
            <Typography variant="h4" sx={{ mb: 2 }}>
              {product.name}
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Ingredients:</strong> {product.ingredients}
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Uses:</strong> {product.uses}
            </Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>
              <strong>Expiry:</strong> {product.expiry}
            </Typography>

            {/* Cart controls */}
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 2 }}>
              <Select
                size="small"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              >
                {WEIGHTS.map((w) => (
                  <MenuItem key={w} value={w}>
                    {w}g
                  </MenuItem>
                ))}
              </Select>

              <Typography variant="body1">₹ {unitPrice}</Typography>

              {!quantity ? (
                <Button variant="contained" onClick={handleAdd} aria-label="Add to cart">
                  Add to Cart
                </Button>
              ) : (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() =>
                      quantity > 1 &&
                      updateQuantity(product.id, weight, quantity - 1)
                    }
                    aria-label="Decrease quantity"
                  >
                    -
                  </Button>
                  <Typography>{quantity}</Typography>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() =>
                      updateQuantity(product.id, weight, quantity + 1)
                    }
                    aria-label="Increase quantity"
                  >
                    +
                  </Button>
                </Box>
              )}
            </Box>

            {quantity > 0 && (
              <Chip
                label={`Total: ₹${quantity * unitPrice} (${weight}g × ${quantity})`}
                color="secondary"
                sx={{ mb: 2 }}
              />
            )}

            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button variant="contained" color="primary" onClick={handleBuyNow}>
                Buy Now
              </Button>
              <Button
                variant="outlined"
                onClick={() => {
                  navigate('/dashboard');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                Back to Dashboard
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* Footer */}
      <Footer />

      {/* Snackbar confirmation */}
      <Snackbar
        open={!!popup}
        autoHideDuration={2000}
        onClose={() => setPopup('')}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="info" onClose={() => setPopup('')} sx={{ width: '100%' }}>
          {popup}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ProductDetail;
