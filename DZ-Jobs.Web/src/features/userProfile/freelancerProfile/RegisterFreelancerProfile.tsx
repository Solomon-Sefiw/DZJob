import { Box, Container, Paper, Typography } from "@mui/material";
import { useCallback } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FreelancerProfileDto, useCreateFreelancerProfileMutation } from "../../../app/api";
import { RootState } from "../../../app/store";
import { FreelancerProfileForm } from "./FreelancerProfileForm";
export const RegisterFreelancerProfile = () => {

  const {userId} = useSelector(
    (state: RootState) => state.auth
  );
  const navigate = useNavigate();
  const [createProfile, { error: createProfileError }] = useCreateFreelancerProfileMutation();
console.log(userId);
  const onCancel = useCallback(() => {
    navigate("/role-selection"); // Adjust navigation based on your application structure
  }, [navigate]);

  const onSubmit = useCallback(
    async (profile: FreelancerProfileDto) => {
      profile.dzJobUserId = userId;

      try {
        await createProfile({createFreelancerProfileCommand : profile}).unwrap();
        //navigate(`/profile-success`); // Adjust navigation based on your application structure
        navigate("/education");
      } catch (error) {
        console.error("Profile creation error:", error);
      }
    },
    [userId,navigate, createProfile]
  );

  const errors = (createProfileError as any)?.data;

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ mt: 8, p: 4, borderRadius: 2 }}>
        <Box sx={{ textAlign: "center", mb: 3 }}>
          <Typography
            variant="h4"
            component="h1"
            sx={{ fontWeight: "bold", color: "#0073b1" }}
          >
            Create Your Freelancer Profile
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" sx={{ mt: 1 }}>
            Fill in your details to start your journey with DZ-Jobs
          </Typography>
        </Box>
        <FreelancerProfileForm onCancel={onCancel} onSubmit={onSubmit} errors={errors} />
      </Paper>
    </Container>
  );
};
