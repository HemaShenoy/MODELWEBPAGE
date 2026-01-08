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

import ProductCard from '../components/Product/ProductCard'; // import from your ProductCard file

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
    maxHeight: '100%',
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
                height: '100%',
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
<Typography 
  variant="h9" 
  sx={{ color: 'grey.500', fontWeight: 'normal', mb: 0 }} // ✅ no bottom margin
>
  Vellanki Foods
</Typography>

<Typography 
  variant="h3" 
  sx={{ fontWeight: 600 , mt: 0 }} // ✅ no top margin
>
  Our Story
</Typography>

<Typography
  sx={{ mb: 3, maxWidth: 800, mx: 'auto', color: 'grey.700' }}
>
  In 1989, we realised that times were changing, with mothers beginning to work outside the home, it was 
  <br />increasingly difficult to invest the time and effort needed to prepare pickles and powders for the family. <br />
  Home-made pickles were disappearing from the typical Telugu home. 
  
</Typography>


<Button
  variant="outlined"
  sx={{
    color: '#D2B48C',            
    border: '2px solid #D2B48C', 
    fontWeight: 500,
    backgroundColor: 'transparent',
    transition: 'all 0.3s ease',
    '&:hover': {
      backgroundColor: '#D2B48C',  
      color: '#444',              
      borderColor: '#D2B48C'
    }
  }}
>
  Read More
</Button>


    </Box>
  );

};



const CategoryGrid = ({ onNavigate }) => {
  const categories = [
    { key: 'sweets', label: 'Sweets', image: require('../assets/images/hi1.jpg') },
    { key: 'namkeen', label: 'Namkeen', image: require('../assets/images/hi2.jpg') },
    { key: 'pickles', label: 'Pickles', image: require('../assets/images/hi3.jpg') }
  ];

  return (
    <Box
      sx={{
        width: '100%',
        px: { xs: 1, sm: 2, md: 4 },       // ✅ responsive padding
        mt: 3,
        display: 'flex',
        flexDirection: 'row',
        gap: { xs: 1, sm: 2, md: 3 },      // ✅ responsive gap
        justifyContent: 'center',
        flexWrap: 'wrap'
      }}
    >
      {categories.map((c) => (
        <Card
          key={c.key}
          onClick={() => onNavigate(c.key)}
          sx={{
            flex: { xs: '1 1 100%', sm: '1 1 calc(33.333% - 16px)' }, // ✅ equal width distribution
            maxWidth: { sm: 'calc(33.333% - 16px)' },
            aspectRatio: '1/1',              // ✅ perfect square
            position: 'relative',
            overflow: 'hidden',
            cursor: 'pointer',
            borderRadius: 2,
            boxShadow: 3,
            transition: '0.3s',
            '&:hover': {
              boxShadow: 6,
              transform: 'scale(1.02)'
            }
          }}
        >
          <CardMedia
            component="img"
            image={c.image}
            alt={c.label}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />

          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              background: 'rgba(0,0,0,0.35)',
              color: '#fff'
            }}
          >
            <Typography 
              variant="h4" 
              sx={{ 
                fontWeight: 700, 
                mb: 2,
                fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' } // ✅ responsive text
              }}
            >
              {c.label}
            </Typography>

            <Button
              variant="contained"
              sx={{
                bgcolor: '#fff',
                color: '#000',
                fontWeight: 'bold',
                px: 4,
                py: 1.5,
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
      ))}
    </Box>
  );
};


const NewArrivals = ({ onNavigate }) => {
  const items = PRODUCTS;
  let sliderRef = null;

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 3 } },
      { breakpoint: 900, settings: { slidesToShow: 2 } },
      { breakpoint: 600, settings: { slidesToShow: 1 } },
    ]
  };

  return (
    <Box
      sx={{
        mt: 2,
        mb: 2,
        px: { xs: 2, sm: 3, md: 4 },
        backgroundColor: '#f5f5f5'
        // ❌ removed py
      }}
    >
      {/* Header */}
      <Box sx={{ textAlign: 'center', mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
          <Button onClick={() => sliderRef?.slickPrev()} sx={{ minWidth: 'auto', p: 0 }}>
            {'<'}
          </Button>

          <Typography variant="h5" sx={{ fontWeight: 'normal' }}>
            New Arrivals
          </Typography>

          <Button onClick={() => sliderRef?.slickNext()} sx={{ minWidth: 'auto', p: 0 }}>
            {'>'}
          </Button>
        </Box>

        <Button
          onClick={() => onNavigate('sweets')}
          sx={{
            mt: 0.5,
            backgroundColor: 'transparent',
            textDecoration: 'underline',
            textTransform: 'none'
          }}
        >
          View All
        </Button>
      </Box>

      {/* Slider */}
      <Box
        sx={{
          width: '100%',
          overflow: 'hidden',
          pb: 0, // ✅ no space after cards
          '& .slick-track': { display: 'flex' },
          '& .slick-slide': { px: 1 } // ✅ single source of spacing
        }}
      >
        <Slider ref={(s) => (sliderRef = s)} {...settings}>
          {items.map((product) => (
            <Box key={product.id}>
              <ProductCard product={product} />
            </Box>
          ))}
        </Slider>
      </Box>
    </Box>
  );
};


const LifestyleSection = ({ onShopNamkeen }) => {
  return (
    <Box
      sx={{
        mt:3,
        mb : 4,
      
        p: { xs: 2, md: 3 },
        bgcolor: 'background.paper',
        borderRadius: 3,
        boxShadow: 3,
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: 'center',
        gap: { xs: 4, md: 10 }
      }}
    >
      
<Box
  component="img"
  src={require('../assets/images/nibbles1.jpg')}
  alt="4pm Nibbles"
  sx={{
    width: { xs: '90%', md: '50%' },   // increased size
    borderRadius: 2,
    objectFit: 'cover',
    boxShadow: 0,
    margin: '0 auto'
  }}
/>


      {/* Text side */}
      <Box sx={{ flex: 1 }}>
        <Typography variant="h5" sx={{ fontWeight: 400 }}>
          4pm Nibbles
        </Typography>
        <Typography sx={{ mt: 2 }}>
          Time for evening chai — and a delicious snack to  go with it!<br/> Try our
          traditional South Indian treats: muruku, chegodi,<br/> and Telangana chekkalu.
          Light, protein-rich, and perfect <br/>with strong tea or coffee.
        </Typography>
<Button
  sx={{
    mt: 2,
    color: 'grey.800', 
    textTransform: 'none',   
    '&:hover': {
      backgroundColor: 'transparent', 
      textDecoration: 'underline'          
    }
  }}
  variant="text"          
  onClick={onShopNamkeen}
>
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
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 700, textAlign: 'center' }}>
        BLOG POSTS
      </Typography>
      <Box
        sx={{
          width: '100%',
          px: { xs: 1, sm: 2, md: 4 },
          display: 'flex',
          flexDirection: 'row',
          gap: { xs: 1, sm: 2, md: 3 },
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}
      >
        {posts.map((b, idx) => (
          <Card
            key={idx}
            sx={{
              flex: { xs: '1 1 100%', sm: '1 1 calc(33.333% - 16px)' },
              maxWidth: { sm: 'calc(33.333% - 16px)' },
              borderRadius: 3,
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: 3,
              transition: '0.3s',
              '&:hover': {
                boxShadow: 6,
                transform: 'scale(1.02)'
              }
            }}
          >
            <CardMedia
              component="img"
              image={b.img}
              alt={b.title}
              sx={{
                width: '100%',
                aspectRatio: '1 / 1',
                objectFit: 'cover'
              }}
            />
            <CardContent sx={{ flexGrow: 1 }}>
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
        ))}
      </Box>
    </Box>
  );
};

export default Dashboard;
