import { Box, Button, Grid } from "@mui/material";
import { Form, Formik } from "formik";
import { useCallback } from "react";
import * as yup from "yup";
import { EmployerProfileDto } from "../../../app/api";
import { Errors, FormTextField } from "../../../components";
import { YupShape } from "../../../utils";

const initialValues: EmployerProfileDto = {
  companyName: "",
  companyDescription: "",
  logo: "",
  jobHistoryCount: 0,
  averageRating: 0,
  dzJobUserId: "",
};

const validationSchema = yup.object<YupShape<EmployerProfileDto>>({
  companyName: yup.string().required("Company Name is required"),
  companyDescription: yup.string().required("Company Description is required"),
  logo: yup.string().required("Company Logo URL is required"),
  jobHistoryCount: yup.number().min(0).required("Job History Count is required"),
  averageRating: yup.number().min(0).max(5).required("Average Rating is required"),
});

interface Props {
  onCancel?: () => void;
  onSubmit: (profile: EmployerProfileDto) => void;
  errors?: any;
}

export const EmployerProfileForm = ({ onCancel, onSubmit, errors }: Props) => {
  const handleSubmit = useCallback(
    async (values: EmployerProfileDto) => {
      console.log("Submitting employer profile:", values);
      onSubmit(values);
    },
    [onSubmit]
  );

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema} validateOnChange>
      {({ isSubmitting }) => (
        <Form>
          <Grid container spacing={3}>
            {errors && (
              <Grid item xs={12}>
                <Errors errors={errors} />
              </Grid>
            )}
            <Grid item xs={12}>
              <FormTextField name="companyName" label="Company Name" placeholder="Enter company name" fullWidth />
            </Grid>
            <Grid item xs={12}>
              <FormTextField name="companyDescription" label="Company Description" placeholder="Describe your company" fullWidth />
            </Grid>
            <Grid item xs={12}>
              <FormTextField name="logo" label="Company Logo URL" placeholder="Enter logo URL" fullWidth />
            </Grid>
            <Grid item xs={12}>
              <FormTextField name="jobHistoryCount" type="number" label="Job History Count" placeholder="Total jobs posted" fullWidth />
            </Grid>
            <Grid item xs={12}>
              <FormTextField name="averageRating" type="number" label="Average Rating (0-5)" placeholder="Enter rating" fullWidth />
            </Grid>
            <Grid item xs={12}>
              <Button color="primary" variant="contained" type="submit" disabled={isSubmitting} fullWidth sx={{ textTransform: "none", padding: "10px" }}>
                Create Employer Profile
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
