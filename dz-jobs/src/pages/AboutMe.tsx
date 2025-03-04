import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Avatar,
  Card,
  CardContent,
  Button,
  Divider,
  useTheme,
  Collapse,
  IconButton,
  Link,
} from '@mui/material';
import { motion } from 'framer-motion';
import { ExpandLess, ExpandMore } from '@mui/icons-material'; // MUI icon for expand/collapse
import profilePic from '../assets/profile.png';

const AboutMe: React.FC = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  const [displayedText, setDisplayedText] = useState('');
  const [openDescription, setOpenDescription] = useState(false);
  const briefText = `Fuull Stack Developer proficient in ASP.NET Core Web API, React, Vite, TypeScript, Redux Toolkit, SQL, Oracle Server, and MUI, building scalable and high-performance web applications.`;
  const fullText = `As a Full Stack Developer, I specialize in building scalable and high-performance web applications. My expertise includes backend development with ASP.NET Core Web API, frontend development with React, Vite, and TypeScript, and state management using Redux Toolkit. I am skilled in optimizing database management with SQL and Oracle Server. Additionally, I use Material-UI (MUI) to create sleek, responsive, and user-friendly interfaces. I am passionate about delivering robust, efficient, and visually appealing solutions.`;

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < briefText.length - 1) {
        setDisplayedText((prev) => prev + briefText[index]);
        index += 1;
      } else {
        clearInterval(interval);
      }
    }, 20); // Speed of the typing effect
    return () => clearInterval(interval);
  }, []);

  const handleToggleDescription = () => {
    setOpenDescription((prev) => !prev);
  };

  return (
    <Box
      mt={4}
      sx={{
        background: `linear-gradient(135deg, ${
          isDarkMode ? '#1e293b' : '#e3f2fd'
        }, ${isDarkMode ? '#0f172a' : '#ffffff'})`,
        position: 'relative',
        overflow: 'hidden',
        py: 8,
        px: 3,
        color: isDarkMode ? '#e0e0e0' : '#212121',
      }}
    >
      {/* Background Effects */}
      <motion.div
        animate={{
          opacity: [0.3, 0.5, 0.3],
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.1), transparent)',
          zIndex: -1,
        }}
      />

      <Grid container spacing={4} justifyContent="center" direction={{ xs: 'column', sm: 'row' }}>
        {/* Profile Section */}
        <Grid item xs={12} sm={4} md={3} sx={{ textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Avatar
              alt="Solomon Sefiw"
              src={profilePic}
              sx={{
                width: 180,
                height: 180,
                mx: 'auto',
                mb: 3,
                border: `5px solid ${isDarkMode ? '#90caf9' : '#1976d2'}`,
                boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.3)',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.15)',
                },
              }}
            />
            <Typography
              variant="h4"
              fontWeight="bold"
              gutterBottom
              sx={{ color: isDarkMode ? '#90caf9' : '#1976d2' }}
            >
              Solomon Sefiw
            </Typography>
            <Typography variant="h6" color="textSecondary" mb={2}>
              Full Stack Developer | 2+ Years of Experience
            </Typography>
          </motion.div>
        </Grid>

        {/* Content Section */}
        <Grid item xs={12} sm={8} md={9}>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Card
              sx={{
                boxShadow: 4,
                backgroundColor: isDarkMode ? '#263238' : '#ffffff',
                borderRadius: '16px',
                mb: 4,
                '&:hover': {
                  transform: 'scale(1.05)',
                  transition: 'all 0.3s ease',
                },
              }}
            >
              <CardContent>
                <Typography
                  variant="body1"
                  sx={{
                    color: isDarkMode ? '#e0e0e0' : '#424242',
                    lineHeight: 1.8,
                    fontSize: '1.2rem',
                    whiteSpace: 'pre-wrap',
                  }}
                >
                  {displayedText}
                </Typography>
              </CardContent>
            </Card>
          </motion.div>

          {/* Collapsible Description with Icon and More/Less Text */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="body2" sx={{ color: isDarkMode ? '#e0e0e0' : '#424242' }}>
              <IconButton onClick={handleToggleDescription} sx={{ color: isDarkMode ? '#90caf9' : '#1976d2' }}>
              {openDescription ? <ExpandLess /> : <ExpandMore />}
              </IconButton>
              <Link
                component="button"
                onClick={handleToggleDescription}
                sx={{
                  color: isDarkMode ? '#90caf9' : '#1976d2',
                  fontWeight: 600,
                  '&:hover': {
                    textDecoration: 'underline',
                    color: isDarkMode ? '#ffffff' : '#1976d2',
                  },
                }}
              >
                {openDescription ? 'Less' : 'More About Me'}
              </Link>
            </Typography>
          </Box>

          <Collapse in={openDescription}>
            <Card sx={{ boxShadow: 4, backgroundColor: isDarkMode ? '#263238' : '#ffffff', borderRadius: '16px', mt: 2 }}>
              <CardContent>
                <Typography
                  variant="body2"
                  sx={{
                    color: isDarkMode ? '#e0e0e0' : '#424242',
                    lineHeight: 1.8,
                    fontSize: '1rem',
                  }}
                >
                  {fullText}
                </Typography>
              </CardContent>
            </Card>
          </Collapse>

          {/* Call-to-Action */}
          <Divider sx={{ my: 4, borderColor: isDarkMode ? '#90caf9' : '#1976d2' }} />
          <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} justifyContent="center">
            <Button
              variant="contained"
              color="primary"
              size="large"
              href="contact"
              sx={{ mb: { xs: 2, sm: 0 }, width: { xs: '100%', sm: 'auto' } }}
            >
              Contact Me
            </Button>
            <Button
              variant="outlined"
              color="primary"
              size="large"
              href="projects"
              sx={{ ml: { sm: 2 }, width: { xs: '100%', sm: 'auto' } }}
            >
              View My Work
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AboutMe;
