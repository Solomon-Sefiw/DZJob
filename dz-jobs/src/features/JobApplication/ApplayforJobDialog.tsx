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
import Stack from "@mui/material/Stack";
import { Form, Formik } from "formik";
import { useCallback, useEffect, useState } from "react";
import * as Yup from "yup";
import { FormRichTextField } from "../../components/form-controls/from-reach-text";
import { JobApplicationDto, useCreateJobApplicationMutation } from "../../app/services/DZJobsApi";
import { DialogHeader } from "../../components/dialog/DialogHeader";
import { Errors } from "../../components/Errors";
import { FormTextField } from "../../components/form-controls/form-text-field";
  
  const emptyjobData = {
    title: "",
    description: "",
    jobCategory: 0,
    jobType: 0,
    salary: 0,
  } as any;
  
  export const ApplayforJobDialog = ({ 
    onClose ,
    freelancerId,
    jobId
  }: { 
    onClose: () => void ,
    freelancerId : string,
    jobId : number | null}) => {
    const [jobData, setJobRole] = useState<JobApplicationDto>();
    const [message, setMessage] = useState<string | null>(null);
    const [alertSeverity, setAlertSeverity] = useState<"success" | "error">();
  
    const [addJobApplication, { error: AddJobRoleError }] = useCreateJobApplicationMutation();
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === "dark";
  
    useEffect(() => {
      setJobRole({
        ...emptyjobData,
        ...jobData,
      });
    }, [emptyjobData, jobData]);
  
    const validationSchema = Yup.object({
  
    });
  
    const handleSubmit = useCallback(
      (values: JobApplicationDto) => {
        values.freelancerId = freelancerId;
        values.jobId = jobId ? jobId : 0
        addJobApplication({
          createJobApplicationCommand: values,
        })
          .unwrap()
          .then(() => {
            setAlertSeverity("success");
            setMessage("Job Added successfully!");
            setTimeout(() => {
              onClose();
              window.location.reload();
            }, 0);
          })
          .catch((error) => {
            console.log(error);
          });
      },
      [onClose, addJobApplication,freelancerId]
    );
    const errors = (AddJobRoleError as any)?.data.errors;
    return (
      <Dialog
        scroll={"paper"}
        disableEscapeKeyDown={true}
        maxWidth={"md"}
        open={true}
        fullWidth
      >
        {!!jobData && (
          <Formik
            initialValues={jobData}
            enableReinitialize={true}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
            validateOnChange={true}
            validateOnBlur={true}
            validateOnSubmit={true} // Ensure that validation happens on form submit
          >
            <Form>
              <DialogHeader title="Job Application" onClose={onClose} />
              <DialogContent dividers={true}>
                <Grid container spacing={2}>
                  {message && (
                    <Stack sx={{ width: "100%", marginBottom: 2 }} spacing={2}>
                      <Alert
                        severity={alertSeverity}
                        onClose={() => setMessage(null)}
                      >
                        <AlertTitle>
                          {alertSeverity === "success" ? "Success" : "Error"}
                        </AlertTitle>
                        {message}
                      </Alert>
                    </Stack>
                  )}
                  {errors && (
                    <Grid item xs={12}>
                      <Errors errors={errors as any} />
                    </Grid>
                  )}
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
                      Cover Letter
                    </Typography>
                    <FormRichTextField name="coverLetter" />
                  </Box>
                </Grid>

                      <Grid item xs={12}>
                <FormTextField
                  name="proposedSalary"
                  type="number"
                  placeholder="Proposed Salary"
                  label="Salary"
                  fullWidth
                />
              </Grid>
                     
  
                </Grid>
              </DialogContent>
              <DialogActions sx={{ p: 2 }}>
                <Button onClick={onClose}>Cancel</Button>
                <Button color="primary" variant="outlined" type="submit">
                  Save
                </Button>
              </DialogActions>
            </Form>
          </Formik>
        )}
      </Dialog>
    );
  };
  