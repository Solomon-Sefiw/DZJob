import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    Grid,
} from "@mui/material";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";
import { Form, Formik } from "formik";
import { useCallback, useEffect, useState } from "react";
import * as Yup from "yup";
import { JobDto, useCreateJobMutation } from "../../app/api";
import { JobCategory, JobType } from "../../app/api/enums";
import { DialogHeader, Errors, FormSelectField, FormTextField } from "../../components";
import { FormRichTextField } from "../../components/form-controls/from-reach-text";
  
  const emptyjobData = {
    title: "",
    description: "",
    jobCategory: 0,
    jobType: 0,
    salary: 0,
  } as any;
  
  export const JobApplicationDialog = ({ onClose ,employerId}: { onClose: () => void ,employerId : string}) => {
    const [jobData, setJobRole] = useState<JobDto>();
    const [message, setMessage] = useState<string | null>(null);
    const [alertSeverity, setAlertSeverity] = useState<"success" | "error">();
  
    const [addJobRole, { error: AddJobRoleError }] = useCreateJobMutation();
  
  
    useEffect(() => {
      setJobRole({
        ...emptyjobData,
        ...jobData,
      });
    }, [emptyjobData, jobData]);
  
    const validationSchema = Yup.object({
  
    });
  
    const handleSubmit = useCallback(
      (values: JobDto) => {
        values.employerId = employerId;
        addJobRole({
          createJobCommand: values,
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
      [onClose, addJobRole,employerId]
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
              <DialogHeader title="Add Job Role" onClose={onClose} />
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
                    <FormTextField
                      name="title"
                      label="Job Title"
                      type="text"
                      alwaysShowError={true}
                    />
                  </Grid>
  
                  <Grid item xs={12}>
                    <Box sx={{ display: "flex", gap: 2 }}>
                      <FormRichTextField name="description" />
                    </Box>
                  </Grid>
                  <Grid container spacing={3}>
                          {errors && (
                              <Grid item xs={12}>
                                  <Errors errors={errors} />
                              </Grid>
                          )}
                          <Grid item xs={12}>
                          <FormSelectField
                        name="jobCategory"
                        label="Job Category"
                        options={[
                          {
                            label: "IT",
                            value: JobCategory.IT,
                          },
                          {
                            label: "Master",
                            value: JobCategory.Consulting,
                          },
                        ]}
                      />
                      </Grid>
                      <Grid item xs={12}>
                          <FormSelectField
                        name="jobType"
                        label="Job Type"
                        options={[
                          {
                            label: "FullTime",
                            value: JobType.FullTime,
                          },
                          {
                            label: "PartTime",
                            value: JobType.PartTime,
                          },
                          {
                            label: "Contract",
                            value: JobType.Contract,
                          },
                          {
                            label: "Freelance",
                            value: JobType.Freelance,
                          },
                        ]}
                      />
                      </Grid>
                      <Grid item xs={12}>
                <FormTextField
                  name="salary"
                  type="number"
                  placeholder="Salary"
                  label="Salary"
                  fullWidth
                />
              </Grid>
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
  