import React from 'react';
import { AppBar, Toolbar, Box, IconButton, Badge, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext.jsx';
import './header.css';

const Header = ({ onMenu }) => {
  const navigate = useNavigate();
  const { totalCount } = useCart();

  return (
    <AppBar position="static" className="app-header" elevation={0}>
      <Toolbar className="header-inner container">
        <Box className="flex" onClick={() => navigate('/dashboard')} style={{cursor:'pointer'}}>
          <img src="/logo192.png" alt="logo" style={{height:44, marginRight:12}} />
          <div style={{fontSize:18}}>SweetShop</div>
        </Box>

        <Box sx={{flex:1, mx:2, maxWidth:600}}>
          <Box className="card" sx={{display:'flex', alignItems:'center', gap:1}}>
            <InputBase placeholder="Search sweets, snacks, drinks..." fullWidth />
            <IconButton><SearchIcon /></IconButton>
          </Box>
        </Box>

        <Box className="flex" sx={{gap:1}}>
          <IconButton color="inherit" onClick={onMenu}><MenuIcon /></IconButton>
          <IconButton onClick={() => navigate('/cart')}>
            <Badge badgeContent={totalCount} color="secondary">
              <ShoppingCartIcon sx={{color:'#fff'}} />
            </Badge>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;