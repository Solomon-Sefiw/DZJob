import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
} from "@mui/material";
import { Form, Formik } from "formik";
import { useCallback, useEffect, useState } from "react";
// import { JobRole, useAddJobRoleMutation } from "../../../app/api/HCMSApi";
// import { useJobCatagory } from "../JobCatagory/useJobCatagories";
// import { useJobGrade } from "../JobGrade/useJobGrade";
// import { useJobRoleCategories } from "./useJobRoleCatagories";
// import { FormRichTextField } from "../../../components/form-controls/from-reach-text";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";
import * as Yup from "yup";
import { CreateJobCommand, usePostApiJobCreateMutation } from "../../app/api";
import { DialogHeader, Errors, FormTextField } from "../../components";
import { FormRichTextField } from "../../components/form-controls/from-reach-text";

const emptyjobRoleData = {
  name: "",
  description: "",
  jobCatagoryId: "", // Add all required fields to the empty state
  jobRoleCategoryId: "",
  jobGradeId: "",
} as any;

export const JobRoleDialog = ({ onClose }: { onClose: () => void }) => {
  const [jobRoleData, setJobRole] = useState<CreateJobCommand>();
  const [message, setMessage] = useState<string | null>(null);
  const [alertSeverity, setAlertSeverity] = useState<"success" | "error">();

  const [addJobRole, { error: AddJobRoleError }] = usePostApiJobCreateMutation();
  // const { JobCatagoryLookups } = useJobCatagory();
  // const { JobGradesLookups } = useJobGrade();
  // const { jobRoleCatagoriesLookups } = useJobRoleCategories();

  useEffect(() => {
    setJobRole({
      ...emptyjobRoleData,
      ...jobRoleData,
    });
  }, [emptyjobRoleData, jobRoleData]);

  const validationSchema = Yup.object({
    roleName: Yup.string()
      .required("Job Role Name is Required")
      .max(100, "Job Role Name cannot exceed 100 characters"),
    jobCatagoryId: Yup.number().required("Job Role Catagory is Required"),
    jobRoleCategoryId: Yup.number().required(
      "Job Role ,Role Catagory is Required"
    ),
    jobGradeId: Yup.number().required("Job Role Grade is Required"),
    description: Yup.string().required("The Job Description is Required"),
  });

  const handleSubmit = useCallback(
    (values: CreateJobCommand) => {
      addJobRole({
        createJobCommand: values,
      })
        .unwrap()
        .then(() => {
          setAlertSeverity("success");
          setMessage("JobRole Added successfully!");
          setTimeout(() => {
            onClose();
            window.location.reload();
          }, 2000);
        })
        .catch((error) => {
          // Handle error appropriately
        });
    },
    [onClose, addJobRole]
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
      {!!jobRoleData && (
        <Formik
          initialValues={jobRoleData}
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
                    name="roleName"
                    label="Job Role Name"
                    type="text"
                    alwaysShowError={true}
                  />
                </Grid>
                {/* <Grid item xs={12}>
                  <Box sx={{ display: "flex", gap: 2 }}>
                    <FormSelectField
                      name="jobCatagoryId"
                      label="Job Catagory"
                      type="number"
                      options={JobCatagoryLookups}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ display: "flex", gap: 2 }}>
                    <FormSelectField
                      name="jobRoleCategoryId"
                      label="Job Role Catagory"
                      type="number"
                      options={jobRoleCatagoriesLookups}
                    />
                  </Box>
                </Grid>

                <Grid item xs={12}>
                  <Box sx={{ display: "flex", gap: 2 }}>
                    <FormSelectField
                      name="jobGradeId"
                      label="Job Grade"
                      type="number"
                      options={JobGradesLookups}
                    />
                  </Box>
                </Grid> */}
                <Grid item xs={12}>
                  <Box sx={{ display: "flex", gap: 2 }}>
                    <FormRichTextField name="description" />
                  </Box>
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
