import CloseIcon from "@mui/icons-material/Close";
import { Dialog, DialogContent, DialogTitle, IconButton, Typography } from "@mui/material";
import { JobDto } from "../../app/services/DZJobsApi";

interface JobDetailsDialogProps {
  open: boolean;
  onClose: () => void;
  job: JobDto | null;
}

export const JobDetailsDialog = ({ open, onClose, job }: JobDetailsDialogProps) => {
  if (!job) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        {job.title}
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Typography variant="body1">
          <div dangerouslySetInnerHTML={{ __html: job.description || "" }} />
        </Typography>
      </DialogContent>
    </Dialog>
  );
};
