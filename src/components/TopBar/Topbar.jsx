// src/components/Topbar/Topbar.jsx
import { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Box,
  Tooltip,
  Badge,
  InputBase,
  Paper,
  List,
  ListItem,
  ListItemButton,
  ListItemText
} from '@mui/material';

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';

import { useCart } from '../../context/CartContext.jsx';
import { useThemeMode } from '../../context/ThemeContext.jsx';
import { useNavigate } from 'react-router-dom';
import { PRODUCTS } from '../../data/products.js';
import { useAuth } from '../../context/AuthContext.jsx';

const CATEGORIES = [
  { id: 'sweets', label: 'Sweets' },
  { id: 'snacks', label: 'Snacks' },
  { id: 'beverages', label: 'Beverages' }
];

const Topbar = () => {
  const { totalCount } = useCart();
  const { mode, toggleMode } = useThemeMode();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleSearch = () => {
    if (search.trim()) {
      navigate(`/search/${encodeURIComponent(search.trim())}`);
      setSearch('');
      setSuggestions([]);
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
  };

  return (
    <AppBar
      position="sticky"
      elevation={1}
      sx={{
        bgcolor: '#fff',
        color: '#000'
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
        {/* Logo */}
        <Box
          sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer' }}
          onClick={() => navigate('/dashboard')}
        >
          <Typography variant="h6" sx={{ fontWeight: 700, color: '#000' }}>
            SweetShop
          </Typography>
        </Box>

        {/* Categories */}
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {CATEGORIES.map((cat) => (
            <Button
              key={cat.id}
              sx={{ color: '#000' }}
              onClick={() => handleCategorySelect(cat.id)}
            >
              {cat.label}
            </Button>
          ))}
        </Box>

        {/* Actions */}
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', position: 'relative' }}>
          <Button sx={{ color: '#000' }} onClick={() => navigate('/orders')}>
            My Orders
          </Button>

          {user ? (
            <Button
              sx={{ color: '#000' }}
              startIcon={<LogoutIcon />}
              onClick={logout}
            >
              Logout
            </Button>
          ) : (
            <Button
              sx={{ color: '#000' }}
              startIcon={<PersonIcon />}
              onClick={() => navigate('/login')}
            >
              Login
            </Button>
          )}

          <Tooltip title="Toggle theme">
            <IconButton onClick={toggleMode} sx={{ color: '#000' }}>
              {mode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
            </IconButton>
          </Tooltip>

          <IconButton onClick={() => navigate('/cart')} sx={{ color: '#000' }}>
            <Badge badgeContent={totalCount} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>

          {/* Search with suggestions */}
          <Box sx={{ position: 'relative' }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                bgcolor: 'rgba(0,0,0,0.05)',
                px: 1,
                borderRadius: 1
              }}
            >
              <InputBase
                placeholder="Search…"
                value={search}
                onChange={handleChange}
                sx={{ color: '#000', ml: 1 }}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
              <IconButton onClick={handleSearch} sx={{ color: '#000' }}>
                <SearchIcon />
              </IconButton>
            </Box>

            {suggestions.length > 0 && (
              <Paper
                sx={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  right: 0,
                  zIndex: 10
                }}
              >
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
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
