import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import { useGetUserByIdQuery } from "../../app/api";


interface FreelancerDetailsDialogProps {
  open: boolean;
  onClose: () => void;
  freelancerId: string;
}

export const FreelancerDetailsDialog: React.FC<FreelancerDetailsDialogProps> = ({
  open,
  onClose,
  freelancerId,
}) => {
  const { data: freelancer, isLoading } = useGetUserByIdQuery({ id: freelancerId });

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Freelancer Details</DialogTitle>
      <DialogContent>
        {isLoading ? (
          <Typography>Loading...</Typography>
        ) : freelancer ? (
          <>
            <Typography variant="h6">{freelancer.firstName}</Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              {freelancer.lastName}
            </Typography>
            {/* <Typography variant="body2" sx={{ mt: 1 }}>
              Skills: {freelancer.skills.join(", ")}
            </Typography> */}
            <Typography variant="body2" sx={{ mt: 1 }}>
              Experience: {freelancer.email} years
            </Typography>
          </>
        ) : (
          <Typography>Freelancer details not found.</Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
