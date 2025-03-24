import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
//import { useApproveApplicantMutation } from "../../../app/api"; // You may need to create this API hook
import { useState } from "react";
import { useActivateContractMutation } from "../../../app/services/DZJobsApi";


interface AcceptContractDialogProps {
  open: boolean;
  onClose: () => void;
  contractId: number;
}

export const AcceptContractDialog: React.FC<AcceptContractDialogProps> = ({ open, onClose, contractId }) => {
  const [acceptContract, { isLoading }] = useActivateContractMutation();
  const [error, setError] = useState<string | null>(null);

  const handleApprove = async () => {
    try {
      await acceptContract({ activeContractCommand: { id : contractId} }).unwrap();
      onClose();
    } catch (err) {
      setError("Failed to approve applicant. Please try again.");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Accept Contract</DialogTitle>
      <DialogContent>
        <Typography>Are you sure you want to Accept this Contract?</Typography>
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
