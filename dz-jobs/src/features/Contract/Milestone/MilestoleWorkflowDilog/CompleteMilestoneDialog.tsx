import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
//import { useApproveApplicantMutation } from "../../../app/api"; // You may need to create this API hook
import { useState } from "react";
import { useCompleteMilestoneMutation } from "../../../../app/services/DZJobsApi";



interface CompleteContractDialogProps {
  open: boolean;
  onClose: () => void;
  milestoneId: number;
}

export const CompleteMilestoneDialog: React.FC<CompleteContractDialogProps> = ({ open, onClose, milestoneId }) => {
  const [completeMilestone, { isLoading }] = useCompleteMilestoneMutation();
  const [error, setError] = useState<string | null>(null);

  const handleApprove = async () => {
    try {
      await completeMilestone({ completeMilestoneCommand: { milestoneId : milestoneId} }).unwrap();
      onClose();
    } catch (err) {
      setError("Failed to approve applicant. Please try again.");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Completed MileStone</DialogTitle>
      <DialogContent>
        <Typography>Are you sure you want to Approve this MileStone?</Typography>
        {error && <Typography color="error">{error}</Typography>}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleApprove} color="primary" variant="contained" disabled={isLoading}> 
           {isLoading ? "Approving..." : "Approve"} 
         </Button>
      </DialogActions>
    </Dialog>
  );
};
