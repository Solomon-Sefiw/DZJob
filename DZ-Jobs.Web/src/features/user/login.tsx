import AppleIcon from "@mui/icons-material/Apple";
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
} from "@mui/material";
import { Form, Formik } from "formik";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import {
  usePostApiAuthenticationForgotPasswordMutation,
  usePostApiAuthenticationLoginMutation,
} from "../../app/api";
import { FormTextField } from "../../components/form-controls";

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});

const initialValues = {
  email: "",
  password: "",
};

export const Login = () => {
  const [login] = usePostApiAuthenticationLoginMutation();
  const [sendPwdResetEmail] = usePostApiAuthenticationForgotPasswordMutation();
  const [forgotPassword, setForgotPassword] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = useCallback(
    (values: any) => {
      login({ login: values })
        .unwrap()
        .then(() => {
          localStorage.setItem("email", values.email);
          navigate("/verify");
        })
        .catch(() => navigate("/verify"));
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
          minHeight: "100vh",
          backgroundColor: "#f7f7f7",
        }}
      >
        <Paper
          sx={{
            padding: 4,
            width: "100%",
            borderRadius: 2,
            boxShadow: 3,
            textAlign: "center",
          }}
        >
          {/* Upwork Logo */}
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

          {/* Social Login Buttons */}
          <Button
            variant="outlined"
            fullWidth
            startIcon={<GoogleIcon />}
            sx={{
              textTransform: "none",
              fontWeight: 600,
              mb: 1.5,
              borderColor: "#ddd",
              color: "#333",
              "&:hover": { borderColor: "#aaa" },
            }}
          >
            Continue with Google
          </Button>

          <Button
            variant="outlined"
            fullWidth
            startIcon={<AppleIcon />}
            sx={{
              textTransform: "none",
              fontWeight: 600,
              mb: 2,
              borderColor: "#ddd",
              color: "#333",
              "&:hover": { borderColor: "#aaa" },
            }}
          >
            Continue with Apple
          </Button>

          <Divider sx={{ my: 2, fontWeight: 600 }}>or</Divider>

          {forgotPassword ? (
            <>
              <Typography variant="subtitle1" sx={{ mb: 2 }}>
                Enter your email to reset your password.
              </Typography>
              <TextField
                label="Email"
                type="email"
                fullWidth
                onChange={(e) =>
                  setForgotPasswordEmail(e.target.value.trim())
                }
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
                onClick={() =>
                  sendPwdResetEmail({ email: forgotPasswordEmail })
                }
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
            <Formik
              initialValues={initialValues}
              onSubmit={handleSubmit}
              validationSchema={validationSchema}
            >
              {({ isSubmitting }) => (
                <Form>
                  <FormTextField
                    id="email"
                    name="email"
                    label="Email"
                    type="email"
                    fullWidth
                    autoComplete="username"
                    sx={{ mb: 2 }}
                  />
                  <FormTextField
                    id="password"
                    name="password"
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    fullWidth
                    autoComplete="current-password"
                    sx={{ mb: 2 }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
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
                      borderRadius: "4px",
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

          {/* Sign Up Link */}
          <Typography variant="body2" sx={{ mt: 3 }}>
            New to DZ-Jobs?{" "}
            <Button
              sx={{
                color: "#14A800",
                textTransform: "none",
                fontWeight: 600,
              }}
              onClick={() => navigate("/new-user")}
            >
              Sign Up
            </Button>
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
};
