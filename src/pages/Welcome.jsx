import { Box, Typography, Paper, Grid, List, ListItem, ListItemText } from '@mui/material';
import { useAuth } from '../context/AuthContext.jsx';
import { useCart } from '../context/CartContext.jsx';

const Welcome = () => {
  const { user } = useAuth();
  const { totalCount, totalPrice } = useCart();

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Typography variant="h4" gutterBottom>
        E-commerce Dashboard
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Welcome back, {user?.email || 'Guest'}
      </Typography>

      {/* Info Cards */}
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={12} sm={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Cart Items</Typography>
            <Typography variant="h4">{totalCount}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Cart Total</Typography>
            <Typography variant="h4">₹{totalPrice}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Categories</Typography>
            <Typography variant="h4">3</Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Quick Actions */}
      <Paper sx={{ p: 2, mt: 4 }}>
        <Typography variant="h6" gutterBottom>Quick Actions</Typography>
        <List dense>
          <ListItem>
            <ListItemText primary="Browse products by category using the sidebar" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Add items to your cart with different weight options" />
          </ListItem>
          <ListItem>
            <ListItemText primary="View and manage your cart items" />
          </ListItem>
          <ListItem>
            <ListItemText primary="All your data is securely stored in your browser" />
          </ListItem>
        </List>
      </Paper>

    </Box>
  );
};

export default Welcome;
