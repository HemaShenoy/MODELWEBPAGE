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
    setSearchOpen(false);
    setSuggestions([]);
    navigate(`/search/${encodeURIComponent(search.trim())}`);
    setSearch('');
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
    <IconButton onClick={handleMenuOpen} aria-label="profile" sx={{ color: '#000' }}>
      <Typography sx={{ fontWeight: 700, mr: 1 }}>
        {user.name || user.email.split('@')[0]}
      </Typography>
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

      {/* Search Bar with Black Background Overlay */}
      {searchOpen && (
        <>
          {/* Black Overlay */}
          <Box
            sx={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              bgcolor: 'rgba(0, 0, 0, 0.9)',
              zIndex: 999,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'flex-start',
              pt: 8
            }}
            onClick={() => {
              setSearchOpen(false);
              setSuggestions([]);
            }}
          >
            {/* Search Box Container */}
            <Box
              sx={{
                width: '90%',
                maxWidth: 600,
                zIndex: 1000
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Search Input */}
              <Box sx={{ display: 'flex', alignItems: 'center', bgcolor: '#fff', px: 2, borderRadius: 2, mb: 2 }}>
                <InputBase
                  placeholder="Search products…"
                  value={search}
                  onChange={handleChange}
                  sx={{ flex: 1, ml: 1, fontSize: '1.1rem' }}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  autoFocus
                />
                <IconButton onClick={handleSearch} sx={{ color: '#000' }}>
                  <SearchIcon />
                </IconButton>
              </Box>

              {/* Suggestions */}
              {suggestions.length > 0 && (
                <Paper sx={{ maxHeight: 400, overflow: 'auto' }}>
                  <List>
                    {suggestions.map((s) => (
                      <ListItem key={s.id} disablePadding>
                        <ListItemButton onClick={() => handleSuggestionClick(s.name)}>
                          <Box sx={{ mr: 2, width: 50, height: 50, borderRadius: 1, overflow: 'hidden' }}>
                            <img
                              src={s.image}
                              alt={s.name}
                              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                          </Box>
                          <Box sx={{ flex: 1 }}>
                            <ListItemText
                              primary={s.name}
                              secondary={`${s.category} • From ₹${Object.values(s.prices)[0]}`}
                            />
                          </Box>
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </Paper>
              )}
            </Box>
          </Box>
        </>
      )}
    </AppBar>
  );
};

export default Topbar;
