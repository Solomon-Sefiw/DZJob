import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Alert, Box, Container, Paper, Typography } from "@mui/material";
import { UserRegistrationForm } from "./UserRegistrationForm";
import { RegisterUser, useCreateUserMutation } from "../../app/services/DZJobsApi";
import { setUser } from "../../app/slicies/authSlice";

export const RegisterNewUser = () => {
  const navigate = useNavigate();
  const [registerUser, { error: registerUserError }] = useCreateUserMutation();
  const dispatch = useDispatch();

  // State for managing alert messages
  const [alertMessage, setAlertMessage] = useState<{ message: string, severity: "success" | "error" | "info" | "warning" } | null>(null);

  const onCancel = useCallback(() => {
    navigate("/login");
  }, [navigate]);

  const onSubmit = useCallback(
    async (user: RegisterUser) => {
      try {
        const response = await registerUser({ registerUser: user }).unwrap();
        if (response) {
          dispatch(
            setUser({
              userId: response.userId ?? "",
              email: response.email ?? "",
              username: response.username ?? "",
              firstName: response.firstName ?? "",
              lastName: response.lastName ?? "",
              isAuthenticated : response.status ?? true
            })
          );
          setAlertMessage({
            message: "User Account Created Successfully",
            severity: "success"
          });
          navigate(`/role-selection`);
        }
      } catch (error) {
        console.error("Registration error:", error);
        setAlertMessage({
          message: "Something went wrong. Please review your user account.",
          severity: "error"
        });
      }
    },
    [dispatch, navigate, registerUser]
  );

  const errors = (registerUserError as any)?.data;

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ mt: 8, p: 4, borderRadius: 2 }}>
        <Box sx={{ textAlign: "center", mb: 3 }}>
          <Typography variant="h4" component="h1" sx={{ fontWeight: "bold", color: "#0073b1" }}>
            Join DZ-Jobs
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" sx={{ mt: 1 }}>
            Create your account to start working and hiring on DZ-Jobs
          </Typography>
        </Box>

        {/* Show the alert message if exists */}
        {alertMessage && (
          <Alert variant="filled" severity={alertMessage.severity}>
            {alertMessage.message}
          </Alert>
        )}

        <UserRegistrationForm onCancel={onCancel} onSubmit={onSubmit} errors={errors} />
      </Paper>
    </Container>
  );
};
