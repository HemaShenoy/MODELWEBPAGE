import { Grid, Typography, Box } from '@mui/material';
import ProductCard from './ProductCard';
import { PRODUCTS } from '../../data/products';

const ProductList = ({ activeCategory }) => {
  if (!activeCategory) return null;

  const filtered = PRODUCTS.filter(
    p => p.category.toLowerCase() === activeCategory.toLowerCase()
  );

  return (
    <Box sx={{ width: '100%', px: 2, mt: 3 }}>
      {/* CENTERED HEADING */}
      <Typography
        variant="h4"
        sx={{
          textAlign: 'center',
          mb: 4,
          fontWeight: 'bold',
          textTransform: 'capitalize'
        }}
      >
        {activeCategory}
      </Typography>

      {/* FULL WIDTH GRID */}
      <Grid container spacing={3}>
        {filtered.map(product => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ProductList;
