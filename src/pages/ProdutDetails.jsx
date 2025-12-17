

import React, { useState } from 'react';

import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Select, MenuItem } from '@mui/material';
import { PRODUCTS } from '../data/products.js';
import { useCart } from '../context/CartContext.jsx';

import Sidebar from '../components/Sidebar/Sidebar.jsx';
import Footer from '../components/Footer/Footer.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { useThemeMode } from '../context/ThemeContext.jsx';
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const WEIGHTS = ['200', '400', '600'];

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = PRODUCTS.find(p => p.id === id);

  const { addItem, updateQuantity, items } = useCart();
  const { user } = useAuth();
  const { mode, toggleMode } = useThemeMode();

  const [weight, setWeight] = React.useState('200');
  const unitPrice = product?.prices[weight];
  const cartItem = items.find(i => i.productId === product?.id && i.weight === weight);
  const quantity = cartItem?.quantity || 0;

  if (!product) {
    return <Typography variant="h6">Product not found</Typography>;
  }

  const handleAdd = () => {
    addItem({
      productId: product.id,
      name: product.name,
      weight,
      unitPrice
    });
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <Sidebar onCategorySelect={() => navigate('/dashboard')} />

      {/* Main content */}
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', ml: '240px' }}>
        {/* Top AppBar */}
        <AppBar position="static" color="default" elevation={0}>
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h6">Welcome {user ? user.email : 'Guest'}</Typography>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <IconButton onClick={toggleMode}>
                {mode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
              </IconButton>
              <IconButton onClick={() => navigate('/cart')}>
                <Badge badgeContent={items.reduce((sum, i) => sum + i.quantity, 0)} color="primary">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>

        {/* Product detail body */}
        <Box sx={{ flex: 1, p: 3 }}>
          <img
            src={product.image}
            alt={product.name}
            style={{ width: '250px', borderRadius: '8px', marginBottom: '16px' }}
          />
          <Typography variant="h4">{product.name}</Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            <strong>Ingredients:</strong> {product.ingredients}
          </Typography>
          <Typography variant="body1">
            <strong>Uses:</strong> {product.uses}
          </Typography>
          <Typography variant="body1">
            <strong>Expiry:</strong> {product.expiry}
          </Typography>

          {/* Cart controls same as ProductCard */}
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mt: 2 }}>
            <Select
              size="small"
              value={weight}
              onChange={e => setWeight(e.target.value)}
            >
              {WEIGHTS.map(w => (
                <MenuItem key={w} value={w}>
                  {w}g
                </MenuItem>
              ))}
            </Select>

            <Typography variant="body1">₹ {unitPrice}</Typography>

            {!quantity ? (
              <Button variant="contained" onClick={handleAdd}>
                Add to Cart
              </Button>
            ) : (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => updateQuantity(product.id, weight, quantity - 1)}
                >
                  -
                </Button>
                <Typography>{quantity}</Typography>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => updateQuantity(product.id, weight, quantity + 1)}
                >
                  +
                </Button>
              </Box>
            )}
          </Box>

          {quantity > 0 && (
            <Typography variant="caption" sx={{ display: 'block', mt: 1 }}>
              Total: ₹ {quantity * unitPrice} ({weight}g × {quantity})
            </Typography>
          )}

          <Button variant="outlined" sx={{ mt: 3 }} onClick={() => navigate(-1)}>
            Back
          </Button>
        </Box>

        {/* Footer */}
        <Footer />
      </Box>
    </Box>
  );
};

export default ProductDetail;
