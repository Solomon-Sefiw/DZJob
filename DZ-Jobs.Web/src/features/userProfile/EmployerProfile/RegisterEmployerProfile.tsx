import { Box, Container, Paper, Typography } from "@mui/material";
import { useCallback } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { EmployerProfileDto, usePostApiEmployerProfileMutation } from "../../../app/api";
import { RootState } from "../../../app/store";
import { EmployerProfileForm } from "./EmployerProfileForm";

export const RegisterEmployerProfile = () => {
  const { userId } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const [createProfile, { error: createProfileError }] = usePostApiEmployerProfileMutation();

  const onCancel = useCallback(() => {
    navigate("/role-selection"); // Adjust navigation based on your app structure
  }, [navigate]);

  const onSubmit = useCallback(
    async (profile: EmployerProfileDto) => {
      profile.dzJobUserId = userId;

      try {
        await createProfile({ createEmployerProfileCommand: profile }).unwrap();
        navigate("/dashboard"); // Redirect to employer dashboard
      } catch (error) {
        console.error("Employer profile creation error:", error);
      }
    },
    [userId, navigate, createProfile]
  );

  const errors = (createProfileError as any)?.data;

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ mt: 8, p: 4, borderRadius: 2 }}>
        <Box sx={{ textAlign: "center", mb: 3 }}>
          <Typography variant="h4" component="h1" sx={{ fontWeight: "bold", color: "#0073b1" }}>
            Create Your Employer Profile
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" sx={{ mt: 1 }}>
            Fill in your company details to hire top talent on DZ-Jobs
          </Typography>
        </Box>
        <EmployerProfileForm onCancel={onCancel} onSubmit={onSubmit} errors={errors} />
      </Paper>
    </Container>
  );
};
