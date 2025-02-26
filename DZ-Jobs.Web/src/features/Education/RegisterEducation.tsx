import { Box, Container, Paper, Typography } from "@mui/material";
import { useCallback } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
//import { EducationDto, RootState, usePostApiEducationsMutation } from "../../app/store";
import { EducationDto, useCreateEducationMutation, } from "../../app/api";
import { RootState } from "../../app/store";
import { EducationForm } from "./EducationForm";

export const RegisterEducation = () => {
  const { userId } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const [createEducation, { error: createEducationError }] = useCreateEducationMutation();
  console.log(userId);
  const onCancel = useCallback(() => {
    navigate("/profile"); // Adjust navigation based on your app structure
  }, [navigate]);

  const onSubmit = useCallback(
    async (education: EducationDto) => {
      education.userId = userId;

      try {
        await createEducation({ createEducationCommand: education }).unwrap();
        navigate("/skills"); // Redirect after successful submission
      } catch (error) {
        console.error("Education creation error:", error);
      }
    },
    [userId, navigate, createEducation]
  );

  const errors = (createEducationError as any)?.data;

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ mt: 8, p: 4, borderRadius: 2 }}>
        <Box sx={{ textAlign: "center", mb: 3 }}>
          <Typography variant="h4" component="h1" sx={{ fontWeight: "bold", color: "#0073b1" }}>
            Add Your Education
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" sx={{ mt: 1 }}>
            Fill in your education details to complete your profile
          </Typography>
        </Box>
        <EducationForm onCancel={onCancel} onSubmit={onSubmit} errors={errors} />
      </Paper>
    </Container>
  );
};
