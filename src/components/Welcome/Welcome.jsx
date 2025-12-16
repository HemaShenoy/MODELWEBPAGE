import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Chip,
  CardActionArea
} from '@mui/material';
import { PRODUCTS } from '../../data/products';
import { useCart } from '../../context/CartContext.jsx'; // ✅ import cart context

const Welcome = ({ onCategorySelect }) => {
  const { addItem } = useCart(); // ✅ get addItem function

  return (
    <Box sx={{ p: 2 }}>
      {/* Animated heading */}
      <Typography
        variant="h4"
        sx={{
          mb: 3,
          fontWeight: 'bold',
          textAlign: 'center',
          background: 'linear-gradient(90deg, #ff4081, #ff9800)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          animation: 'fadeSlideIn 1.5s ease-out, pulse 3s infinite',
        }}
      >
        Welcome to SweetShop
      </Typography>

      {/* Product cards */}
      <Grid container spacing={3}>
        {PRODUCTS.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: 6
                }
              }}
            >
              {/* Clicking the card navigates to category */}
              <CardActionArea onClick={() => onCategorySelect(product.category)}>
                <CardMedia
                  component="img"
                  height="200"
                  image={product.image}
                  alt={product.name}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6" fontWeight="bold">
                      {product.name}
                    </Typography>
                    <Chip
                      label={product.category.toUpperCase()}
                      color={
                        product.category === 'sweets'
                          ? 'secondary'
                          : product.category === 'snacks'
                          ? 'warning'
                          : 'primary'
                      }
                      size="small"
                    />
                  </Box>
                  <Box sx={{ mt: 2 }}>
                    {Object.entries(product.prices).map(([weight, price]) => (
                      <Typography
                        key={weight}
                        variant="body2"
                        sx={{ display: 'flex', justifyContent: 'space-between' }}
                      >
                        {weight}g — ₹{price}
                      </Typography>
                    ))}
                  </Box>
                </CardContent>
              </CardActionArea>

              {/* Buttons */}
              <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
                <Button variant="outlined" size="small">
                  Details
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  color="primary"
                  onClick={() =>
                    addItem({
                      productId: product.id,
                      name: product.name,
                      weight: '200', // default weight
                      unitPrice: product.prices['200']
                    })
                  }
                >
                  Add to Cart
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Animations */}
      <style>
        {`
          @keyframes fadeSlideIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
          }
        `}
      </style>
    </Box>
  );
};

export default Welcome;
