import { Box, Typography, CircularProgress } from "@mui/material";
import { UserPhoto } from "../../UserPhoto";
import {
  DzJobUserDto,
  useGetFreelancerProfileByFreelancerIdQuery,
} from "../../../../app/services/DZJobsApi";

interface FreelancerDetailsDialogProps {
  freelancer: DzJobUserDto;
}

export const FreelancerHeader: React.FC<FreelancerDetailsDialogProps> = ({ freelancer }) => {
  if (!freelancer) return null; // Ensure valid data before rendering

  const { data: profile, isLoading, isError } = useGetFreelancerProfileByFreelancerIdQuery(
    { id: freelancer.id ?? undefined },
    { skip: !freelancer.id } // Prevents unnecessary API calls
  );

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 2 }}>
      <UserPhoto user={freelancer} />

      <Typography variant="h6" fontWeight="bold">
        {freelancer.firstName} {freelancer.lastName}
      </Typography>

      {isLoading ? (
        <CircularProgress size={20} sx={{ mt: 1 }} />
      ) : isError ? (
        <Typography variant="body2" color="error">
          Failed to load profile details.
        </Typography>
      ) : (
        <>
          <Typography variant="body2" color="textSecondary">
            {profile?.location || "Location not specified"}
          </Typography>
          <Typography variant="body2">
            <strong>Email:</strong> {freelancer.email}
          </Typography>
          <Typography variant="body2">
            <strong>Experience:</strong> {profile?.experience ?? "N/A"} years
          </Typography>
          <Typography
            variant="body2"
            sx={{ mt: 1, textAlign: "center", fontStyle: "italic" }}
            component="span"
          >
            {profile?.bio || "No bio available."}
          </Typography>
        </>
      )}
    </Box>
  );
};
