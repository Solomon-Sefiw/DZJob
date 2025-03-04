import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { motion } from 'framer-motion';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import { EmailSharp } from '@mui/icons-material';

const Footer: React.FC = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1, ease: 'easeInOut' }}
  >
    <Box
      textAlign="center"
      p={4}
      mt={4}
      bgcolor="primary.main"
      color="white"
      sx={{
        position: 'relative',
        overflow: 'hidden',
        borderTop: '5px solid #fff',
        '&:before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: '50%',
          width: '200%',
          height: '200%',
          background: 'linear-gradient(45deg, #ff9800, #f44336)',
          transform: 'translateX(-50%) rotate(-45deg)',
          animation: 'rotateAnimation 10s infinite linear',
        },
      }}
    >
      <motion.div
        initial={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.3 }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 'bold',
            letterSpacing: '0.5px',
            fontSize: { xs: '1rem', sm: '1.25rem' },
            marginBottom: 2,
            textTransform: 'uppercase',
            color : "white"
          }}
        >
          Stay Connected
        </Typography>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.2 }}
      >
        <Box mb={2}>
          <Typography
            variant="body2"
            sx={{
              fontSize: { xs: '0.875rem', sm: '1rem' },
              letterSpacing: '0.5px',
              fontStyle: 'italic',
              opacity: 0.8,
            }}
          >
            © 2025 Solomon Sefiw. All Rights Reserved.
          </Typography>
        </Box>
      </motion.div>

      {/* Social Media Icons */}
      <Box mb={2}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, delay: 0.3 }}
          style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}
        >
          <IconButton
            component="a"
            href="https://linkedin.com/in/solomonsefiw"
            target="_blank"
            sx={{
              color: 'white',
              '&:hover': {
                color: '#0077b5',
                transform: 'rotate(360deg)',
                transition: 'transform 0.6s ease',
              },
            }}
          >
            <LinkedInIcon fontSize="large" />
          </IconButton>
          <IconButton
            component="a"
            href="mailto:solomonosefiw91@gmail.com"
            target="_blank"
            sx={{
              color: 'white',
              '&:hover': {
                color: '#0077b5',
                transform: 'rotate(360deg)',
                transition: 'transform 0.6s ease',
              },
            }}
          >
            <EmailSharp fontSize="large" />
          </IconButton>
          <IconButton
            component="a"
            href="https://github.com/solomonsefiw"
            target="_blank"
            sx={{
              color: 'white',
              '&:hover': {
                color: '#ff9800',
                transform: 'rotate(360deg)',
                transition: 'transform 0.6s ease',
              },
            }}
          >
            <GitHubIcon fontSize="large" />
          </IconButton>

          <IconButton
            component="a"
            href="https://twitter.com/solomonsefiw"
            target="_blank"
            sx={{
              color: 'white',
              '&:hover': {
                color: '#1da1f2',
                transform: 'rotate(360deg)',
                transition: 'transform 0.6s ease',
              },
            }}
          >
            <TwitterIcon fontSize="large" />
          </IconButton>
        </motion.div>
      </Box>

      {/* Animated Footer Text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, delay: 0.6 }}
      >
        <Typography
          variant="body2"
          sx={{
            fontSize: { xs: '0.875rem', sm: '1rem' },
            letterSpacing: '0.5px',
            fontStyle: 'italic',
            opacity: 0.8,
          }}
        >
          Connect with me on social media or drop me a message!
        </Typography>
      </motion.div>
    </Box>
  </motion.div>
);

export default Footer;
