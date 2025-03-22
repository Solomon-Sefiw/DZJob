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

import { useNavigate } from "react-router-dom";
import { ContractDialog } from "../Contract/ContractDialog";

interface JobDetailsDialogProps {
  open: boolean;
  onClose: () => void;
  job: JobDto | null;
  approvalStatus: JobApplicationStatus;
}

export const JobApplicantDetailsDialog: React.FC<JobDetailsDialogProps> = ({ open, onClose, job, approvalStatus }) => {
   const navigate = useNavigate();
  const { data: applicants, isLoading } = useGetJobApplicationByJobIdQuery(
    { status: approvalStatus, id: job?.id ?? 0 },
    { skip: !job } 
  );

  const [selectedApplicant, setSelectedApplicant] = useState<number | null>(null);
  
  const [dialogState, setDialogState] = useState<{ approvalOpen: boolean; closingOpen: boolean; rejectingOpen: boolean; contractOpen: boolean; }>({
    approvalOpen: false,
    closingOpen: false,
    rejectingOpen : false,
    contractOpen: false,
  });
  const [selectedFreelancer, setSelectedFreelancer] = useState<string | null>(null);
  const [selectedFreelancerForContract, setSelectedFreelancerForContrac] = useState<string | null>(null);

  const [coverLetterDialog, setCoverLetterDialog] = useState<{ open: boolean; coverLetter: string }>({ open: false, coverLetter: "" });

  const handleApproveClick = (applicantId: number) => {
    setSelectedApplicant(applicantId);
    setDialogState({ approvalOpen: true, closingOpen: false, rejectingOpen : false,contractOpen: false,});
  };
  const handleContractClick = (applicantId: string) => {
    setSelectedFreelancerForContrac(applicantId);
    setDialogState({ approvalOpen: false, closingOpen: false, rejectingOpen : false,contractOpen: true});
  };

  const handleCloseClick = (applicantId: number) => {
    setSelectedApplicant(applicantId);
    setDialogState({ approvalOpen: false, closingOpen: true ,rejectingOpen : false,contractOpen: false});
  };
  const handleRejectClick = (applicantId: number) => {
    setSelectedApplicant(applicantId);
    setDialogState({ approvalOpen: false, closingOpen: false ,rejectingOpen : true,contractOpen: false});
  };
  const handleFreelancerClick = (freelancerId: string) => {
    setSelectedFreelancer(freelancerId);
  };

  const handleCloseDialog = () => {
    setSelectedApplicant(null);
    setDialogState({ approvalOpen: false, closingOpen: false,rejectingOpen : false,contractOpen: false });
  };

  const handleOpenCoverLetter = (coverLetter: string) => {
    setCoverLetterDialog({ open: true, coverLetter });
  };

  const goToChat = (chatPartnerId : string) => {
    
    // Navigate with dynamic parameters in URL
    navigate(`/chat/${chatPartnerId}`);
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
            <Grid container  spacing={3} sx={{ mt: 2 }}>
              {applicants.items.map((applicant) => (
                <Grid  item xs={12} md={6}  key={applicant.id}>
                  <Card  variant="outlined"
                  sx={{ display: "flex", flexDirection: "column", height: "100%", padding: 3 }}
                >
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
                          <span dangerouslySetInnerHTML={{ __html: applicant.coverLetter.slice(0, 400) }} />
                        )}
                        {applicant.coverLetter && applicant.coverLetter.length > 400 && (
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
                       {approvalStatus === JobApplicationStatus.Approved && (
                        <Button
                          fullWidth
                          variant="contained"
                          color="success"
                          onClick={() => applicant.id !== undefined && handleContractClick(applicant.freelancerId ?? '')}
                        >
                          Propose| Intiate Contract
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
                          <Grid item xs={12}>
                            <Button
                              fullWidth
                              variant="contained"
                              color="primary"
                              onClick={() => job?.id && applicant.freelancerId && goToChat(applicant.freelancerId)}
                            >
                              Chat
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
     {selectedFreelancerForContract && (
      <ContractDialog  onClose={handleCloseDialog} freelancerId={selectedFreelancerForContract.toString()} jobId={job?.id || 0} />
      )} 

      {selectedFreelancer && (
        <FreelancerDetailsDialog open={!!selectedFreelancer} onClose={() => setSelectedFreelancer(null)} freelancerId={selectedFreelancer} />
      )}

      <ApplicantCoverLetterDialog open={coverLetterDialog.open} onClose={() => setCoverLetterDialog({ open: false, coverLetter: "" })} coverLetter={coverLetterDialog.coverLetter} />
    </>
  );
};
