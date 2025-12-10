import { useState, useEffect } from 'react';
import './sidebar.css';
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
  Typography
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import CakeIcon from '@mui/icons-material/Cake';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import LocalDrinkIcon from '@mui/icons-material/LocalDrink';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { CATEGORIES } from '../../data/categories.js';
import { useAuth } from '../../context/AuthContext.jsx';

const iconMap = {
  Cake: <CakeIcon />,
  Fastfood: <FastfoodIcon />,
  LocalDrink: <LocalDrinkIcon />
};

const Sidebar = ({
  onCategorySelect,
  publicItems = [],
  authItems = [],
  onWidthChange
}) => {
  const [open, setOpen] = useState(true);
  const { user, logout } = useAuth();

  const expandedWidth = 240;
  const collapsedWidth = 72;
  const width = open ? expandedWidth : collapsedWidth;

  // Notify parent whenever width changes
  useEffect(() => {
    if (onWidthChange) onWidthChange(width);
  }, [width, onWidthChange]);

  return (
    <Drawer
      variant="permanent"
      PaperProps={{ style: { width } }}
      className="sidebar"
    >
      <Box className="logo">
        <IconButton onClick={() => setOpen(o => !o)} size="small">
          <MenuIcon />
        </IconButton>
        {open && <Typography variant="h6">SweetShop</Typography>}
      </Box>
      <Divider />
      <List>
        {publicItems.map(item => (
          <ListItem key={item.key} button onClick={item.onClick} className="navItem">
            <ListItemIcon>{item.icon}</ListItemIcon>
            {open && <ListItemText primary={item.label} />}
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {CATEGORIES.map(cat => (
          <ListItem key={cat.id} button onClick={() => onCategorySelect(cat.id)} className="navItem">
            <ListItemIcon>{iconMap[cat.icon]}</ListItemIcon>
            {open && <ListItemText primary={cat.label} />}
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {(user ? authItems : []).map(item => (
          <ListItem key={item.key} button onClick={item.onClick} className="navItem">
            <ListItemIcon>{item.icon}</ListItemIcon>
            {open && <ListItemText primary={item.label} />}
          </ListItem>
        ))}
        {!user && (
          <ListItem button className="navItem">
            <ListItemIcon><LockOpenIcon /></ListItemIcon>
            {open && <ListItemText primary="Login to unlock" />}
          </ListItem>
        )}
        {user && (
          <ListItem button onClick={logout} className="navItem">
            <ListItemIcon><LogoutIcon /></ListItemIcon>
            {open && <ListItemText primary="Logout" />}
          </ListItem>
        )}
      </List>
    </Drawer>
  );
};

export default Sidebar;
