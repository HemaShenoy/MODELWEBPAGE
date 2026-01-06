// src/pages/ProductDetail.jsx
import { useState, useEffect } from 'react';
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
  Chip,
  Rating,
  LinearProgress
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
  const [reviews, setReviews] = useState([]); // start empty
  const [newReview, setNewReview] = useState({ name: '', rating: 0, comment: '' });
  const [showForm, setShowForm] = useState(false);

  // Load reviews from localStorage on mount
  useEffect(() => {
    if (product?.id) {
      const storageKey = `reviews_${product.id}`;
      const savedReviews = localStorage.getItem(storageKey);
      if (savedReviews) {
        try {
          setReviews(JSON.parse(savedReviews));
        } catch (error) {
          console.error('Error parsing reviews from localStorage:', error);
        }
      }
    }
  }, [product?.id]);

  // Save reviews to localStorage whenever they change
  useEffect(() => {
    if (product?.id && reviews.length > 0) {
      const storageKey = `reviews_${product.id}`;
      localStorage.setItem(storageKey, JSON.stringify(reviews));
    }
  }, [reviews, product?.id]);

  const unitPrice = product?.prices[weight];
  const cartItem = items.find(
    (i) => i.productId === product?.id && i.weight === weight
  );
  const quantity = cartItem?.quantity || 0;

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;

  if (!product) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Topbar
          publicItems={[
            { key: 'home', label: 'Home', onClick: () => navigate('/dashboard') },
            { key: 'about', label: 'About', onClick: () => navigate('/info/about') }
          ]}
          authItems={[
            { key: 'orders', label: 'My Orders', onClick: () => navigate('/orders') }
          ]}
        />
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

  const handleReviewSubmit = () => {
    if (!newReview.name || !newReview.comment || !newReview.rating) return;

    const newEntry = {
      id: Date.now(),
      name: newReview.name,
      date: new Date().toLocaleDateString('en-IN'),
      rating: newReview.rating,
      comment: newReview.comment
    };

    setReviews([newEntry, ...reviews]);
    setNewReview({ name: '', rating: 0, comment: '' });
    setShowForm(false);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Topbar
        publicItems={[
          { key: 'home', label: 'Home', onClick: () => navigate('/dashboard') },
          { key: 'about', label: 'About', onClick: () => navigate('/info/about') }
        ]}
        authItems={[
          { key: 'orders', label: 'My Orders', onClick: () => navigate('/orders') }
        ]}
      />

      <Box sx={{ flex: 1, p: 3 }}>
        <Box sx={{ flex: 1, p: 3 }}>
          {/* Product Section with image left and details right */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 4
            }}
          >
            {/* Image on the left */}
            <Box>
              <img
                src={product.image}
                alt={product.name}
                style={{
                  width: '400px',
                  height: '400px',
                  objectFit: 'contain',
                  borderRadius: '8px',
                  transition: 'transform 0.35s ease',
                  transformOrigin: 'center center'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(0.92)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              />
            </Box>

            {/* Details on the right */}
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
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
                <Select size="small" value={weight} onChange={(e) => setWeight(e.target.value)}>
                  {WEIGHTS.map((w) => (
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
                      onClick={() =>
                        quantity > 1 &&
                        updateQuantity(product.id, weight, quantity - 1)
                      }
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
            </Box>
          </Box>
        </Box>

        {/* Customer Reviews */}
        <Box sx={{ mt: 5, textAlign: 'center' }}>
          <Typography variant="h5" sx={{ mb: 1 }}>
            Customer Reviews
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 2 }}>
            <Rating value={averageRating} precision={0.5} readOnly />
            <Typography sx={{ ml: 1 }}>
              {averageRating.toFixed(2)} out of 5
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Based on {reviews.length} reviews ✔ Verified
          </Typography>

          {/* Rating Distribution with Bars */}
          {[5, 4, 3, 2, 1].map((star) => {
            const count = reviews.filter((r) => r.rating === star).length;
            const percent = reviews.length ? (count / reviews.length) * 100 : 0;
            return (
              <Box key={star} sx={{ display: 'flex', alignItems: 'center', mb: 1, maxWidth: 400, mx: 'auto' }}>
                <Typography sx={{ width: 40 }}>{star}★</Typography>
                <LinearProgress
                  variant="determinate"
                  value={percent}
                  sx={{ flex: 1, mx: 1, height: 10, borderRadius: 5 }}
                />
                <Typography sx={{ width: 40, textAlign: 'right' }}>
                  {count}
                </Typography>
              </Box>
            );
          })}

          {/* Reviews List */}
          {reviews.map((review) => (
            <Box
              key={review.id}
              sx={{
                borderBottom: '1px solid #ddd',
                mb: 2,
                pb: 2,
                maxWidth: 600,
                mx: 'auto',
                textAlign: 'left'
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Rating value={review.rating} readOnly size="small" />
                <Typography variant="body2" sx={{ ml: 1 }}>
                  {review.date}
                </Typography>
              </Box>
              <Typography variant="subtitle2">{review.name} (Verified)</Typography>
              <Typography variant="body2">{review.comment}</Typography>
            </Box>
          ))}

          {/* Write a Review Button / Form */}
          {!showForm ? (
            <Button variant="outlined" sx={{ mt: 2 }} onClick={() => setShowForm(true)}>
              Write a Review
            </Button>
          ) : (
            <Box sx={{ mt: 3, maxWidth: 600, mx: 'auto', textAlign: 'left' }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Submit Your Review
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Typography>Name</Typography>
                <input
                  type="text"
                  value={newReview.name}
                  onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                  style={{ width: '100%', padding: '8px' }}
                />
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography>Rating</Typography>
                <Rating
                  value={newReview.rating}
                  onChange={(e, value) => setNewReview({ ...newReview, rating: value })}
                />
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography>Comment</Typography>
                <textarea
                  rows={3}
                  value={newReview.comment}
                  onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                  style={{ width: '100%', padding: '8px' }}
                />
              </Box>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button variant="contained" onClick={handleReviewSubmit}>
                  Submit Review
                </Button>
                <Button variant="text" onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
              </Box>
            </Box>
          )}
        </Box>
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