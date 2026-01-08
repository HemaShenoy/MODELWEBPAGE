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
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';

const WEIGHTS = ['200', '400', '600'];

const ProductCard = ({ product }) => {
  const { addItem, updateQuantity, items } = useCart();
  const navigate = useNavigate();

  const [weight, setWeight] = useState('200');
  const [justAdded, setJustAdded] = useState(false);

  // local quantity state so + works even before adding
  const [localQty, setLocalQty] = useState(1);

  const unitPrice = product.prices[weight];

  const cartItem = items.find(
    (i) => i.productId === product.id && i.weight === weight
  );

  const quantity = cartItem?.quantity ?? localQty;

  const handleAdd = (e) => {
    e.stopPropagation();
    addItem({
      productId: product.id,
      name: product.name,
      weight,
      unitPrice,
      quantity: localQty
    });

    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  const handleQtyChange = (e, newQty) => {
    e.stopPropagation();
    if (newQty >= 1) {
      setLocalQty(newQty);
      if (cartItem) {
        updateQuantity(product.id, weight, newQty);
      }
    }
  };

  return (
    <Card
      sx={{ height: '100%', display: 'flex', flexDirection: 'column', cursor: 'pointer' }}
      onClick={() => navigate(`/product/${product.id}`)}
    >
      {/* IMAGE */}
      <CardMedia
        component="img"
        image={product.image}
        alt={product.name}
        sx={{ height: 220, objectFit: 'cover' }}
      />

      {/* CONTENT */}
      <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
        <Typography variant="h6" fontWeight="bold" color="text.secondary">
          {product.name}
        </Typography>

        <Typography sx={{ mb: 1 }} color="text.secondary">
          From ₹ {unitPrice}
        </Typography>

        {/* WEIGHT */}
        <Select
          fullWidth
          size="small"
          sx={{ mb: 2, color: 'text.secondary' }}
          value={weight}
          onClick={(e) => e.stopPropagation()}
          onChange={(e) => setWeight(e.target.value)}
        >
          {WEIGHTS.map((w) => (
            <MenuItem key={w} value={w} sx={{ color: 'text.secondary' }}>
              {w} g – ₹ {product.prices[w]}
            </MenuItem>
          ))}
        </Select>

        {/* + - AND ADD */}
        <Box sx={{ display: 'flex', gap: 1 }}>
          {/* QUANTITY */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              border: '1px solid #ccc',
              borderRadius: 1
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <Button onClick={(e) => handleQtyChange(e, quantity - 1)}>−</Button>

            <Typography sx={{ px: 2 }}>{quantity}</Typography>

            <Button onClick={(e) => handleQtyChange(e, quantity + 1)}>+</Button>
          </Box>

          {/* ADD BUTTON */}
          <Button
            fullWidth
            variant={justAdded ? 'outlined' : 'contained'}
            onClick={handleAdd}
          >
            {justAdded ? 'ADDED ✓' : 'ADD TO CART'}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
