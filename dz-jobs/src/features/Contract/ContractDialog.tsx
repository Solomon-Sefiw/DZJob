import {
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
import { ContractDto, useCreateContractMutation } from "../../app/services/DZJobsApi";
import { DialogHeader } from "../../components/dialog/DialogHeader";
import { Errors } from "../../components/Errors";
import { FormTextField } from "../../components/form-controls/form-text-field";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
  
  const emptyjobData = {
    jobId: 0,
    freelancerId: "",
    employerId: "",
    agreedAmount: 0,
    startDate: "",
    endDate: "",
  } as any;
  
  export const ContractDialog = ({ 
    onClose ,
    freelancerId,
    jobId
  }: { 
    onClose: () => void ,
    freelancerId : string,
    jobId : number | null}) => {
    const [jobData, setContract] = useState<ContractDto>();
    const [message, setMessage] = useState<string | null>(null);
    const [alertSeverity, setAlertSeverity] = useState<"success" | "error">();
    const user = useSelector((state: RootState) => state.auth);
    const [addContract, { error: AddJobRoleError }] = useCreateContractMutation();
  
  
    useEffect(() => {
        setContract({
        ...emptyjobData,
        ...jobData,
      });
    }, [emptyjobData, jobData]);
  
    const validationSchema = Yup.object({
  
    });
  
    const handleSubmit = useCallback(
      (values: ContractDto) => {
        values.freelancerId = freelancerId;
        values.jobId = jobId ? jobId : 0;
        values.employerId = user.userId;
        addContract({
          createContractCommand: values,
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
      [onClose, addContract,freelancerId]
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
              <DialogHeader title="Add Contract" onClose={onClose} />
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
                  {/* <Grid item xs={12}>
                    <Box sx={{ display: "flex", gap: 2 }}>
                      <FormRichTextField name="coverLetter" />
                    </Box>
                  </Grid> */}

            <Grid item xs={12}>
                <FormTextField
                  name="agreedAmount"
                  type="number"
                  placeholder="Agreed Amount"
                  label="Agreed Amount"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <FormTextField
                  name="startDate"
                  type="date"
                  placeholder="Start Date"
                  label="Start Date"
                  fullWidth
                />
              <FormTextField
                  name="endDate"
                  type="date"
                  placeholder="End Date"
                  label="End Date"
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
  