
import { Grid, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ProductCard from './ProductCard.jsx';
import { PRODUCTS } from '../../data/products.js';

const ProductList = ({ activeCategory }) => {
  const navigate = useNavigate();

  
  const filtered = PRODUCTS.filter(
    (p) => p.category.toLowerCase() === activeCategory?.toLowerCase()
  );


  if (!activeCategory) {
    return (
      <Typography variant="body1" sx={{ mt: 2 }}>
        Select a category from the Topbar to view products.
      </Typography>
    );
  }

  
  if (filtered.length === 0) {
    return (
      <Box sx={{ mt: 2 }}>
        <Typography>No products found in this category.</Typography>
        <Button
          variant="contained"
          sx={{ mt: 2 }}
          onClick={() => navigate('/dashboard')}
        >
          Back to Dashboard
        </Button>
      </Box>
    );
  }

  
  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h5" sx={{ mb: 2, textTransform: 'capitalize' }}>
        {activeCategory} Products
      </Typography>
      <Grid container spacing={2}>
        {filtered.map((p) => (
          <Grid item xs={12} sm={6} md={4} key={p.id}>
            <ProductCard product={p} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ProductList;
