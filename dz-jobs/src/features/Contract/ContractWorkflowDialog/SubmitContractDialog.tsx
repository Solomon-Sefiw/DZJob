import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
//import { useApproveApplicantMutation } from "../../../app/api"; // You may need to create this API hook
import { useState } from "react";
import { useSubmitContractMutation } from "../../../app/services/DZJobsApi";


interface SubmitContractDialogProps {
  open: boolean;
  onClose: () => void;
  contractId: number;
}

export const SubmitContractDialog: React.FC<SubmitContractDialogProps> = ({ open, onClose, contractId }) => {
  const [submitContract, { isLoading }] = useSubmitContractMutation();
  const [error, setError] = useState<string | null>(null);

  const handleApprove = async () => {
    try {
      await submitContract({ submitContractCommand: { id : contractId} }).unwrap();
      onClose();
    } catch (err) {
      setError("Failed to approve applicant. Please try again.");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Submit Contract</DialogTitle>
      <DialogContent>
        <Typography>Are you sure you want to Submit this Contract?</Typography>
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
