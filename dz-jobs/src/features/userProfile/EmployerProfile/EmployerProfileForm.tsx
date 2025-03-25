import { Box, Button, Grid, Typography, CircularProgress } from "@mui/material";
import { Form, Formik } from "formik";
import { useCallback } from "react";
import * as yup from "yup";
import { YupShape } from "../../../../utils";
import { EmployerProfileDto } from "../../../app/services/DZJobsApi";
import { FormTextField } from "../../../components/form-controls";
import { Errors } from "../../../components/Errors";
import { motion } from "framer-motion";

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
  logo: yup.string().url("Must be a valid URL").required("Company Logo URL is required"),
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
    <Box sx={{ maxWidth: 500, mx: "auto", p: 3, borderRadius: 3, bgcolor: "background.paper", boxShadow: 3 }}>
      <Typography variant="h5" fontWeight="bold" textAlign="center" gutterBottom>
        Create Employer Profile
      </Typography>

      <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema} validateOnMount>
        {({ isSubmitting, isValid }) => (
          <Form>
            <Grid container spacing={2}>
              {errors && (
                <Grid item xs={12}>
                  <Errors errors={errors} />
                </Grid>
              )}
              <Grid item xs={12}>
                <FormTextField name="companyName" label="Company Name" placeholder="Enter company name" fullWidth />
              </Grid>
              <Grid item xs={12}>
                <FormTextField
                  name="companyDescription"
                  label="Company Description"
                  placeholder="Describe your company"
                  fullWidth
                  multiline
                  rows={3}
                />
              </Grid>
              <Grid item xs={12}>
                <FormTextField name="logo" label="Company Logo URL" placeholder="Enter logo URL" fullWidth />
              </Grid>

              <Grid item xs={12}>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    color="primary"
                    variant="contained"
                    type="submit"
                    disabled={!isValid || isSubmitting}
                    fullWidth
                    sx={{ textTransform: "none", padding: "12px", fontSize: "16px" }}
                  >
                    {isSubmitting ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Create Profile"}
                  </Button>
                </motion.div>
              </Grid>

              {onCancel && (
                <Grid item xs={12} textAlign="center">
                  <Button onClick={onCancel} color="secondary" sx={{ textTransform: "none" }}>
                    Cancel
                  </Button>
                </Grid>
              )}
            </Grid>
          </Form>
        )}
      </Formik>
    </Box>
  );
};
