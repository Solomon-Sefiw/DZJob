
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
const  ApplicantCoverLetterDialog = ({ open, onClose, coverLetter }: { open: boolean; onClose: () => void; coverLetter: string }) => {
    return (
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        <DialogTitle>Cover Letter</DialogTitle>
        <DialogContent>
          <Typography variant="body1" dangerouslySetInnerHTML={{ __html: coverLetter }} />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="secondary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
  export default ApplicantCoverLetterDialog;