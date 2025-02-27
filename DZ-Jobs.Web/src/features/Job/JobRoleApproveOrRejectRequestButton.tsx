// import { Button } from "@mui/material";
// import { useCallback, useMemo, useState } from "react";
// ;
// import { WorkflowActionDialog } from "../../../components/workflow";
// import {
//   useApproveJobRoleMutation,
//   useRejectJobRoleMutation,
// } from "../../../app/api/HCMSApi";
// import { removeEmptyFields } from "../../utils";

// export const JobRoleApproveOrRejectRequestButton = ({ id }: { id: number }) => {
//   const [dialogOpened, setDialogOpened] = useState(false);
//   const [selectedAction, setSelectedAction] = useState<"approve" | "reject">();
//   const [approve, { error: approveError, reset: approveReset }] =
//     useApproveJobRoleMutation();
//   const [reject, { error: rejectError, reset: rejectReset }] =
//     useRejectJobRoleMutation();

//   const onDialogClose = useCallback(() => {
//     approveReset();
//     rejectReset();
//     setDialogOpened(false);
//     window.location.reload();
//   }, [approveReset, rejectReset]);

//   const handleSubmit = useCallback(
//     async (comment: string) => {
//       if (!selectedAction) return;

//       const payload = removeEmptyFields({
//         id,
//         comment,
//       });
//       (selectedAction === "approve"
//         ? approve({
//             approveJobRolesCommand: payload,
//           })
//         : reject({
//             rejectJobRolesCommand: payload,
//           })
//       )
//         .unwrap()
//         .then(onDialogClose)
//         .catch(() => {});
//     },
//     [approve, id, onDialogClose, reject, selectedAction]
//   );

//   const errors = useMemo(
//     () => ((approveError || rejectError) as any)?.data?.errors,
//     [approveError, rejectError]
//   );

//   return (
//     <>
//       <Button
//         onClick={() => {
//           setDialogOpened(true);
//           setSelectedAction("approve");
//         }}
//         size="small"
//       >
//         Approve
//       </Button>

//       <Button
//         onClick={() => {
//           setDialogOpened(true);
//           setSelectedAction("reject");
//         }}
//         size="small"
//       >
//         Reject
//       </Button>

//       {dialogOpened && (
//         <WorkflowActionDialog
//           title="Job Role Approval Request"
//           onClose={() => {
//             onDialogClose();
//             setSelectedAction(undefined);
//           }}
//           onSubmit={handleSubmit}
//           errors={errors}
//         />
//       )}
//     </>
//   );
// };
