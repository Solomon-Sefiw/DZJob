import React, { useState } from 'react';
import { Box, Typography, Grid, TextField, Button, Snackbar, Alert } from '@mui/material';
import { motion } from 'framer-motion';

const Contact: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [formValid, setFormValid] = useState(true);
  const [showSnackbar, setShowSnackbar] = useState(false);

  const handleSubmit = () => {
    if (!name || !email || !message) {
      setFormValid(false);
      return;
    }
    setFormValid(true);
    setShowSnackbar(true);
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <Box mt={4} textAlign="center">
      <Typography
        variant="h4"
        mb={4}
        sx={{
          color: 'primary.main',
          fontWeight: 'bold',
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
        }}
      >
        Get in Touch
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} sm={6} md={5}>
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <TextField
              label="Your Name"
              fullWidth
              margin="normal"
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={!formValid && !name}
              helperText={!formValid && !name ? 'This field is required' : ''}
              sx={{
                '& .MuiInputBase-root': { borderRadius: '8px' },
                boxShadow: 1,
              }}
            />
            <TextField
              label="Your Email"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!formValid && !email}
              helperText={!formValid && !email ? 'This field is required' : ''}
              sx={{
                '& .MuiInputBase-root': { borderRadius: '8px' },
                boxShadow: 1,
              }}
            />
            <TextField
              label="Message"
              fullWidth
              multiline
              rows={4}
              margin="normal"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              error={!formValid && !message}
              helperText={!formValid && !message ? 'This field is required' : ''}
              sx={{
                '& .MuiInputBase-root': { borderRadius: '8px' },
                boxShadow: 1,
              }}
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                mt: 2,
                py: 1.5,
                borderRadius: '8px',
                boxShadow: 3,
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: '#1565c0',
                  boxShadow: 6,
                },
              }}
              onClick={handleSubmit}
            >
              Send Message
            </Button>
          </motion.div>
        </Grid>

        <Grid item xs={12} sm={6} md={5}>
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <iframe
              title="Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3179.689238448939!2d38.7838043150447!3d9.02175609140998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b8c45e3d8ed77%3A0x89de8bfc17e80001!2sBole%20Tk%20Building%2C%20Addis%20Ababa%2C%20Ethiopia!5e0!3m2!1sen!2sus!4v1675574745812!5m2!1sen!2sus"
              style={{
                border: 0,
                width: '100%',
                height: '250px',
                borderRadius: '12px',
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
              }}
              allowFullScreen
              loading="lazy"
            ></iframe>
            <Box mt={3}>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                Connect with me:
              </Typography>
              <a
                href="https://linkedin.com/in/solomonsefiw"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-block',
                  backgroundColor: '#0077b5',
                  color: 'white',
                  fontWeight: 'bold',
                  padding: '10px 20px',
                  textDecoration: 'none',
                  borderRadius: '8px',
                  marginTop: '10px',
                  transition: 'background-color 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  const target = e.target as HTMLAnchorElement;
                  target.style.backgroundColor = '#005582';
                }}
                onMouseLeave={(e) => {
                  const target = e.target as HTMLAnchorElement;
                  target.style.backgroundColor = '#0077b5';
                }}
              >
                LinkedIn
              </a>
            </Box>
          </motion.div>
        </Grid>
      </Grid>

      <Snackbar
        open={showSnackbar}
        autoHideDuration={4000}
        onClose={() => setShowSnackbar(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={() => setShowSnackbar(false)} severity="success" sx={{ width: '100%' }}>
          Your message has been sent successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Contact;
