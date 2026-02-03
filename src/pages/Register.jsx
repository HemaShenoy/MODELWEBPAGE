import { useState } from 'react';
import {
  TextField,
  Button,
  Paper,
  Typography,
  Box,
  Snackbar,
  Alert,
  IconButton,
  InputAdornment,
  Divider,
  Link as MuiLink
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useAuth } from '../context/AuthContext.jsx';
import { useNavigate, Link } from 'react-router-dom';
import Topbar from '../components/TopBar/Topbar.jsx';
import Footer from '../components/Footer/Footer.jsx';

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [popup, setPopup] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!form.email || !form.password || !form.confirmPassword) {
      setError('All fields are required');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(form.email)) {
      setError('Please enter a valid email address');
      return;
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      register({ email: form.email, password: form.password });
      setPopup('Account created successfully!');
      setTimeout(() => navigate('/dashboard'), 1500);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <Topbar />
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          p: 2,
          background: '#ffffff',
          position: 'relative'
        }}
      >
      <Box
        sx={{
          position: 'absolute',
          top: -40,
          right: -40,
          width: 180,
          height: 180,
          borderRadius: '50%',
          bgcolor: 'rgba(255,255,255,0.08)',
          filter: 'blur(36px)'
        }}
      />

      <Paper
        sx={{
          p: 5,
          width: '100%',
          maxWidth: 480,
          borderRadius: 3,
          boxShadow: '0 20px 60px rgba(0,0,0,0.28)',
          backdropFilter: 'blur(8px)',
          position: 'relative',
          zIndex: 1
        }}
      >
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 64,
              height: 64,
              borderRadius: '50%',
              bgcolor: '#70abde',
              mb: 2
            }}
          >
            <PersonAddIcon sx={{ color: '#fff', fontSize: 32 }} />
          </Box>

          <Typography
            variant="h4"
            sx={{
              fontWeight: 800,
              mb: 1,
              background: 'linear-gradient(135deg, #70abde 0%, #70abde 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Create Account
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Join us and enjoy sweet treats
          </Typography>
        </Box>

        <Box component="form" onSubmit={onSubmit}>
          <TextField
            fullWidth
            label="Email Address"
            type="email"
            value={form.email}
            onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
            sx={{ mb: 2.5 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon sx={{ color: '#70abde', mr: 1 }} />
                </InputAdornment>
              )
            }}
          />

          <TextField
            fullWidth
            label="Password"
            type={showPassword ? 'text' : 'password'}
            value={form.password}
            onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
            sx={{ mb: 2 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon sx={{ color: '#70abde', mr: 1 }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" sx={{ color: '#70abde' }}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />

          <TextField
            fullWidth
            label="Confirm Password"
            type={showPassword ? 'text' : 'password'}
            value={form.confirmPassword}
            onChange={e => setForm(f => ({ ...f, confirmPassword: e.target.value }))}
            sx={{ mb: 2 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon sx={{ color: '#70abde', mr: 1 }} />
                </InputAdornment>
              )
            }}
          />

          {error && (
            <Alert severity="error" sx={{ mb: 2.5 }} onClose={() => setError('')}>
              {error}
            </Alert>
          )}

          <Button
            fullWidth
            variant="contained"
            type="submit"
            sx={{
              py: 1.4,
              mt: 1,
              fontSize: '1rem',
              fontWeight: 700,
              textTransform: 'none',
              background: 'linear-gradient(135deg, #667eea 0%, #70abde 100%)',
              transition: 'all 0.3s',
              '&:hover': { transform: 'translateY(-2px)', boxShadow: '0 10px 25px rgba(102,126,234,0.3)' }
            }}
          >
            Create Account
          </Button>
        </Box>

        <Divider sx={{ my: 3, color: 'text.secondary' }}>OR</Divider>

        <Box sx={{ textAlign: 'center', pt: 2, borderTop: '1px solid #eee' }}>
          <Typography variant="body2" color="text.secondary">
            Already have an account?{' '}
            <MuiLink component={Link} to="/login" sx={{ color: '#667eea', fontWeight: 700, textDecoration: 'none' }}>
              Sign in
            </MuiLink>
          </Typography>
        </Box>
      </Paper>

      {/* Snackbar for success */}
      <Snackbar
        open={!!popup}
        autoHideDuration={3000}
        onClose={() => setPopup('')}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" onClose={() => setPopup('')} sx={{ width: '100%' }}>
          {popup}
        </Alert>
      </Snackbar>
      </Box>
      <Footer />
    </>
  );
};

export default Register;
