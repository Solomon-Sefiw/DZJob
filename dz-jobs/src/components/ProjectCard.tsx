import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';

interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  technologies,
}) => (
  <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
    <Card>
      <CardContent>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="body2" mt={1}>
          {description}
        </Typography>
        <Box mt={2}>
          {technologies.map((tech, index) => (
            <Typography
              key={index}
              variant="caption"
              color="textSecondary"
              sx={{ marginRight: 1 }}
            >
              {tech}
            </Typography>
          ))}
        </Box>
      </CardContent>
    </Card>
  </motion.div>
);

export default ProjectCard;
