// src/pages/SearchResults.jsx
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Grid, Button } from '@mui/material';
import { PRODUCTS } from '../data/products.js';
import ProductCard from '../components/Product/ProductCard.jsx';
import Topbar from '../components/TopBar/Topbar.jsx';   // ✅ add Topbar
import Footer from '../components/Footer/Footer.jsx';   // ✅ optional footer

const SearchResults = () => {
  const { term } = useParams();
  const navigate = useNavigate();
  const query = term.toLowerCase();

  // ✅ Filter products across all categories
  const results = PRODUCTS.filter(
    (p) =>
      p.name.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query)
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Topbar */}
      <Topbar />

      {/* Body */}
      <Box sx={{ flex: 1, p: 4, bgcolor: '#fff' }}>
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
          Search results for "<span style={{ color: '#2196F3' }}>{term}</span>"
        </Typography>

        {results.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" sx={{ mb: 3, color: '#666' }}>
              No products found.
            </Typography>
            <Button
              variant="contained"
              sx={{ mt: 2 }}
              onClick={() => navigate('/dashboard')}
            >
              Back to Dashboard
            </Button>
          </Box>
        ) : (
          <Grid container spacing={4}>
            {results.map((p) => (
              <Grid item xs={12} sm={6} md={6} lg={4} key={p.id}>
                <ProductCard product={p} />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>

      {/* Footer */}
      <Footer />
    </Box>
  );
};

export default SearchResults;
