import { useState, useEffect } from 'react';
import './sidebar.css';
import {
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
  Typography,
  useMediaQuery,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import CakeIcon from '@mui/icons-material/Cake';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import LocalDrinkIcon from '@mui/icons-material/LocalDrink';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { CATEGORIES } from '../../data/categories.js';
import { useAuth } from '../../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';

const iconMap = {
  Cake: <CakeIcon />,
  Fastfood: <FastfoodIcon />,
  LocalDrink: <LocalDrinkIcon />
};

const Sidebar = ({
  onCategorySelect,
  publicItems = [],
  authItems = [],
  onWidthChange,
  activeCategory // ✅ highlight selected category
}) => {
  const [open, setOpen] = useState(true);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width:600px)');
  const [logoutDialog, setLogoutDialog] = useState(false);

  const expandedWidth = 240;
  const collapsedWidth = 72;
  const width = open ? expandedWidth : collapsedWidth;

  useEffect(() => {
    if (onWidthChange) onWidthChange(width);
  }, [width, onWidthChange]);

  return (
    <>
      <Drawer
        variant={isMobile ? 'temporary' : 'permanent'}
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{ style: { width } }}
        className="sidebar"
      >
        {/* Logo + toggle */}
        <Box className="logo">
          <IconButton
            onClick={() => setOpen(o => !o)}
            size="small"
            aria-label="Toggle sidebar"
          >
            <MenuIcon />
          </IconButton>
          {open && <Typography variant="h6">SweetShop</Typography>}
        </Box>
        <Divider />

        {/* Public items */}
        <List>
          {publicItems.map(item => (
            <ListItemButton
              key={item.key}
              onClick={item.onClick}
              className="navItem"
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              {open && <ListItemText primary={item.label} />}
            </ListItemButton>
          ))}
        </List>
        <Divider />

        {/* Categories */}
        <List>
          {CATEGORIES.map(cat => (
            <ListItemButton
              key={cat.id}
              onClick={() => onCategorySelect(cat.id)}
              className="navItem"
              selected={activeCategory === cat.id}
            >
              <ListItemIcon>{iconMap[cat.icon] || <CakeIcon />}</ListItemIcon>
              {open && <ListItemText primary={cat.label} />}
            </ListItemButton>
          ))}
        </List>
        <Divider />

        {/* Auth items */}
        <List>
          {(user ? authItems : []).map(item => (
            <ListItemButton
              key={item.key}
              onClick={item.onClick}
              className="navItem"
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              {open && <ListItemText primary={item.label} />}
            </ListItemButton>
          ))}

          {!user && (
            <ListItemButton
              onClick={() => navigate('/login')}
              className="navItem"
            >
              <ListItemIcon>
                <LockOpenIcon />
              </ListItemIcon>
              {open && <ListItemText primary="Login to unlock" />}
            </ListItemButton>
          )}

          {user && (
            <ListItemButton
              onClick={() => setLogoutDialog(true)}
              className="navItem"
            >
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              {open && <ListItemText primary="Logout" />}
            </ListItemButton>
          )}
        </List>
      </Drawer>

      {/* Logout confirmation dialog */}
      <Dialog open={logoutDialog} onClose={() => setLogoutDialog(false)}>
        <DialogTitle>Confirm Logout</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to log out?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setLogoutDialog(false)}>Cancel</Button>
          <Button
            onClick={() => {
              logout();
              setLogoutDialog(false);
              navigate('/login');
            }}
            variant="contained"
            color="primary"
          >
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Sidebar;
