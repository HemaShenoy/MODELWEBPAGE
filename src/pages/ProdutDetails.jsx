import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Grid,
  Rating,
  LinearProgress,
  Chip
} from '@mui/material';

import { PRODUCTS } from '../data/products';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import Topbar from '../components/TopBar/Topbar';
import Footer from '../components/Footer/Footer';

const WEIGHTS = ['200', '400', '600'];
const IMAGE_SIZE = 380;
const muted = '#6b7280';

const ProductDetails = () => {
  const { id } = useParams();
  const product = PRODUCTS.find(p => p.id === id);

  const { addItem, updateQuantity, items } = useCart();
  const { user } = useAuth();

  const [imageIndex, setImageIndex] = useState(0);
  const [weight, setWeight] = useState('200');
  const [reviews, setReviews] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [review, setReview] = useState({ rating: null, comment: '' });

  /* 🔴 HOOKS MUST RUN BEFORE ANY RETURN */
  useEffect(() => {
    if (!product) return;
    const saved = localStorage.getItem(`reviews_${product.id}`);
    if (saved) setReviews(JSON.parse(saved));
  }, [product]);

  useEffect(() => {
    if (!product) return;
    localStorage.setItem(`reviews_${product.id}`, JSON.stringify(reviews));
  }, [reviews, product]);

  if (!product) return null;

  const images = [product.image, product.image];
  const unitPrice = product.prices[weight];

  const cartItem = items.find(
    i => i.productId === product.id && i.weight === weight
  );
  const quantity = cartItem?.quantity || 0;

  const avgRating =
    reviews.length > 0
      ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length
      : 0;

  const submitReview = () => {
    if (!user || !review.rating || !review.comment.trim()) return;

    setReviews([
      {
        id: Date.now(),
        name: user.email.split('@')[0],
        rating: review.rating,
        comment: review.comment,
        date: new Date().toLocaleDateString()
      },
      ...reviews
    ]);

    setReview({ rating: null, comment: '' });
    setShowForm(false);
  };

  return (
    <Box>
      <Topbar />

      {/* PRODUCT SECTION */}
      <Box px={8} py={5}>
        <Grid container spacing={5} alignItems="flex-start">
          {/* LEFT IMAGE */}
          <Grid item xs={12} md={6}>
            <Box display="flex" gap={2}>
              {/* THUMBNAILS */}
              <Box display="flex" flexDirection="column" gap={1}>
                {images.map((img, i) => (
                  <Box
                    key={i}
                    component="img"
                    src={img}
                    onClick={() => setImageIndex(i)}
                    sx={{
                      width: 70,
                      height: 70,
                      objectFit: 'contain',
                      border:
                        imageIndex === i
                          ? '2px solid teal'
                          : '1px solid #ccc',
                      cursor: 'pointer'
                    }}
                  />
                ))}
              </Box>

              {/* MAIN IMAGE */}
              <Box
                sx={{
                  width: IMAGE_SIZE,
                  height: IMAGE_SIZE,
                  border: '1px solid #eee',
                  borderRadius: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative'
                }}
              >
                <img
                  src={images[imageIndex]}
                  alt={product.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain'
                  }}
                />

                <Button
                  sx={{ position: 'absolute', left: 5 }}
                  onClick={() =>
                    setImageIndex(
                      (imageIndex - 1 + images.length) % images.length
                    )
                  }
                >
                  ‹
                </Button>

                <Button
                  sx={{ position: 'absolute', right: 5 }}
                  onClick={() =>
                    setImageIndex((imageIndex + 1) % images.length)
                  }
                >
                  ›
                </Button>
              </Box>
            </Box>
          </Grid>

          {/* RIGHT DETAILS */}
          <Grid item xs={12} md={6}>
            <Rating value={avgRating} readOnly />

            <Typography variant="h4" fontWeight={600} mt={1}>
              {product.name}
            </Typography>

            <Typography variant="h5" sx={{ color: muted, mt: 1 }}>
              ₹ {unitPrice}
            </Typography>

            {/* GRAMS BOXES */}
            <Box mt={3}>
              <Typography sx={{ color: muted, mb: 1 }}>Size</Typography>
              <Box display="flex" gap={2}>
                {WEIGHTS.map(w => (
                  <Box
                    key={w}
                    onClick={() => setWeight(w)}
                    sx={{
                      px: 3,
                      py: 1.2,
                      border:
                        weight === w ? '2px solid #333' : '1px solid #ccc',
                      cursor: 'pointer'
                    }}
                  >
                    {w} Gms
                  </Box>
                ))}
              </Box>
            </Box>

            {/* CART */}
            <Box mt={4}>
              {!quantity ? (
                <Button
                  fullWidth
                  sx={{ py: 1.4, background: '#2196F3', color: '#fff' }}
                  onClick={() =>
                    addItem({
                      productId: product.id,
                      name: product.name,
                      weight,
                      unitPrice
                    })
                  }
                >
                  ADD TO CART
                </Button>
              ) : (
                <Box display="flex" gap={2} alignItems="center">
                  <Button
                    variant="outlined"
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
                    onClick={() =>
                      updateQuantity(product.id, weight, quantity + 1)
                    }
                  >
                    +
                  </Button>
                </Box>
              )}
            </Box>

            {quantity > 0 && (
              <Chip
                sx={{ mt: 2 }}
                label={`Total ₹${quantity * unitPrice}`}
              />
            )}

            {/* DETAILS */}
            <Typography mt={4} sx={{ color: muted }}>
              {product.details}
            </Typography>
            <Typography sx={{ color: muted }}>
              <b>Ingredients:</b> {product.ingredients}
            </Typography>
            <Typography sx={{ color: muted }}>
              <b>Uses:</b> {product.uses}
            </Typography>
            <Typography sx={{ color: muted }}>
              <b>Expiry:</b> {product.expiry}
            </Typography>
            <Typography sx={{ color: muted }}>
              <b>Shelf Life:</b> {product.shelfLife}
            </Typography>
            <Typography sx={{ color: muted }}>
              <b>Shipping:</b> {product.shipping}
            </Typography>
          </Grid>
        </Grid>

 {/* REVIEWS */}
<Box mt={10}>
  <Typography align="center" variant="h5" fontWeight={600}>
    CUSTOMER REVIEWS
  </Typography>

  {/* CENTERED SUMMARY */}
  <Box display="flex" justifyContent="center" mt={3}>
    <Grid
      container
      spacing={4}
      maxWidth="md"
      justifyContent="center"
      alignItems="center"
      textAlign="center"
    >
      <Grid item xs={12} md={4}>
        <Rating value={avgRating} readOnly />
        <Typography sx={{ color: muted }}>
          {avgRating.toFixed(2)} out of 5
        </Typography>
        <Typography sx={{ color: muted }}>
          Based on {reviews.length} reviews
        </Typography>
      </Grid>

      <Grid item xs={12} md={4}>
        {[5, 4, 3, 2, 1].map(star => {
          const count = reviews.filter(r => r.rating === star).length;
          const percent = reviews.length
            ? (count / reviews.length) * 100
            : 0;

          return (
            <Box key={star} display="flex" alignItems="center" mb={1}>
              <Rating value={star} readOnly size="small" />
              <LinearProgress
                value={percent}
                variant="determinate"
                sx={{ flex: 1, mx: 2, height: 8 }}
              />
              <Typography>{count}</Typography>
            </Box>
          );
        })}
      </Grid>

      <Grid item xs={12} md={4}>
        <Button variant="contained" onClick={() => setShowForm(true)}>
          Write a review
        </Button>
      </Grid>
    </Grid>
  </Box>

  {/* LEFT-ALIGNED REVIEW LIST */}
  <Box mt={5} maxWidth={900} mx="auto">
    {reviews.map(r => (
      <Box key={r.id} py={3} borderBottom="1px solid #eee">
        <Rating value={r.rating} readOnly size="small" />
        <Typography fontWeight={600}>{r.name}</Typography>
        <Typography sx={{ color: muted, mt: 0.5 }}>
          {r.comment}
        </Typography>
        <Typography sx={{ color: '#999', fontSize: 12, mt: 0.5 }}>
          {r.date}
        </Typography>
      </Box>
    ))}
  </Box>

  {/* REVIEW FORM */}
  {showForm && (
    <Box mt={4} maxWidth={500} mx="auto">
      <Rating
        value={review.rating}
        onChange={(e, v) => setReview({ ...review, rating: v })}
      />
      <textarea
        rows={3}
        value={review.comment}
        onChange={e =>
          setReview({ ...review, comment: e.target.value })
        }
        style={{ width: '100%', marginTop: 10, padding: 8 }}
      />
      <Button fullWidth sx={{ mt: 2 }} onClick={submitReview}>
        Submit Review
      </Button>
    </Box>
  )}
</Box>
 </Box> <Footer /> </Box> ); };

export default ProductDetails;