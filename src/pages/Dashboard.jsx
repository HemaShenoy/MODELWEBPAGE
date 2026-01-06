// src/pages/Dashboard.jsx
import { useState } from 'react';
import {
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions
} from '@mui/material';

import ProductList from '../components/Product/ProductList.jsx';
import Footer from '../components/Footer/Footer.jsx';

import Topbar from '../components/TopBar/Topbar.jsx';

import { useNavigate, useParams } from 'react-router-dom';

// Hero slider dependency
import Slider from 'react-slick';
import { PRODUCTS } from '../data/products.js';

const Dashboard = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // category from URL
  const [aboutDialog, setAboutDialog] = useState(false);

  const isCategoryView = Boolean(id); 

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Topbar */}
      <Topbar
        publicItems={[
          { key: 'home', label: 'Home', onClick: () => navigate('/dashboard') },
          { key: 'about', label: 'About', onClick: () => setAboutDialog(true) }
        ]}
        authItems={[
          { key: 'orders', label: 'My Orders', onClick: () => navigate('/orders') }
        ]}
      />

      {/* Body */}
      <Box sx={{ flex: 1, p: 2 }}>
        {isCategoryView ? (
          
          <ProductList activeCategory={id} />
        ) : (
          <>
            
            <HeroSlider onShopNow={() => navigate('/dashboard/sweets')} />
             < OurStory /> 
              
            <CategoryGrid onNavigate={(cat) => navigate(`/dashboard/${cat}`)} />
            <NewArrivals onNavigate={(cat) => navigate(`/dashboard/${cat}`)} />
            
            <LifestyleSection onShopNamkeen={() => navigate('/dashboard/snacks')} />
                    <Box component="img" src={require('../assets/images/jjjj.jpg')} alt="Special Banner" sx={{ width: '100%', maxHeight: 280, objectFit: 'cover', borderRadius: 3, my: 3, boxShadow: 3 }} />
            <BlogPosts />
          </>
        )}
      </Box>
       {/* Gift banner above footer */}
<Box
  component="img"
  src={require('../assets/images/gift.jpg')}
  alt="Gift Banner"
  sx={{
    width: '100%',
    maxHeight: 280,
    objectFit: 'cover',
    borderRadius: 0,   
    display: 'block', 
    boxShadow: 0       
  }}
/>
      <Footer />

      {/* About dialog */}
      <Dialog open={aboutDialog} onClose={() => setAboutDialog(false)}>
        <DialogTitle>About SweetShop</DialogTitle>
        <DialogContent>
          <Typography>
            SweetShop brings you authentic sweets, snacks, beverages, and gift packs inspired by tradition.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAboutDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};



const HeroSlider = ({ onShopNow }) => {
  const settings = {
  dots: true,
  infinite: true,
  speed: 700,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3500,
  arrows: true,             

};

const banners = [
  { src: require('../assets/images/jj.jpg'), alt: 'JJ Banner' },
  { src: require('../assets/images/jjj.jpg'), alt: 'JJJ Banner' }
];


  return (
    <Box sx={{ position: 'relative', mb: 3, overflow: 'hidden', borderRadius: 2 }}>
      <Slider {...settings}>
        {banners.map((b, idx) => (
          <Box key={idx} sx={{ position: 'relative' }}>
            <img
              src={b.src}
              alt={b.alt}
              style={{
                width: '100%',
                height: '420px',
                objectFit: 'cover',
                borderRadius: '12px'
              }}
            />
          </Box>
        ))}
      </Slider>
      <Box
        sx={{
          position: 'absolute',
          top: { xs: '10%', md: '15%' },
          left: { xs: '6%', md: '8%' },
          color: '#fff',
          maxWidth: { xs: '88%', md: '40%' },
          textShadow: '0 2px 8px rgba(0,0,0,0.4)'
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          We are accepting orders to UK now
        </Typography>
        <Typography sx={{ mt: 1 }}>Freshly made • Authentic taste • Perfect for gifting</Typography>
        <Button variant="contained" color="secondary" sx={{ mt: 2 }} onClick={onShopNow}>
          Shop Sweets
        </Button>
      </Box>
    </Box>
  );
};
const OurStory = () => {
  return (
    <Box
      sx={{
        mt: 4,
        mb: 4,
        p: { xs: 2, md: 4 },
        bgcolor: 'background.paper',
        borderRadius: 3,
        boxShadow: 3,
        textAlign: 'center'
      }}
    >
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
        Vellanki Foods
      </Typography>
      <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
        Our Story
      </Typography>
      <Typography sx={{ mb: 3, maxWidth: 700, mx: 'auto' }}>
        In 1989, we realised that times were changing. With mothers beginning to work outside the home, 
        it was increasingly difficult to invest the time and effort needed to prepare pickles and powders 
        for the family. Home-made pickles were disappearing from the typical Telugu home.
      </Typography>
      <Button variant="contained" color="secondary">
        Read More
      </Button>
    </Box>
  );
};

const CategoryGrid = ({ onNavigate }) => {
  const categories = [
    { key: 'sweets', label: 'Sweets', image: require('../assets/images/hi1.jpg') },
    { key: 'snacks', label: 'Snacks', image: require('../assets/images/hi2.jpg') },
    { key: 'beverages', label: 'Beverages', image: require('../assets/images/hi3.jpg') }
  ];

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 700 }}>
        Shop by category
      </Typography>

      <Grid container spacing={3}>
        {categories.map((c) => (
          <Grid item xs={12} sm={6} md={3} key={c.key}>
            <Card
              sx={{
                position: 'relative',
                borderRadius: 2,
                overflow: 'hidden',
                cursor: 'pointer',
                aspectRatio: '1 / 1',   // ✅ square cards
                '&:hover': { boxShadow: 6, transform: 'scale(1.02)' },
                transition: 'all 0.3s ease'
              }}
              onClick={() => onNavigate(c.key)}
            >
              {/* Background image */}
              <CardMedia
                component="img"
                image={c.image}
                alt={c.label}
                sx={{
                  width: 400,
                  height: 400,
                  objectFit: 'cover'
                }}
              />

              {/* Overlay text + button */}
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  color: '#fff',
                  background: 'rgba(0,0,0,0.35)'
                }}
              >
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
                  {c.label}
                </Typography>
                <Button
                  variant="contained"
                  sx={{
                    bgcolor: '#fff',
                    color: '#000',
                    fontWeight: 600,
                    '&:hover': { bgcolor: '#f0f0f0' }
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onNavigate(c.key);
                  }}
                >
                  Shop Now
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};


const NewArrivals = ({ onNavigate }) => {
  const items = PRODUCTS.slice(0, 4);

  return (
    <Box sx={{ mt: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          New arrivals
        </Typography>
        <Button onClick={() => onNavigate('sweets')}>View all</Button>
      </Box>
      <Grid container spacing={2}>
        {items.map((p) => (
          <Grid item xs={12} sm={6} md={3} key={p.id}>
            <Card
              sx={{
                borderRadius: 3,
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                height: '100%'
              }}
            >
              {/* ✅ Fixed image area */}
              <CardMedia
                component="img"
                image={p.image}
                alt={p.name}
                sx={{
                  width: 200,
                  height: 200,          
                  objectFit: 'cover'
                }}
              />

              <CardContent sx={{ flexGrow: 1 }}>
                <Typography sx={{ fontWeight: 600 }}>{p.name}</Typography>
                <Typography color="text.secondary">
                  {Object.keys(p.prices)[0]} g
                </Typography>
                <Typography sx={{ mt: 1, fontWeight: 700 }}>
                  ₹{Object.values(p.prices)[0]}
                </Typography>
              </CardContent>

              <CardActions sx={{ px: 2, pb: 2 }}>
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => onNavigate(p.category)}
                >
                  Shop Now
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};


const LifestyleSection = ({ onShopNamkeen }) => {
  return (
    <Box
      sx={{
        my: 5,
        p: { xs: 2, md: 3 },
        bgcolor: 'background.paper',
        borderRadius: 3,
        boxShadow: 3,
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: 'center',
        gap: 3
      }}
    >
      
      <Box
        component="img"
        src={require('../assets/images/nibbles.jpg')}
        alt="4pm Nibbles"
        sx={{
          width: { xs: '80%', md: '25%' },   
          borderRadius: 2,
          objectFit: 'cover',
          boxShadow: 2,
          margin: '0 auto'
        }}
      />

      {/* Text side */}
      <Box sx={{ flex: 1 }}>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          4pm Nibbles
        </Typography>
        <Typography sx={{ mt: 1 }}>
          Time for evening chai — and a delicious snack to go with it! Try our
          traditional South Indian treats: muruku, chegodi, and Telangana chekkalu.
          Light, protein-rich, and perfect with strong tea or coffee.
        </Typography>
        <Button sx={{ mt: 2 }} variant="contained" onClick={onShopNamkeen}>
          Shop now
        </Button>
      </Box>
    </Box>
  );
};


const BlogPosts = () => {
  const posts = [
    { title: 'Winter is coming', img: require('../assets/images/winter.jpg') },
    { title: 'The Diwali Collection', img: require('../assets/images/diwali.jpg') },
    { title: 'Sweet Gifts', img: require('../assets/images/sweetgieft.jpg') }
  ];

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>
        From our blog
      </Typography>
      <Grid container spacing={2}>
        {posts.map((b, idx) => (
          <Grid item xs={12} sm={6} md={4} key={idx}>
            {/* ✅ md={4} ensures 3 cards per row on desktop */}
            <Card
              sx={{
                borderRadius: 3,
                overflow: 'hidden',
                height: '100%',
                maxWidth: 320, // ✅ keeps cards smaller
                margin: '0 auto'
              }}
            >
              <CardMedia
                component="img"
                image={b.img}
                alt={b.title}
                sx={{
                  width: '100%',
                  aspectRatio: '1 / 1', // ✅ square image
                  objectFit: 'cover'
                }}
              />
              <CardContent>
                <Typography sx={{ fontWeight: 600 }}>{b.title}</Typography>
                <Typography color="text.secondary" sx={{ mt: 0.5 }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
                  quis efficitur ligula.
                </Typography>
              </CardContent>
              <CardActions sx={{ px: 2, pb: 2 }}>
                <Button size="small" variant="outlined">
                  Read more
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};




export default Dashboard;
