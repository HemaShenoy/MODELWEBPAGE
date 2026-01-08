import { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Badge,
  InputBase,
  Paper,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  Typography
} from '@mui/material';

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';

import { useCart } from '../../context/CartContext.jsx';
import { useNavigate } from 'react-router-dom';
import { PRODUCTS } from '../../data/products.js';
import { useAuth } from '../../context/AuthContext.jsx';

import Logo from '../../assets/images/logo.jpg';

const CATEGORIES = [
  { id: 'sweets', label: 'Sweets' },
  { id: 'snacks', label: 'Snacks' },
  { id: 'beverages', label: 'Beverages' }
];

const Topbar = () => {
  const { totalCount } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleSearch = () => {
    if (search.trim()) {
      navigate(`/search/${encodeURIComponent(search.trim())}`);
      setSearch('');
      setSuggestions([]);
      setSearchOpen(false);
    }
  };

  const handleCategorySelect = (catId) => {
    navigate(`/dashboard/${catId}`);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setSearch(value);

    if (value.trim().length > 0) {
      const q = value.toLowerCase();
      const matches = PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      ).slice(0, 5);
      setSuggestions(matches);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (term) => {
    navigate(`/search/${encodeURIComponent(term)}`);
    setSearch('');
    setSuggestions([]);
    setSearchOpen(false);
  };

  // Profile menu handlers
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="sticky" elevation={1} sx={{ bgcolor: '#fff', color: '#000' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
        {/* Logo */}
        <Box
          sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer' }}
          onClick={() => navigate('/dashboard')}
        >
          <img src={Logo} alt="SweetShop Logo" style={{ height: 40 }} />
        </Box>

        {/* Categories */}
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {CATEGORIES.map((cat) => (
            <IconButton
              key={cat.id}
              sx={{ color: '#000', fontSize: '1rem' }}
              onClick={() => handleCategorySelect(cat.id)}
            >
              {cat.label}
            </IconButton>
          ))}
        </Box>

        {/* Right side */}
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          {/* Login/Profile */}
{user ? (
  <>
    <IconButton onClick={handleMenuOpen}>
      <Avatar sx={{ bgcolor: 'secondary.main' }}>
        {user.email.charAt(0).toUpperCase()}
      </Avatar>
    </IconButton>
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleMenuClose}
    >
      <Box sx={{ px: 2, py: 1 }}>
        <Typography variant="subtitle1">{user.name}</Typography>
        <Typography variant="body2">{user.email}</Typography>
        <Typography variant="body2">{user.location || 'India'}</Typography>
      </Box>
      <Divider />
      <MenuItem onClick={() => { navigate('/profile'); handleMenuClose(); }}>
        My Account
      </MenuItem>
      <MenuItem onClick={() => { logout(); navigate('/login'); handleMenuClose(); }}>
        Log out
      </MenuItem>
    </Menu>
  </>
) : (
  <IconButton sx={{ color: '#000' }} onClick={() => navigate('/login')}>
    <PersonIcon />
  </IconButton>
)}


          {/* Search */}
          <IconButton sx={{ color: '#000' }} onClick={() => setSearchOpen(!searchOpen)}>
            <SearchIcon />
          </IconButton>

          {/* Cart */}
          <IconButton onClick={() => navigate('/cart')} sx={{ color: '#000' }}>
            <Badge badgeContent={totalCount} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Box>
      </Toolbar>

      {/* Search Bar */}
      {searchOpen && (
        <Box sx={{ p: 2, bgcolor: '#f5f5f5' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', bgcolor: '#fff', px: 1, borderRadius: 1 }}>
            <InputBase
              placeholder="Search…"
              value={search}
              onChange={handleChange}
              sx={{ flex: 1, ml: 1 }}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <IconButton onClick={handleSearch} sx={{ color: '#000' }}>
              <SearchIcon />
            </IconButton>
          </Box>

          {suggestions.length > 0 && (
            <Paper sx={{ mt: 1 }}>
              <List>
                {suggestions.map((s) => (
                  <ListItem key={s.id} disablePadding>
                    <ListItemButton onClick={() => handleSuggestionClick(s.name)}>
                      <ListItemText primary={s.name} secondary={s.category} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Paper>
          )}
        </Box>
      )}
    </AppBar>
  );
};

export default Topbar;
