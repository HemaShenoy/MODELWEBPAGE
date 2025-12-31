import React from 'react';
import Slider from 'react-slick';
import { Box } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

// Custom arrow components
const NextArrow = ({ onClick }) => (
  <Box
    onClick={onClick}
    sx={{
      position: 'absolute',
      right: 20,
      top: '50%',
      transform: 'translateY(-50%)',
      zIndex: 2,
      cursor: 'pointer',
      bgcolor: 'rgba(0,0,0,0.4)',
      borderRadius: '50%',
      p: 1.5
    }}
  >
    <ArrowForwardIosIcon sx={{ fontSize: 32, color: '#fff' }} />
  </Box>
);

const PrevArrow = ({ onClick }) => (
  <Box
    onClick={onClick}
    sx={{
      position: 'absolute',
      left: 20,
      top: '50%',
      transform: 'translateY(-50%)',
      zIndex: 2,
      cursor: 'pointer',
      bgcolor: 'rgba(0,0,0,0.4)',
      borderRadius: '50%',
      p: 1.5
    }}
  >
    <ArrowBackIosNewIcon sx={{ fontSize: 32, color: '#fff' }} />
  </Box>
);

const ImageSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,          // ✅ auto-slide
    autoplaySpeed: 3000,     // every 3s
    arrows: true,            // ✅ show arrows
    nextArrow: <NextArrow />, // custom big arrow
    prevArrow: <PrevArrow /> // custom big arrow
  };

  // ✅ Use only your two images
  const images = [
    require('../assets/images/jj.jpg'),
    require('../assets/images/jjj.jpg')
  ];

  return (
    <Box sx={{ width: '100%', mb: 2, position: 'relative' }}>
      <Slider {...settings}>
        {images.map((src, idx) => (
          <Box key={idx} sx={{ textAlign: 'center' }}>
            <img
              src={src}
              alt={`slide-${idx}`}
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
    </Box>
  );
};

export default ImageSlider;
