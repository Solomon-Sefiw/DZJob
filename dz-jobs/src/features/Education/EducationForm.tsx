import { Box, Button, Grid } from "@mui/material";
import { Form, Formik } from "formik";
import { useCallback } from "react";
import * as yup from "yup";
import { YupShape } from "../../../utils";
import { EducationDto } from "../../app/services/DZJobsApi";
import { Errors } from "../../components/Errors";
import { FormSelectField } from "../../components/form-controls/form-select";
import { EducationLevel } from "../../app/services/enums";
import { FormTextField } from "../../components/form-controls/form-text-field";
import { getEnumOptions } from "../../components/form-controls/get-enum-list";

const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format

const initialValues: EducationDto = {
  userId: "",
  educationLevel: EducationLevel.Bachelor,
  schoolName: "",
  schoolCity: "",
  fieldOfStudy: "",
  startDate: "",
  endDate: "",
  graduationDate: "",
};

const validationSchema = yup.object<YupShape<EducationDto>>({
  startDate: yup
    .date()
    .required("Start Date is required")
    .max(today, "Start Date cannot be in the future"),
  endDate: yup
    .date()
    .required("End Date is required")
    .min(yup.ref("startDate"), "End Date cannot be before Start Date")
    .max(today, "End Date cannot be in the future"),
  schoolName: yup.string().required("School Name is required"),
  schoolCity: yup.string().required("School City is required"),
  fieldOfStudy: yup.string().required("Field of Study is required"),
  graduationDate: yup
    .date()
    .required("Graduation Date is required")
    .min(yup.ref("endDate"), "Graduation Date cannot be before End Date")
    .max(today, "Graduation Date cannot be in the future"),
});

interface Props {
  onCancel?: () => void;
  onSubmit: (education: EducationDto) => void;
  errors?: any;
}

export const EducationForm = ({ onCancel, onSubmit, errors }: Props) => {
  const handleSubmit = useCallback(
    async (values: EducationDto) => {
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
      validateOnChange
    >
      {({ isSubmitting, values }) => (
        <Form>
          <Grid container spacing={3}>
            {errors && (
              <Grid item xs={12}>
                <Errors errors={errors} />
              </Grid>
            )}

            <Grid item xs={12}>
              <FormSelectField
                name="educationLevel"
                label="Education Level"
                options={getEnumOptions(EducationLevel)}
                fullWidth
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormTextField
                name="startDate"
                type="date"
                label="Start Date"
                fullWidth
                inputProps={{ max: today }} // Disable future dates
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormTextField
                name="endDate"
                type="date"
                label="End Date"
                fullWidth
                inputProps={{
                  max: today,
                  min: values.startDate || "", // Disable dates before startDate
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <FormTextField name="schoolName" type="text" placeholder="School Name" label="School Name" fullWidth />
            </Grid>
            <Grid item xs={12}>
              <FormTextField name="schoolCity" type="text" placeholder="School City" label="School City" fullWidth />
            </Grid>
            <Grid item xs={12}>
              <FormTextField name="fieldOfStudy" type="text" placeholder="Field of Study" label="Field of Study" fullWidth />
            </Grid>

            <Grid item xs={12}>
              <FormTextField
                name="graduationDate"
                type="date"
                label="Graduation Date"
                fullWidth
                inputProps={{
                  max: today,
                  min: values.endDate || "", // Disable dates before endDate
                }}
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
                Create Education Entry
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
