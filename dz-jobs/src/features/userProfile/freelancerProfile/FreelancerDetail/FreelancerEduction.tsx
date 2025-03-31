import { Box, Typography, Avatar, Card, Divider, CircularProgress } from "@mui/material";
import { DzJobUserDto, useGetEducationByUserIdQuery } from "../../../../app/services/DZJobsApi";
import { LocationOnTwoTone, SchoolOutlined } from "@mui/icons-material";
import { EducationLevel } from "../../../../app/services/enums";

interface FreelancerProps {
  freelancer: DzJobUserDto;
}

export const FreelancerEducation: React.FC<FreelancerProps> = ({ freelancer }) => {
  if (!freelancer) return null; // Ensure valid data before rendering

  // Fetch education data
  const { data: educations, isLoading, isError } = useGetEducationByUserIdQuery(
    { id: freelancer.id ?? undefined },
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
        Failed to load education details.
      </Typography>
    );
  }

  if (!educations?.length) {
    return (
      <Typography variant="body2" color="textSecondary" sx={{ textAlign: "center", my: 2 }}>
        No educational background available.
      </Typography>
    );
  }

  return (
    <Card sx={{ p: 1, borderRadius: "12px", boxShadow: 2, flex: "1 1 400px", maxWidth: 600 }}>
      {/* Header */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Avatar sx={{ bgcolor: "primary.main", mr: 1 }}>
          <SchoolOutlined />
        </Avatar>
        <Typography variant="h6" fontWeight="bold">
          Educational Background
        </Typography>
      </Box>

      <Divider sx={{ mb: 2 }} />

      {educations.map((education) => (
        <Box key={education.id} sx={{ mb: 2 }}>
          <Divider />
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
            <Box>
              <Typography variant="body1">
                {education.fieldOfStudy} ({ education.educationLevel && EducationLevel[education.educationLevel]})
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {education.startDate} - {education.endDate}
              </Typography>
            </Box>

            <Box>
              <Typography variant="body2" color="textSecondary">
                {education.schoolName}
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                <Avatar sx={{ width: 20, height: 20, mr: 1, bgcolor: "secondary.main" }}>
                  <LocationOnTwoTone fontSize="small" />
                </Avatar>
                <Typography variant="body2">{education.schoolCity}</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      ))}
    </Card>
  );
};
