import { Grid, Typography } from '@mui/material';
import ProductCard from './ProductCard.jsx';
import { PRODUCTS } from '../../data/products.js';

const ProductList = ({ activeCategory }) => {
  const filtered = PRODUCTS.filter(p => p.category === activeCategory);

  if (!activeCategory) {
    return <Typography variant="body1" sx={{ mt: 2 }}>Select a category from the sidebar to view products.</Typography>;
  }

  if (filtered.length === 0) {
    return <Typography variant="body1" sx={{ mt: 2 }}>No products found in this category.</Typography>;
  }

  return (
    <Grid container spacing={2} sx={{ mt: 1 }}>
      {filtered.map(p => (
        <Grid item xs={12} md={6} key={p.id}>
          <ProductCard product={p} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductList;
