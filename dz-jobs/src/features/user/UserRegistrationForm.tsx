import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Box, Button, Divider, Grid, IconButton, InputAdornment, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import { useCallback, useState } from "react";
import * as yup from "yup";
import { RegisterUser } from '../../app/services/DZJobsApi';
import { YupShape } from '../../../utils/utils';
import { Errors } from '../../components/Errors';
import { FormTextField } from '../../components/form-controls/form-text-field';

// Initial values for the form
const initialValues: RegisterUser = {
  email: "",
  password: "",
  firstName: "",
  lastName: "",
  username: "",
  isVerified: false,
};

const validationSchema = yup.object<YupShape<RegisterUser>>({
  email: yup.string().email("Enter a valid email").required("Email is required"),
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  username: yup.string().required("Username is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  isVerified: yup.boolean(),
});

interface Props {
  user?: RegisterUser;
  onCancel?: () => void;
  onSubmit: (user: RegisterUser) => void;
  errors?: any;
}

export const UserRegistrationForm = ({ onCancel, user, onSubmit, errors }: Props) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((prev) => !prev);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleSubmit = useCallback(
    async (values: RegisterUser) => {
      console.log("Submitting form with values:", values);
      onSubmit(values);
    },
    [onSubmit]
  );

  return (
    <Formik
      initialValues={{ ...initialValues, ...user }}
      enableReinitialize={true}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
      validateOnChange={true}
    >
      {({ isSubmitting }) => (
        <Form>
          <Grid container spacing={3}>
            {errors && (
              <Grid item xs={12}>
                <Errors errors={errors} />
              </Grid>
            )}
            <Grid item xs={12}>
              <FormTextField
                name="email"
                type="email"
                placeholder="Email Address"
                label="Email Address"
                fullWidth
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormTextField
                name="firstName"
                type="text"
                placeholder="First Name"
                label="First Name"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormTextField
                name="lastName"
                type="text"
                placeholder="Last Name"
                label="Last Name"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <FormTextField
                name="username"
                type="text"
                placeholder="Username"
                label="Username"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <FormTextField
                id="password"
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                fullWidth
                autoComplete="new-password"
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
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" color="textSecondary">
                By clicking “Sign Up”, you agree to DZ-Jobs’s{" "}
                <a href="#" target="_blank" rel="noopener noreferrer">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" target="_blank" rel="noopener noreferrer">
                  Privacy Policy
                </a>.
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Button
                color="primary"
                variant="contained"
                type="submit"
                disabled={isSubmitting}
                fullWidth
                sx={{ textTransform: "none", padding: "10px" }}
              >
                Sign Up
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
              <Typography variant="caption" display="block" align="center">
                Or sign up using social networks
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 2 }}>
                <Button variant="outlined" color="primary" sx={{ textTransform: "none" }}>
                  Facebook
                </Button>
                <Button variant="outlined" color="error" sx={{ textTransform: "none" }}>
                  Google
                </Button>
              </Box>
            </Grid>
            {onCancel && (
              <Grid item xs={12}>
                <Box sx={{ mt: 2, textAlign: "center" }}>
                  <Button onClick={onCancel} color="secondary" sx={{ textTransform: "none" }}>
                    Already have an account? Log In
                  </Button>
                </Box>
              </Grid>
            )}
          </Grid>
        </Form>
      )}
    </Formik>
  );
};
