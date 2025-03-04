import React, { useState } from 'react';
import { Box, Typography, Grid, Card, CardContent, CardMedia, Button, Modal, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import OpenInNewIcon from '@mui/icons-material/OpenInNew'; // Import icon for external links
import hcms from '../assets/hcms.png'; 
import recon from '../assets/recon.png'; 
import payroll from '../assets/payroll.png'; 

const projects = [
  {
    title: 'Human Capital Mgmt System',
    description: 'System for managing employee details with advanced filtering.',
    demoLink: 'https://example.com/employee-system',
    image: hcms,
    techStack: ['React', 'TypeScript', 'Redux', 'SQL Server', 'ASP.NET Core Web API', 'EF'],
  },
  {
    title: 'Reconciliation Tool',
    description: 'Interactive Reconciliation tool to assure bank inward and outward transactions.',
    demoLink: 'https://example.com/business-dashboard',
    image: recon,
    techStack: ['ASP.NET WebForms', 'SQL Server', 'Oracle', 'Crystal Reports'],
  },
  {
    title: 'Payroll System',
    description: 'Comprehensive system for payroll management and reporting.',
    demoLink: 'https://example.com/payroll-system',
    image: payroll,
    techStack: ['WPF (Windows Forms)', 'WebForms', 'SQL Server', 'Oracle'],
  },
];

const Projects: React.FC = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  const [openModal, setOpenModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleOpenModal = (image: string) => {
    setSelectedImage(image);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedImage(null);
  };

  return (
    <Box
      mt={4}
      sx={{
        background: `linear-gradient(135deg, ${isDarkMode ? '#1e293b' : '#e3f2fd'}, ${isDarkMode ? '#0f172a' : '#ffffff'})`,
        position: 'relative',
        overflow: 'hidden',
        py: 8,
        px: 3,
        color: isDarkMode ? '#e0e0e0' : '#212121',
      }}
    >
      <Typography
        variant="h4"
        textAlign="center"
        mb={4}
        fontWeight="bold"
        sx={{ color: isDarkMode ? '#90caf9' : '#1976d2' }}
      >
        My Projects
      </Typography>

      {/* Profile Description */}
      <Box textAlign="center" mb={4}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: 'bold',
              fontFamily: 'Poppins, sans-serif',
              color: isDarkMode ? '#e0e0e0' : '#212121',
              lineHeight: 1.6,
              marginBottom: 2,
            }}
          >
            Hello, I’m Solomon Sefiw, a passionate Full Stack Developer.
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: isDarkMode ? '#e0e0e0' : '#424242', lineHeight: 1.8 }}
          >
            My professional career includes significant contributions to projects like
            Employee Management Systems, Business Dashboards, and Shareholder Management
            Systems. I leverage modern technologies like <b>Redux Toolkit</b>, <b>Material-UI</b>,
            and optimized database management using <b>SQL Server</b> and <b>Oracle</b>.
          </Typography>
        </motion.div>
      </Box>

      <Grid container spacing={3}>
        {projects.map((project, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileHover={{ scale: 1.03 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <Card
                sx={{
                  maxWidth: 345,
                  mx: 'auto',
                  backgroundColor: isDarkMode ? '#263238' : '#ffffff',
                  boxShadow: 3,
                  transition: 'transform 0.3s ease-in-out',
                  ':hover': {
                    boxShadow: 6,
                    transform: 'translateY(-5px)',
                  },
                  borderRadius: 2,
                }}
              >
                {/* Project Image */}
                <CardMedia
                  component="img"
                  alt={project.title}
                  height="180"
                  image={project.image}
                  sx={{
                    objectFit: 'cover',
                    borderTopLeftRadius: 2,
                    borderTopRightRadius: 2,
                    cursor: 'pointer',
                  }}
                  onClick={() => handleOpenModal(project.image)} // Open modal on image click
                />

                <CardContent>
                  <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ color: isDarkMode ? '#90caf9' : '#1976d2' }}>
                    {project.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: isDarkMode ? '#b0bec5' : '#555' }} mb={2}>
                    {project.description}
                  </Typography>
                  <Typography variant="caption" display="block" sx={{ color: isDarkMode ? '#b0bec5' : '#555' }} mb={2}>
                    <strong>Tech Stack:</strong> {project.techStack.join(', ')}
                  </Typography>
                  <Button
                    variant="contained"
                    color="success"
                    href={project.demoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    fullWidth
                    endIcon={<OpenInNewIcon />} // Adds external link icon
                    sx={{
                      ':hover': {
                        backgroundColor: 'success.dark',
                      },
                      backgroundColor: isDarkMode ? '#388e3c' : '#4caf50',
                    }}
                  >
                    View Detail
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {/* Modal for Fullscreen Image */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            backgroundColor: 'white',
            padding: 2,
            borderRadius: 2,
            maxWidth: '600px', // Limit max width for better scaling
            width: 'auto',
            maxHeight: '90%',
            overflow: 'auto',
            boxShadow: 24,
          }}
        >
          <img
            src={selectedImage ?? ''}
            alt="Selected Project"
            style={{
              width: '100%',
              height: 'auto',
              objectFit: 'contain',
            }}
          />
        </Box>
      </Modal>
    </Box>
  );
};

export default Projects;
