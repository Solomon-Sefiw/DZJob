import {
  Button,
  Card,
  CardActions,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
  Link,
} from "@mui/material";
import { useState } from "react";

import { FreelancerDetailsDialog } from "../userProfile/freelancerProfile/FreelancerDetailsDialog";
import { ApprovalDialog } from "./ApprovalDialog";
import { JobDto, useGetJobApplicationByJobIdQuery } from "../../app/services/DZJobsApi";
import { JobApplicationStatus } from "../../app/services/enums";
import { ClosingDialog } from "./JobGrids/ClosingDialog";
import ApplicantCoverLetterDialog from "../JobApplication/ApplicantCoverLetterDialog";
import { RejectDialog } from "./JobGrids/RejectDialog";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { useNavigate } from "react-router-dom";

interface JobDetailsDialogProps {
  open: boolean;
  onClose: () => void;
  job: JobDto | null;
  approvalStatus: JobApplicationStatus;
}

export const JobApplicantDetailsDialog: React.FC<JobDetailsDialogProps> = ({ open, onClose, job, approvalStatus }) => {
   const user = useSelector((state: RootState) => state.auth);
   const navigate = useNavigate();
  const { data: applicants, isLoading } = useGetJobApplicationByJobIdQuery(
    { status: approvalStatus, id: job?.id ?? 0 },
    { skip: !job }
  );

  const [selectedApplicant, setSelectedApplicant] = useState<number | null>(null);
  const [dialogState, setDialogState] = useState<{ approvalOpen: boolean; closingOpen: boolean; rejectingOpen: boolean; }>({
    approvalOpen: false,
    closingOpen: false,
    rejectingOpen : false,
  });
  const [selectedFreelancer, setSelectedFreelancer] = useState<string | null>(null);
  const [coverLetterDialog, setCoverLetterDialog] = useState<{ open: boolean; coverLetter: string }>({ open: false, coverLetter: "" });

  const handleApproveClick = (applicantId: number) => {
    setSelectedApplicant(applicantId);
    setDialogState({ approvalOpen: true, closingOpen: false, rejectingOpen : false,});
  };

  const handleCloseClick = (applicantId: number) => {
    setSelectedApplicant(applicantId);
    setDialogState({ approvalOpen: false, closingOpen: true ,rejectingOpen : false,});
  };
  const handleRejectClick = (applicantId: number) => {
    setSelectedApplicant(applicantId);
    setDialogState({ approvalOpen: false, closingOpen: false ,rejectingOpen : true,});
  };
  const handleFreelancerClick = (freelancerId: string) => {
    setSelectedFreelancer(freelancerId);
  };

  const handleCloseDialog = () => {
    setSelectedApplicant(null);
    setDialogState({ approvalOpen: false, closingOpen: false,rejectingOpen : false, });
  };

  const handleOpenCoverLetter = (coverLetter: string) => {
    setCoverLetterDialog({ open: true, coverLetter });
  };

  const goToChat = (jobId : number ,senderId : string ,receiverId : string) => {
    
    // Navigate with dynamic parameters in URL
    navigate(`/chat/${jobId}/${senderId}/${receiverId}`);
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
        <DialogTitle>{job?.title}</DialogTitle>
        <DialogContent>
          <Typography variant="body1" dangerouslySetInnerHTML={{ __html: job?.description || "" }} />
          <Typography variant="body2" sx={{ mt: 2 }}>
            Salary: ${job?.salary}
          </Typography>
          <Typography variant="body2">Posted on: {job?.postedDate}</Typography>

          <Typography variant="h6" sx={{ mt: 3 }}>
            Applicants (Total: {applicants?.totalCount || 0}):
          </Typography>
          {isLoading ? (
            <Typography>Loading applicants...</Typography>
          ) : applicants?.items?.length ? (
            <Grid container spacing={2} sx={{ mt: 2 }}>
              {applicants.items.map((applicant) => (
                <Grid item xs={12} sm={6} md={4} key={applicant.id}>
                  <Card variant="outlined" sx={{ display: "flex", flexDirection: "column", height: "100%", width: "100%" }}>
                    <CardContent sx={{ flex: "1 1 auto" }}>
                      <Typography
                        variant="h6"
                        sx={{ cursor: "pointer", color: "primary.main", "&:hover": { textDecoration: "underline" } }}
                        onClick={() => applicant.freelancerId && handleFreelancerClick(applicant.freelancerId)}
                      >
                        {applicant.freelancer}
                      </Typography>

                      <Typography variant="body2" sx={{ mt: 1 }} color="text.secondary">
                        {applicant.coverLetter && (
                          <span dangerouslySetInnerHTML={{ __html: applicant.coverLetter.slice(0, 100) }} />
                        )}
                        {applicant.coverLetter && applicant.coverLetter.length > 100 && (
                          <Link
                            component="button"
                            variant="body2"
                            sx={{ ml: 1, color: "primary.main" }}
                            onClick={() => handleOpenCoverLetter(applicant.coverLetter || "")}
                          >
                            More
                          </Link>
                        )}
                      </Typography>

                      <Typography variant="body2" sx={{ mt: 1 }} color="text.secondary">
                        Proposed Salary: ${applicant.proposedSalary}
                      </Typography>
                    </CardContent>
                    <CardActions sx={{ justifyContent: "center", padding: 2 }}>
                      {approvalStatus === JobApplicationStatus.Pending && (
                        <Button
                          fullWidth
                          variant="contained"
                          color="success"
                          onClick={() => applicant.id !== undefined && handleApproveClick(applicant.id)}
                        >
                          Interview
                        </Button>
                      )}
                      {approvalStatus === JobApplicationStatus.Accepted && (
                        <Grid container spacing={1}>
                          <Grid item xs={6}>
                            <Button
                              fullWidth
                              variant="contained"
                              color="success"
                              onClick={() => applicant.id !== undefined && handleCloseClick(applicant.id)}
                            >
                              Approve
                            </Button>
                          </Grid>
                          <Grid item xs={6}>
                            <Button
                              fullWidth
                              variant="contained"
                              color="error"
                              onClick={() => applicant.id !== undefined && handleRejectClick(applicant.id)}
                            >
                              Reject
                            </Button>
                          </Grid>
                          <Grid item xs={6}>
                            <Button
                              fullWidth
                              variant="contained"
                              color="primary"
                              onClick={() => job?.id && applicant.freelancerId && goToChat(job.id, user.userId, applicant.freelancerId)}
                            >
                              Message
                            </Button>
                          </Grid>
                        </Grid>
                      )}
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography>No applicants found.</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="secondary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {selectedApplicant && (
        <>
          <ApprovalDialog open={dialogState.approvalOpen} onClose={handleCloseDialog} applicantId={selectedApplicant} jobId={job?.id || 0} />
          <ClosingDialog open={dialogState.closingOpen} onClose={handleCloseDialog} applicantId={selectedApplicant} jobId={job?.id || 0} />
          <RejectDialog open={dialogState.rejectingOpen} onClose={handleCloseDialog} applicantId={selectedApplicant} jobId={job?.id || 0} />

        </>
      )}

      {selectedFreelancer && (
        <FreelancerDetailsDialog open={!!selectedFreelancer} onClose={() => setSelectedFreelancer(null)} freelancerId={selectedFreelancer} />
      )}

      <ApplicantCoverLetterDialog open={coverLetterDialog.open} onClose={() => setCoverLetterDialog({ open: false, coverLetter: "" })} coverLetter={coverLetterDialog.coverLetter} />
    </>
  );
};
