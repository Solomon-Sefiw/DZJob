import {
  Box,
  Button,
  Grid,
  InputAdornment,
  Link,
} from "@mui/material";
import { Form, Formik } from "formik";
import * as yup from "yup";
import { FreelancerProfileDto } from "../../../app/services/DZJobsApi";
import { YupShape } from "../../../../utils";
import { Errors } from "../../../components/Errors";
import { FormTextField } from "../../../components/form-controls";

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
});

interface Props {
  onCancel?: () => void;
  onSubmit: (profile: FreelancerProfileDto) => void;
  errors?: any;
}

export const FreelancerProfileForm = ({ onCancel, onSubmit, errors }: Props) => {
  const handleSubmit = async (values: FreelancerProfileDto) => {
    console.log("Submitting form with values:", values);
    onSubmit(values);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
      {({ isSubmitting, values }) => (
        <Form>
          <Grid container spacing={3}>
            {errors && (
              <Grid item xs={12}>
                <Errors errors={errors} />
              </Grid>
            )}
            <Grid item xs={12}>
              <FormTextField name="bio" label="Bio" fullWidth />
            </Grid>
            <Grid item xs={12}>
              <FormTextField name="skills" label="Skills" fullWidth />
            </Grid>
            <Grid item xs={12}>
              <FormTextField
                name="portfolio"
                label="Portfolio Link"
                fullWidth
                InputProps={{
                  endAdornment: values.portfolio ? (
                    <InputAdornment position="end">
                      <Link href={values.portfolio} target="_blank" rel="noopener noreferrer">
                        View
                      </Link>
                    </InputAdornment>
                  ) : null,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormTextField name="hourlyRate" type="number" label="Hourly Rate" fullWidth />
            </Grid>
            <Grid item xs={12}>
              <FormTextField name="location" label="Location" fullWidth />
            </Grid>
            <Grid item xs={12}>
              <Button color="primary" variant="contained" type="submit" disabled={isSubmitting} fullWidth>
                Create Profile
              </Button>
            </Grid>
            {onCancel && (
              <Grid item xs={12}>
                <Box textAlign="center">
                  <Button onClick={onCancel} color="secondary">
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
