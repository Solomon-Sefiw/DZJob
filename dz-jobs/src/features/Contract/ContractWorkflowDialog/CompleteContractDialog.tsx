import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
//import { useApproveApplicantMutation } from "../../../app/api"; // You may need to create this API hook
import { useState } from "react";
import { useCompleteContractMutation } from "../../../app/services/DZJobsApi";


interface CompleteContractDialogProps {
  open: boolean;
  onClose: () => void;
  contractId: number;
}

export const CompleteContractDialog: React.FC<CompleteContractDialogProps> = ({ open, onClose, contractId }) => {
  const [completeContract, { isLoading }] = useCompleteContractMutation();
  const [error, setError] = useState<string | null>(null);

  const handleApprove = async () => {
    try {
      await completeContract({ completedContractCommand: { id : contractId} }).unwrap();
      onClose();
    } catch (err) {
      setError("Failed to approve applicant. Please try again.");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Completed Contract</DialogTitle>
      <DialogContent>
        <Typography>Are you sure you want to Approve this Contract?</Typography>
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
