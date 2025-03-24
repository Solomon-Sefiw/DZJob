import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
//import { useApproveApplicantMutation } from "../../../app/api"; // You may need to create this API hook
import { useState } from "react";
import { useApproveJobApplicationMutation } from "../../app/services/DZJobsApi";


interface ApprovalDialogProps {
  open: boolean;
  onClose: () => void;
  applicantId: number;
  jobId: number;
}

export const ApprovalDialog: React.FC<ApprovalDialogProps> = ({ open, onClose, applicantId, jobId }) => {
  const [approveApplicant, { isLoading }] = useApproveJobApplicationMutation();
  const [error, setError] = useState<string | null>(null);

  const handleApprove = async () => {
    try {
      await approveApplicant({ approveJobApplicationCommand: { applicantId, jobId } }).unwrap();
      onClose();
    } catch (err) {
      setError("Failed to approve applicant. Please try again.");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Approve Applicant</DialogTitle>
      <DialogContent>
        <Typography>Are you sure you want to Interview this applicant?</Typography>
        {error && <Typography color="error">{error}</Typography>}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleApprove} color="primary" variant="contained" disabled={isLoading}> 
           {isLoading ? "Approving..." : "Yes"} 
         </Button>
      </DialogActions>
    </Dialog>
  );
};
