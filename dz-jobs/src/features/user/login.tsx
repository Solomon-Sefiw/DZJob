import GoogleIcon from "@mui/icons-material/Google";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { Form, Formik } from "formik";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

import { FormTextField } from "../../components/form-controls";
import { useForgetPasswordMutation, useLoginMutation } from "../../app/services/DZJobsApi";
import {  useSelector } from "react-redux";

import { RootState } from "../../app/store";
import { UserRole } from "../../app/services/enums";

const validationSchema = yup.object({
  email: yup.string().email("Please enter a valid email address").required("Email is required"),
  password: yup.string().required("Password is required"),
});

const initialValues = {
  email: "",
  password: "",
};

export const Login = () => {
  const theme = useTheme();
  const [login] = useLoginMutation();
  const [sendPwdResetEmail] = useForgetPasswordMutation();
  const [forgotPassword, setForgotPassword] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth);

  // Logout on component mount (as per your original code)

  // Redirect if user is already logged in
  useEffect(() => {
    if (user.isAuthenticated) {
      if (user.role === UserRole.EMPLOYER) {
        navigate(`/employer-dashboard`);
      } else if (user.role === UserRole.FREELANCER) {
        navigate(`/freelancer-dashboard`);
      } else {
        // Handle other roles or navigate to a default dashboard
        console.log("User logged in with unknown role:", user.role);
        navigate("/"); // Or some default route
      }

    }
  }, [user, navigate]);

  const handleSubmit = useCallback(
    (values: any) => {
      login({ login: values })
        .unwrap()
        .then((response) => {
          if (response.status) {
            localStorage.setItem("email", values.email);
            console.log(response);
            navigate("/verify");
          } else {
            window.location.reload(); // Consider showing an error message instead of a full reload
          }
        })
        .catch((error) => {
          // Handle login error, e.g., display an error message
          console.error("Login failed:", error);
        });
    },
    [login, navigate]
  );

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: theme.palette.mode === "dark" ? "#121212" : "#f7f7f7",
        }}
      >
        <Paper
          sx={{
            padding: 3,
            width: "100%",
            borderRadius: 2,
            boxShadow: 3,
            textAlign: "center",
          }}
        >
          {/* DZ-Jobs Logo */}
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              color: "#14A800",
              mb: 2,
              fontSize: "26px",
            }}
          >
            DZ-Jobs
          </Typography>

          <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
            Log in to DZ-Jobs
          </Typography>

          {forgotPassword ? (
            <>
              <Typography variant="subtitle1" sx={{ mb: 2 }}>
                Enter your email to reset your password.
              </Typography>
              <TextField
                label="Email"
                type="email"
                fullWidth
                onChange={(e) => setForgotPasswordEmail(e.target.value.trim())}
                sx={{ mb: 2 }}
              />
              <Button
                variant="contained"
                fullWidth
                sx={{
                  backgroundColor: "#14A800",
                  color: "#fff",
                  py: 1.5,
                  fontWeight: 600,
                  "&:hover": { backgroundColor: "#108A00" },
                }}
                disabled={!forgotPasswordEmail}
                onClick={() => sendPwdResetEmail({ email: forgotPasswordEmail })}
              >
                Request Reset Link
              </Button>
              <Button
                fullWidth
                sx={{ mt: 2, textTransform: "none", fontWeight: 600 }}
                onClick={() => setForgotPassword(false)}
              >
                Back to Login
              </Button>
            </>
          ) : (
            <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
              {({ isSubmitting }) => (
                <Form>
                  <FormTextField
                    id="email"
                    name="email"
                    label="Email"
                    type="email"
                    fullWidth
                    autoComplete="username"
                    sx={{
                      mb: 2,
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "8px",
                      },
                    }}
                  />
                  <FormTextField
                    id="password"
                    name="password"
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    fullWidth
                    autoComplete="current-password"
                    sx={{
                      mb: 2,
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "8px",
                      },
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end">
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <Box sx={{ textAlign: "right", mb: 2 }}>
                    <Button
                      sx={{
                        textTransform: "none",
                        fontWeight: 600,
                        color: "#14A800",
                      }}
                      onClick={() => setForgotPassword(true)}
                    >
                      Forgot Password?
                    </Button>
                  </Box>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{
                      py: 1.5,
                      backgroundColor: "#14A800",
                      color: "#fff",
                      fontWeight: 600,
                      borderRadius: "8px",
                      fontSize: "16px",
                      "&:hover": { backgroundColor: "#108A00" },
                    }}
                    disabled={isSubmitting}
                  >
                    Log In
                  </Button>
                </Form>
              )}
            </Formik>
          )}

          <Divider sx={{ my: 3, fontWeight: 600 }}>or</Divider>

          {/* Google Login at Bottom */}
          <Button
            variant="outlined"
            fullWidth
            startIcon={
              <GoogleIcon
                sx={{
                  color: "#DB4437",
                  fontSize: "24px",
                  backgroundColor: "#fff",
                  borderRadius: "50%",
                  padding: "3px",
                }}
              />
            }
            sx={{
              textTransform: "none",
              fontWeight: 600,
              borderColor: "#ddd",
              color: theme.palette.mode === "dark" ? "#fff" : "#333",
              "&:hover": { borderColor: "#aaa" },
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              py: 1.5,
              fontSize: "16px",
              borderRadius: "8px",
            }}
          >
            Continue with Google
          </Button>

          {/* Sign Up Link */}
          <Typography variant="body2" sx={{ mt: 3 }}>
            New to DZ-Jobs?{" "}
            <Button sx={{ color: "#14A800", textTransform: "none", fontWeight: 600 }} onClick={() => navigate("/new-user")}>
              Sign Up
            </Button>
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
};
