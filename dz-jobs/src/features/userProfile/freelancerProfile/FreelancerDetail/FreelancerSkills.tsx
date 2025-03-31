import { Box, Typography, Avatar, Card, Divider, CircularProgress, Chip } from "@mui/material";
import { DzJobUserDto, useGetUserSkillQuery } from "../../../../app/services/DZJobsApi";
import { SchoolOutlined } from "@mui/icons-material";

interface FreelancerProps {
  freelancer: DzJobUserDto;
}

export const FreelancerSkills: React.FC<FreelancerProps> = ({ freelancer }) => {
  if (!freelancer) return null; // Ensure valid data before rendering

  // Fetch education data
  const { data: skills, isLoading, isError } = useGetUserSkillQuery(
    { userId: freelancer.id || "" },
    { skip: !freelancer.id }
  );

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
        <CircularProgress size={24} />
      </Box>
    );
  }

  if (isError) {
    return (
      <Typography variant="body2" color="error" sx={{ textAlign: "center", my: 2 }}>
        Failed to load Skills details.
      </Typography>
    );
  }

  if (!skills?.length) {
    return (
      <Typography variant="body2" color="textSecondary" sx={{ textAlign: "center", my: 2 }}>
        No Skills available.
      </Typography>
    );
  }

  return (
    <Card sx={{ p: 1, borderRadius: "12px", boxShadow: 2, flex: "1 1 400px", maxWidth: 600 }}>
      {/* Header */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
        <Avatar sx={{ bgcolor: "primary.main", mr: 2 }}>
          <SchoolOutlined />
        </Avatar>
        <Typography variant="h6" fontWeight="bold">
          Skills
        </Typography>
      </Box>

      <Divider sx={{ mb: 2 }} />
      <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
      {skills.map((skill, index) => (
                <Chip key={index} label={skill.skillName} color="primary" />
              ))}
      </Box>
    </Card>
  );
};
