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
import CartAddedPopover, { useCartPopover } from '../Cart/CartAddedPopover';

const WEIGHTS = ['200', '400', '600'];

const ProductCard = ({ product }) => {
  const { addItem, items } = useCart();
  const navigate = useNavigate();
  const { open, showPopover, hidePopover, lastAddedItem } = useCartPopover();

  const [weight, setWeight] = useState('200');
  const [justAdded, setJustAdded] = useState(false);

  // local quantity state so + works even before adding
  const [localQty, setLocalQty] = useState(1);

  const unitPrice = product.prices[weight];

  const cartItem = items.find(
    (i) => i.productId === product.id && i.weight === weight
  );

  const handleAdd = (e) => {
    e.stopPropagation();
    
    const newItem = {
      productId: product.id,
      name: product.name,
      weight,
      unitPrice,
      quantity: localQty,
      image: product.images?.[0] || product.image,
      totalPrice: localQty * unitPrice
    };
    
    addItem(newItem);

    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);

    // Show popover
    showPopover(e, newItem);
  };

  const handleQtyChange = (e, newQty) => {
    e.stopPropagation();
    if (newQty >= 1) {
      setLocalQty(newQty);
    } else {
      setLocalQty(1);
    }
  };

  return (
    <>
      <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        transition: 'transform 0.3s, box-shadow 0.3s',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: '0 12px 24px rgba(0,0,0,0.15)'
        }
      }}
      onClick={() => navigate(`/product/${product.id}`)}
    >
      {/* IMAGE */}
      <CardMedia
        component="img"
        image={product.image}
        alt={product.name}
        sx={{
          width: '100%',
          aspectRatio: '1 / 1',
          objectFit: 'cover',
          flexGrow: 1
        }}
      />

      {/* CONTENT - AT BOTTOM */}
      <CardContent sx={{ textAlign: 'center', bgcolor: '#f9f9f9', p: 2.5 }}>
        <Typography variant="h6" fontWeight="bold" color="text.primary" sx={{ mb: 1, fontSize: '1.1rem' }}>
          {product.name}
        </Typography>

        <Typography sx={{ mb: 2, fontWeight: 600, color: '#2196F3', fontSize: '1.05rem' }} >
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
            <Button onClick={(e) => handleQtyChange(e, localQty - 1)}>−</Button>

            <Typography sx={{ px: 2 }}>{localQty}</Typography>

            <Button onClick={(e) => handleQtyChange(e, localQty + 1)}>+</Button>
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

    {/* Cart Added Popover */}
    <CartAddedPopover open={open} onClose={hidePopover} lastAddedItem={lastAddedItem} />
  </>
  );
};

export default ProductCard;
