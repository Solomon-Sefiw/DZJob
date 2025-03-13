import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
//import { useApproveApplicantMutation } from "../../../app/api"; // You may need to create this API hook
import { useState } from "react";
import {  useRejectJobApplicationMutation } from "../../../app/services/DZJobsApi";



interface ApprovalDialogProps {
  open: boolean;
  onClose: () => void;
  applicantId: number;
  jobId: number;
}

export const RejectDialog: React.FC<ApprovalDialogProps> = ({ open, onClose, applicantId, jobId }) => {
  const [rejectApplicant, { isLoading }] = useRejectJobApplicationMutation();
  const [error, setError] = useState<string | null>(null);

  const handleApprove = async () => {
    try {
      await rejectApplicant({ rejectJobApplicationCommand: { applicantId, jobId } }).unwrap();
      onClose();
    } catch (err) {
      setError("Failed to approve applicant. Please try again.");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Approve Applicant</DialogTitle>
      <DialogContent>
        <Typography>Are you sure you want to Reject this applicant?</Typography>
        {error && <Typography color="error">{error}</Typography>}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleApprove} color="error" variant="contained" disabled={isLoading}> 
           {isLoading ? "Rejecting..." : "Reject"} 
         </Button>
      </DialogActions>
    </Dialog>
  );
};
