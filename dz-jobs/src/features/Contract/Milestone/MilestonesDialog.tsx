import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    Grid,
    Stack,
    Typography,
  } from "@mui/material";
  import Alert from "@mui/material/Alert";
  import AlertTitle from "@mui/material/AlertTitle";
  import { Form, Formik } from "formik";
  import { useCallback, useEffect, useState } from "react";
  import * as Yup from "yup";
  import { MilestoneDto, useCreateMilestoneMutation } from "../../../app/services/DZJobsApi";
  import { useSelector } from "react-redux";
  import { RootState } from "../../../app/store";
  import { DialogHeader } from "../../../components/dialog";
  import { Errors } from "../../../components/Errors";
  import { FormTextField } from "../../../components/form-controls/form-text-field";
  import { FormRichTextField } from "../../../components/form-controls/from-reach-text";
  
  const emptymilestoneData = {
    jobId: 0,
    freelancerId: "",
    employerId: "",
    agreedAmount: 0,
    startDate: "",
    endDate: "",
  } as any;
  
  export const MilestonesDialog = ({
    onClose,
    contractId,
    milestone,
  }: {
    onClose: () => void;
    contractId: number;
    milestone?: MilestoneDto;
  }) => {
    const [milestoneData, setMilestone] = useState<MilestoneDto>();
    const [message, setMessage] = useState<string | null>(null);
    const [alertSeverity, setAlertSeverity] = useState<"success" | "error">();
    const user = useSelector((state: RootState) => state.auth);
    const [addMilestone, { error: AddJobRoleError }] = useCreateMilestoneMutation();
  
    useEffect(() => {
        setMilestone({
        ...emptymilestoneData,
        ...milestone,
        ...milestoneData,
      });
    }, [emptymilestoneData, milestoneData]);
  
    const validationSchema = Yup.object({
      title: Yup.string().required("Title is required"),
      description: Yup.string().required("Description is required"),
      amount: Yup.number().positive("Amount must be positive").required("Amount is required"),
      dueDate: Yup.date().required("Due date is required"),
    });
  
    const handleSubmit = useCallback(
      (values: MilestoneDto) => {
        values.contractId = contractId;
        addMilestone({
          createMilestoneCommand: values,
        })
          .unwrap()
          .then(() => {
            setAlertSeverity("success");
            setMessage("Milestone Added successfully!");
            setTimeout(() => {
              onClose();
              window.location.reload();
            }, 0);
          })
          .catch((error) => {
            setAlertSeverity("error");
            setMessage("Failed to add milestone");
          });
      },
      [onClose, addMilestone, contractId]
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
        {!!milestoneData && (
          <Formik
            initialValues={milestoneData}
            enableReinitialize={true}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
            validateOnChange={true}
            validateOnBlur={true}
            validateOnSubmit={true}
          >
            <Form>
              <DialogHeader title="Add Milestone" onClose={onClose} />
              <DialogContent dividers={true}>
                <Grid container spacing={3}>
                  {message && (
                    <Stack sx={{ width: "100%", marginBottom: 2 }} spacing={2}>
                      <Alert severity={alertSeverity} onClose={() => setMessage(null)}>
                        <AlertTitle>{alertSeverity === "success" ? "Success" : "Error"}</AlertTitle>
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
                      label="Milestone Title"
                      type="text"
                      fullWidth
                      required
                      placeholder="Enter milestone title"
                    />
                  </Grid>
  
                  <Grid item xs={12}>
                    <Box sx={{ border: "1px solid #ccc", borderRadius: 2, p: 2 }}>
                      <FormRichTextField
                        name="description"
                        placeholder="Describe the milestone in detail"
                      />
                    </Box>
                  </Grid>
  
                  <Grid item xs={12} sm={6}>
                    <FormTextField
                      name="amount"
                      type="number"
                      placeholder="Amount"
                      label="Amount"
                      fullWidth
                      required
                      InputProps={{
                        startAdornment: <Typography sx={{ paddingLeft: 1 }}>$</Typography>,
                      }}
                    />
                  </Grid>
  
                  <Grid item xs={12} sm={6}>
                    <FormTextField
                      name="dueDate"
                      type="date"
                      placeholder="Due Date"
                      label="Due Date"
                      fullWidth
                      required
                    />
                  </Grid>
                </Grid>
              </DialogContent>
  
              <DialogActions sx={{ p: 2 }}>
                <Button variant="outlined" onClick={onClose} color="secondary">
                  Cancel
                </Button>
                <Button color="primary" variant="contained" type="submit">
                  Save
                </Button>
              </DialogActions>
            </Form>
          </Formik>
        )}
      </Dialog>
    );
  };
  