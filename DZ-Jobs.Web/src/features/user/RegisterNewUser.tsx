import { Alert, Box, Container, Paper, Typography } from "@mui/material";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RegisterUser, useCreateUserMutation, } from "../../app/api";
import { setUser } from "../../app/slices/authSlice";
import { UserRegistrationForm } from "./UserRegistrationForm";
export const RegisterNewUser = () => {
  const navigate = useNavigate();
  const [registerUser, { error: registerUserError }] = useCreateUserMutation();
  const dispatch = useDispatch();

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
            })
          );
          if(response.status){
            <Alert variant="filled" severity="success">
                          User Account Created Successfuly
            </Alert>
          navigate(`/role-selection`);
        }else{
          <Alert variant="filled" severity="error">
                  Someting is Wrog Please Revew you User Account.
        </Alert>

        }
        }
      } catch (error) {
        console.error("Registration error:", error);
        <Alert variant="filled" severity="error">
        Someting is Wrog Please Revew you User Account.
</Alert>
      }
    },
    [dispatch, navigate, registerUser]
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


