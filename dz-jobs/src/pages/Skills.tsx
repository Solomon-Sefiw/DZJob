import React from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  LinearProgress, 
  Card, 
  CardContent, 
  Tooltip, 
  useTheme 
} from '@mui/material';
import { motion } from 'framer-motion';

const skillData = [
  { skill: 'React', level: 96, color: '#61fffb' },
  { skill: 'React-Native', level: 84, color: '#61dafb' },
  { skill: 'TypeScript', level: 98, color: '#007acc' },
  { skill: 'Redux Toolkit', level: 92, color: '#764abc' },
  { skill: 'Material-UI', level: 87, color: '#0081cb' },
  { skill: 'ASP.NET Core', level: 99, color: '#512bd4' },
  { skill: 'SQL Server', level: 95, color: '#d1cc36' },
  { skill: 'Oracle Server', level: 80, color: '#d1d636' },
  { skill: 'Git/ Github', level: 94, color: '#a112636' },
];

const Skills: React.FC = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  return (
    <Box
      mt={4}
      py={4}
      sx={{
        background: isDarkMode
          ? 'linear-gradient(135deg, #0f172a, #1e293b)'
          : 'linear-gradient(135deg, #e3f2fd, #ffffff)',
      }}
    >
      <Typography
        variant="h4"
        textAlign="center"
        fontWeight="bold"
        gutterBottom
        sx={{ color: isDarkMode ? '#90caf9' : '#1976d2' }}
      >
        My Skills
      </Typography>
      <Typography variant="body1" textAlign="center" color="textSecondary" mb={4}>
        A showcase of my technical expertise and proficiency levels.
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {skillData.map((skill, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: index * 0.2,
                type: 'spring',
              }}
              whileHover={{ scale: 1.05, boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.2)' }}
            >
              <Card
                sx={{
                  boxShadow: 3,
                  backgroundColor: isDarkMode ? '#263238' : '#ffffff',
                  borderRadius: '16px',
                  p: 2,
                }}
              >
                <CardContent>
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    gutterBottom
                    sx={{ color: skill.color }}
                  >
                    {skill.skill}
                  </Typography>
                  <Tooltip title={`${skill.level}% proficiency`} arrow>
                    <motion.div
                      initial={{ width: '0%' }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{
                        duration: 1,
                        delay: index * 0.2,
                        type: 'spring',
                      }}
                    >
                      <LinearProgress
                        variant="determinate"
                        value={skill.level}
                        sx={{
                          height: 8,
                          borderRadius: '4px',
                          backgroundColor: isDarkMode ? '#424242' : '#e0e0e0',
                          '& .MuiLinearProgress-bar': {
                            backgroundColor: skill.color,
                          },
                        }}
                      />
                    </motion.div>
                  </Tooltip>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    mt={1}
                    sx={{ fontWeight: 'bold' }}
                  >
                    {skill.level}%
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Skills;
