// import { Form, Formik } from "formik";
// import { useCallback, useEffect, useState } from "react";
// import {
//   DialogHeader,
//   FormSelectField,
//   FormTextField,
//   Errors,
// } from "../../../components";
// import {
//   Box,
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   Grid,
// } from "@mui/material";
// import {
//   JobRoleDto,
//   useUpdateJobRoleMutation,
//   useGetJobRoleByIdQuery,
//   JobRole,
// } from "../../../app/api/HCMSApi";
// import { useJobCatagory } from "../JobCatagory/useJobCatagories";
// import { useJobGrade } from "../JobGrade/useJobGrade";
// import { useJobRoleCategories } from "./useJobRoleCatagories";
// import { FormRichTextField } from "../../../components/form-controls/from-reach-text";
// import { useAlert } from "../../notification";
// import Alert from "@mui/material/Alert";
// import AlertTitle from "@mui/material/AlertTitle";
// import Stack from "@mui/material/Stack";
// import * as Yup from "yup";
// const emptyjobRoleData = {
//   roleName: "",
//   jobCatagoryId: "",
//   jobRoleCategoryId: "",
//   jobGradeId: "",
//   description: "",
// } as any;
// interface JobRoleUpdateDialogProps {
//   onClose: () => void;
//   Id?: number;
// }
// export const JobRoleUpdateDialog = ({
//   onClose,
//   Id,
// }: JobRoleUpdateDialogProps) => {
//   const [message, setMessage] = useState<string | null>(null);
//   const [alertSeverity, setAlertSeverity] = useState<"success" | "error">();
//   const [jobRoleData, setJobRoleData] = useState<JobRole>();
//   const {
//     data: jobRole,
//     isLoading,
//     error,
//   } = useGetJobRoleByIdQuery({ id: Id });

//   useEffect(() => {
//     if (jobRole && typeof jobRole === "object") {
//       setJobRoleData({
//         ...emptyjobRoleData,
//         ...(jobRole as JobRole),
//       });
//     }
//   }, [jobRole]);

//   //Lookup Populating
//   const { JobCatagoryLookups } = useJobCatagory();
//   const { JobGradesLookups } = useJobGrade();
//   const { jobRoleCatagoriesLookups } = useJobRoleCategories();
//   const [
//     updateJobRole,
//     { isLoading: updateJobRoleLoading, error: updateJobRoleError },
//   ] = useUpdateJobRoleMutation();

//   const validationSchema = Yup.object({
//     roleName: Yup.string()
//       .required("Role Name is Required")
//       .max(100, "Job Role Name cannot exceed 100 characters"),
//     jobCatagoryId: Yup.number().required("Job Role Catagory is Must"),
//     jobRoleCategoryId: Yup.number().required(
//       "Job Role ,Role Catagory is needed"
//     ),
//     jobGradeId: Yup.number().required("Job Role Grade is Required"),
//     description: Yup.string().required("The Job Description is Required"),
//   });
//   const handleSubmit = useCallback(
//     (values: JobRole) => {
//       updateJobRole({
//         updateJobRoleCommand: values,
//       })
//         .unwrap()
//         .then(() => {
//           setAlertSeverity("success");
//           setMessage("JobRole updated successfully!");
//           setTimeout(() => {
//             window.location.reload();
//             onClose();
//           }, 2000);
//         })
//         .catch((error) => {});
//     },
//     [onClose, updateJobRole]
//   );
//   const errors = (updateJobRoleError as any)?.data?.errors;
//   return (
//     <Dialog
//       scroll={"paper"}
//       disableEscapeKeyDown={true}
//       maxWidth={"md"}
//       open={true}
//       fullWidth
//     >
//       {!!jobRoleData && (
//         <Formik
//           initialValues={jobRoleData}
//           enableReinitialize={true}
//           onSubmit={handleSubmit}
//           validationSchema={validationSchema}
//           validateOnChange={true}
//         >
//           <Form>
//             <DialogHeader title="Update Job Role" onClose={onClose} />
//             <DialogContent dividers={true}>
//               <Grid container spacing={2}>
//                 {message && (
//                   <Stack sx={{ width: "100%", marginBottom: 2 }} spacing={2}>
//                     <Alert
//                       severity={alertSeverity}
//                       onClose={() => setMessage(null)}
//                     >
//                       <AlertTitle>
//                         {alertSeverity === "success" ? "Success" : "Error"}
//                       </AlertTitle>
//                       {message}
//                     </Alert>
//                   </Stack>
//                 )}
//                 {errors && (
//                   <Grid item xs={12}>
//                     <Errors errors={errors as any} />
//                   </Grid>
//                 )}
//                 <Grid item xs={12}>
//                   <FormTextField
//                     name="roleName"
//                     label="Job Role Name"
//                     type="text"
//                   />
//                 </Grid>
//                 <Grid item xs={12}>
//                   <Box sx={{ display: "flex", gap: 2 }}>
//                     <FormSelectField
//                       name="jobCatagoryId"
//                       label="Job Catagory"
//                       type="number"
//                       options={JobCatagoryLookups}
//                     />
//                   </Box>
//                 </Grid>
//                 <Grid item xs={12}>
//                   <Box sx={{ display: "flex", gap: 2 }}>
//                     <FormSelectField
//                       name="jobRoleCategoryId"
//                       label="Job Role Catagory"
//                       type="number"
//                       options={jobRoleCatagoriesLookups}
//                     />
//                   </Box>
//                 </Grid>

//                 <Grid item xs={12}>
//                   <Box sx={{ display: "flex", gap: 2 }}>
//                     <FormSelectField
//                       name="jobGradeId"
//                       label="Job Grade"
//                       type="number"
//                       options={JobGradesLookups}
//                     />
//                   </Box>
//                 </Grid>
//                 <Grid item xs={12}>
//                   <Box sx={{ display: "flex", gap: 2 }}>
//                     <FormRichTextField name="description" />
//                   </Box>
//                 </Grid>
//               </Grid>
//             </DialogContent>
//             <DialogActions sx={{ p: 2 }}>
//               <Button onClick={onClose}>Cancel</Button>
//               <Button color="primary" variant="outlined" type="submit">
//                 Save
//               </Button>
//             </DialogActions>
//           </Form>
//         </Formik>
//       )}
//     </Dialog>
//   );
// };
