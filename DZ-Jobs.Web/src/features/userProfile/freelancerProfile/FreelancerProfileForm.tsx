import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Box, Button, Grid, IconButton, InputAdornment } from "@mui/material";
import { Form, Formik } from "formik";
import { useCallback, useState } from "react";
import * as yup from "yup";
import { FreelancerProfileDto } from '../../../app/api';
import { Errors, FormTextField } from '../../../components';
import { YupShape } from '../../../utils';

const initialValues: FreelancerProfileDto = {
  bio: "",
  skills: "",
  portfolio: "",
  rating: 0,
  experience: 0,
  hourlyRate: 0,
  location: "",
  dzJobUserId: "",
};

const validationSchema = yup.object<YupShape<FreelancerProfileDto>>({
  bio: yup.string().required("Bio is required"),
  skills: yup.string().required("Skills are required"),
  portfolio: yup.string().required("Portfolio link is required"),
  rating: yup.number().min(0).max(5).required("Rating is required"),
  experience: yup.number().min(0).required("Experience is required"),
  hourlyRate: yup.number().min(0).required("Hourly Rate is required"),
  location: yup.string().required("Location is required"),
  dzJobUserId: yup.string().required("User ID is required"),
});

interface Props {
  onCancel?: () => void;
  onSubmit: (profile: FreelancerProfileDto) => void;
  errors?: any;
}

export const FreelancerProfileForm = ({ onCancel, onSubmit, errors }: Props) => {
  const [showPortfolio, setShowPortfolio] = useState(false);
  const handleClickShowPortfolio = () => setShowPortfolio((prev) => !prev);
  const handleMouseDownPortfolio = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleSubmit = useCallback(
    async (values: FreelancerProfileDto) => {
      console.log("Submitting form with values:", values);
      onSubmit(values);
    },
    [onSubmit]
  );

  return (
    <Formik
      initialValues={initialValues}
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
                name="bio"
                type="text"
                placeholder="Bio"
                label="Bio"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <FormTextField
                name="skills"
                type="text"
                placeholder="Skills"
                label="Skills"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <FormTextField
                name="portfolio"
                type={showPortfolio ? "text" : "password"}
                label="Portfolio Link"
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickShowPortfolio}
                        onMouseDown={handleMouseDownPortfolio}
                        edge="end"
                      >
                        {showPortfolio ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormTextField
                name="rating"
                type="number"
                placeholder="Rating (0-5)"
                label="Rating"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <FormTextField
                name="experience"
                type="number"
                placeholder="Experience (in years)"
                label="Experience"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <FormTextField
                name="hourlyRate"
                type="number"
                placeholder="Hourly Rate"
                label="Hourly Rate"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <FormTextField
                name="location"
                type="text"
                placeholder="Location"
                label="Location"
                fullWidth
              />
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
                Create Profile
              </Button>
            </Grid>
            {onCancel && (
              <Grid item xs={12}>
                <Box sx={{ mt: 2, textAlign: "center" }}>
                  <Button onClick={onCancel} color="secondary" sx={{ textTransform: "none" }}>
                    Cancel
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
