import { useState } from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Button,
  Select,
  MenuItem
} from '@mui/material';
import { useCart } from '../../context/CartContext.jsx';
import { useNavigate } from 'react-router-dom';

const WEIGHTS = ['200', '400', '600'];

const ProductCard = ({ product }) => {
  const { addItem, updateQuantity, items } = useCart();
  const [weight, setWeight] = useState('200');
  const navigate = useNavigate();

  const unitPrice = product.prices[weight];
  const cartItem = items.find(
    i => i.productId === product.id && i.weight === weight
  );
  const quantity = cartItem?.quantity || 0;

  const handleAdd = (e) => {
    e.stopPropagation(); // prevent card click navigation
    addItem({
      productId: product.id,
      name: product.name,
      weight,
      unitPrice
    });
  };

  const handleQuantityChange = (e, newQty) => {
    e.stopPropagation();
    updateQuantity(product.id, weight, newQty);
  };

  return (
    <Card
      sx={{
        display: 'flex',
        mb: 2,
        transition: 'transform 0.3s ease',
        cursor: 'pointer',
        '&:hover': { transform: 'scale(1.02)' }
      }}
      onClick={() => navigate(`/product/${product.id}`)} // ✅ navigate to detail page
    >
      {/* Product Image */}
      <CardMedia
        component="img"
        image={product.image}
        alt={product.name}
        sx={{
          width: 160,
          height: 160,
          objectFit: 'cover',
          borderRadius: 2,
          margin: 1,
          transition: 'transform 0.3s ease',
          '&:hover': { transform: 'scale(1.1)' }
        }}
      />

      {/* Product Info */}
      <CardContent sx={{ flex: 1 }}>
        <Typography variant="h6">{product.name}</Typography>

        {/* Cart Controls */}
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mt: 1 }}>
          <Select
            size="small"
            value={weight}
            onChange={e => setWeight(e.target.value)}
            onClick={e => e.stopPropagation()} // prevent navigation when selecting
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
                onClick={(e) => handleQuantityChange(e, quantity - 1)}
              >
                -
              </Button>
              <Typography>{quantity}</Typography>
              <Button
                variant="outlined"
                size="small"
                onClick={(e) => handleQuantityChange(e, quantity + 1)}
              >
                +
              </Button>
            </Box>
          )}
        </Box>

        {/* Total Price */}
        {quantity > 0 && (
          <Typography variant="caption" sx={{ display: 'block', mt: 1 }}>
            Total: ₹ {quantity * unitPrice} ({weight}g × {quantity})
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductCard;
