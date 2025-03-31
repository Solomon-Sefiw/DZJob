import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { Form, Formik } from "formik";
import { useCallback, useEffect, useState } from "react";
import * as Yup from "yup";

import { FormRichTextField } from "../../components/form-controls/from-reach-text";
import {
  JobDto,
  useCreateJobMutation,
  useUpdateJobMutation,
} from "../../app/services/DZJobsApi";
import { removeEmptyFields } from "../../../utils";
import { DialogHeader } from "../../components/dialog";
import { Errors } from "../../components/Errors";
import { FormTextField } from "../../components/form-controls/form-text-field";
import { FormSelectField } from "../../components/form-controls/form-select";
import { JobCategory, JobType } from "../../app/services/enums";
import { getEnumOptions } from "../../components/form-controls/get-enum-list";

const emptyjobData: JobDto = {
  title: "",
  description: "",
  jobCategory: 1,
  jobType: 1,
  salary: 1,
};

export const JobDialog = ({
  onClose,
  employerId,
  job,
  title,
}: {
  onClose: () => void;
  employerId: string;
  job?: JobDto | null;
  title: string;
}) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  const [jobData, setJobData] = useState<JobDto>();
  const [message, setMessage] = useState<string | null>(null);
  const [alertSeverity, setAlertSeverity] = useState<"success" | "error">();

  const [addJob, { error: AddJobError }] = useCreateJobMutation();
  const [updateJob, { error: UpdateJobError }] = useUpdateJobMutation();

  useEffect(() => {
    setJobData({ ...emptyjobData, ...job });
  }, [job]);

  const validationSchema = Yup.object({
    title: Yup.string().required("Job title is required"),
    description: Yup.string().required("Job description is required"),
    jobCategory: Yup.number().required("Job category is required"),
    jobType: Yup.number().required("Job type is required"),
    salary: Yup.number()
      .required("Salary is required")
      .positive("Salary must be a positive number"),
  });

  const handleSubmit = useCallback(
    (values: JobDto) => {
      values.employerId = employerId;
      const payload = removeEmptyFields(values);

      (job?.id
        ? updateJob({ updateJobCommand: payload })
        : addJob({ createJobCommand: payload })
      )
        .unwrap()
        .then(() => {
          setAlertSeverity("success");
          setMessage("Job added successfully!");
          setTimeout(() => {
            onClose();
            window.location.reload();
          }, 500);
        })
        .catch(console.error);
    },
    [onClose, addJob, employerId, job?.id, updateJob]
  );

  const errors = (
    (job?.id ? UpdateJobError : AddJobError) as any
  )?.data?.errors;

  return (
    <Dialog
      scroll="paper"
      disableEscapeKeyDown
      maxWidth="md"
      open
      fullWidth
      sx={{
        "& .MuiDialog-paper": {
          borderRadius: 3,
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
        },
      }}
    >
      {jobData && (
        <Formik
          initialValues={jobData}
          enableReinitialize
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <Form>
            <DialogHeader title={title} onClose={onClose} />
            <DialogContent dividers>
              <Grid container spacing={2}>
                {/* Success / Error Message */}
                {message && (
                  <Grid item xs={12}>
                    <Alert severity={alertSeverity} onClose={() => setMessage(null)} sx={{ borderRadius: 2 }}>
                      <AlertTitle>{alertSeverity === "success" ? "Success" : "Error"}</AlertTitle>
                      {message}
                    </Alert>
                  </Grid>
                )}

                {errors && (
                  <Grid item xs={12}>
                    <Errors errors={errors} />
                  </Grid>
                )}

                {/* Job Title */}
                <Grid item xs={12}>
                  <FormTextField name="title" label="Job Title" fullWidth />
                </Grid>

                {/* Job Description */}
                <Grid item xs={12}>
                  <Box
                    sx={{
                      border: "1px solid #ddd",
                      borderRadius: 2,
                      p: 1.5,
                      backgroundColor: isDarkMode ? theme.palette.background.default : "#fff",
                      color: isDarkMode ? "#fff" : "#000",
                    }}
                  >
                    <Typography variant="subtitle2" sx={{ mb: 1 }}>
                      Job Description
                    </Typography>
                    <FormRichTextField name="description" />
                  </Box>
                </Grid>

                {/* Job Category */}
                <Grid item xs={6}>
                  <FormSelectField
                    name="jobCategory"
                    label="Job Category"
                    options={getEnumOptions(JobCategory)}
                    fullWidth
                  />
                </Grid>

                {/* Job Type */}
                <Grid item xs={6}>
                  <FormSelectField
                    name="jobType"
                    label="Job Type"
                    options={getEnumOptions(JobType)}
                    fullWidth
                  />
                </Grid>

                {/* Salary */}
                <Grid item xs={6}>
                  <FormTextField name="salary" type="number" label="Salary" fullWidth />
                </Grid>
                <Grid item xs={6}>
                <FormTextField name="location" label="Location" fullWidth />
                </Grid>
              </Grid>
            </DialogContent>

            <DialogActions sx={{ p: 2 }}>
              <Button onClick={onClose}>Cancel</Button>
              <Button
                color="primary"
                variant="contained"
                type="submit"
                sx={{
                  borderRadius: 2,
                  background: "linear-gradient(90deg, rgba(33,150,243,1) 0%, rgba(30,136,229,1) 100%)",
                  transition: "0.3s",
                  "&:hover": {
                    background: "linear-gradient(90deg, rgba(30,136,229,1) 0%, rgba(25,118,210,1) 100%)",
                  },
                }}
              >
                Save Job
              </Button>
            </DialogActions>
          </Form>
        </Formik>
      )}
    </Dialog>
  );
};
