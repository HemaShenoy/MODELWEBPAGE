import { useState } from 'react';
import { TextField, Button, Paper, Typography, Box } from '@mui/material';
import { useAuth } from '../context/AuthContext.jsx';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    setError('');
    try {
      login(form);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  // ✅ Guest login handler (no email/password needed)
  const handleGuestLogin = () => {
    try {
      login({ role: 'guest' });   // only role, no credentials
      navigate('/dashboard');
    } catch (err) {
      setError('Guest login failed');
    }
  };

  return (
    <Box sx={{ display: 'grid', placeItems: 'center', minHeight: '100vh', p: 2 }}>
      <Paper sx={{ p: 4, width: '100%', maxWidth: 420 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>Login</Typography>
        <Box component="form" onSubmit={onSubmit}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            value={form.email}
            onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            value={form.password}
            onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
            sx={{ mb: 2 }}
          />
          {error && <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>}
          <Button fullWidth variant="contained" type="submit">Login</Button>
        </Box>

        {/* ✅ Guest login button */}
        <Button
          fullWidth
          variant="outlined"
          sx={{ mt: 2 }}
          onClick={handleGuestLogin}
        >
          Continue as Guest
        </Button>

        <Typography variant="body2" sx={{ mt: 2 }}>
          No account? <Link to="/register">Register</Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Login;

