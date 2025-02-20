import { Box, Container, Paper, Typography } from "@mui/material";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { RegisterUser, usePostApiAuthenticationCreateMutation } from "../../app/api";
import { UserRegistrationForm } from "./UserRegistrationForm";

export const RegisterNewUser = () => {
  const navigate = useNavigate();
  const [registerUser, { error: registerUserError }] = usePostApiAuthenticationCreateMutation();

  const onCancel = useCallback(() => {
    navigate("/login");
  }, [navigate]);

  const onSubmit = useCallback(
    async (user: RegisterUser) => {
      try {
        await registerUser({
          registerUser: user,
        }).unwrap()
        .then( () =>{
        user.email && localStorage.setItem("emailForRole", user.email);
        user.email && localStorage.setItem("useFullName", user.firstName + " " + user.lastName);
        navigate(`/role-selection`);
        }
        )
      } catch (error) {
        console.error("Registration error:", error);
      }
    },
    [navigate, registerUser]
  );

  const errors = (registerUserError as any)?.data;

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ mt: 8, p: 4, borderRadius: 2 }}>
        <Box sx={{ textAlign: "center", mb: 3 }}>
          <Typography
            variant="h4"
            component="h1"
            sx={{ fontWeight: "bold", color: "#0073b1" }}
          >
            Join DZ-Jobs
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" sx={{ mt: 1 }}>
            Create your account to start working and hiring on DZ-Jobs
          </Typography>
        </Box>
        <UserRegistrationForm onCancel={onCancel} onSubmit={onSubmit} errors={errors} />
      </Paper>
    </Container>
  );
};
