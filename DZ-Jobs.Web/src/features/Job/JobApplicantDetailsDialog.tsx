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
} from "@mui/material";
import { useState } from "react";
import { JobDto, useGetJobApplicationByJobIdQuery } from "../../app/api";
import { FreelancerDetailsDialog } from "../userProfile/FreelancerDetailsDialog";
import { ApprovalDialog } from "./ApprovalDialog";
  
  interface JobDetailsDialogProps {
    open: boolean;
    onClose: () => void;
    job: JobDto | null;
  }
  
  export const JobApplicantDetailsDialog: React.FC<JobDetailsDialogProps> = ({ open, onClose, job }) => {
    const { data: applicants, isLoading } = useGetJobApplicationByJobIdQuery(
      { id: job?.id ?? 0 },
      { skip: !job }
    );
  
    const [selectedApplicant, setSelectedApplicant] = useState<number | null>(null);
    const [approvalOpen, setApprovalOpen] = useState(false);
    const [selectedFreelancer, setSelectedFreelancer] = useState<string | null>(null);
  
    const handleApproveClick = (applicantId: number) => {
      setSelectedApplicant(applicantId);
      setApprovalOpen(true);
    };
  
    const handleFreelancerClick = (freelancerId: string) => {
      setSelectedFreelancer(freelancerId);
    };
  console.log(applicants?.items)
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
                    <Card variant="outlined" sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
                      <CardContent>
                        <Typography
                          variant="h6"
                          sx={{ cursor: "pointer", color: "primary.main", "&:hover": { textDecoration: "underline" } }}
                          onClick={() => applicant.freelancerId && handleFreelancerClick(applicant.freelancerId)}
                        >
                          {applicant.freelancer}
                        </Typography>
                        <Typography variant="body2" sx={{ mt: 1 }} color="text.secondary">

                          <div dangerouslySetInnerHTML={{ __html: applicant.coverLetter || "" }} />
                        </Typography>
                        <Typography variant="body2" sx={{ mt: 1 }} color="text.secondary">
                          Proposed Salary: ${applicant.proposedSalary}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button
                          fullWidth
                          variant="contained"
                          color="success"
                          onClick={() => applicant.id !== undefined && handleApproveClick(applicant.id)}
                        >
                          Approve
                        </Button>
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
          <ApprovalDialog
            open={approvalOpen}
            onClose={() => setApprovalOpen(false)}
            applicantId={selectedApplicant}
            jobId={job?.id || 0}
          />
        )}
  
        {selectedFreelancer && (
          <FreelancerDetailsDialog
            open={!!selectedFreelancer}
            onClose={() => setSelectedFreelancer(null)}
            freelancerId={selectedFreelancer}
          />
        )}
      </>
    );
  };
  