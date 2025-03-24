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
  Chip,
} from "@mui/material";
import { useState } from "react";
import {
  ContractDto,
  MilestoneDto,
  useGetMilestonesByContractIdQuery,
} from "../../../app/services/DZJobsApi";
import { ContractStatus, MilestoneStatus, UserRole } from "../../../app/services/enums";
import { MilestonesDialog } from "./MilestonesDialog";
import { CompleteMilestoneDialog } from "./MilestoleWorkflowDilog/CompleteMilestoneDialog";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";

interface MilestonesDialogDetailProps {
  open: boolean;
  onClose: () => void;
  contract: ContractDto | null;
  approvalStatus: ContractStatus;
}

export const MilestonesDialogDetail: React.FC<MilestonesDialogDetailProps> = ({
  open,
  onClose,
  contract,
  approvalStatus,
}) => {
  const user = useSelector((state: RootState) => state.auth);

  // Fetch milestones
  const { data: milestonesData, isLoading } = useGetMilestonesByContractIdQuery(
    { contractId: contract?.id || 0 },
    { skip: !contract }
  );
  const [selectedMilestone, setSelectedMilestone] = useState<number | null>(null);
  // State for managing milestone dialog (Add / Update)
  const [milestoneDialog, setMilestoneDialog] = useState<{
    open: boolean;
    milestone: MilestoneDto | null;
  }>({ open: false, milestone: null });

  // State for description modal
  const [descriptionDialog, setDescriptionDialog] = useState({
    open: false,
    description: "",
  });
    const [dialogState, setDialogState] = useState<{ approveMilestone: boolean; }>({
      approveMilestone: false,
    });

    // const handleCloseClick = (applicantId: number) => {
    //   setSelectedMilestone(applicantId);
    //   setDialogState({ submitContract: true,});
    // };
    const handleApproveMilestone = async (milestoneId: number) => {
      setSelectedMilestone(milestoneId);
      setDialogState({ approveMilestone: true,});
 
    };
    const handleCloseDialogs = () => {
      setSelectedMilestone(null);
     // setOpenJobDialog(false);
      setDialogState({ approveMilestone: false });
    };

  // Open Add/Edit milestone dialog
  const handleMilestoneDialog = (milestone?: MilestoneDto | null) => {
    setMilestoneDialog({ open: true, milestone: milestone ?? null });
  };

  // Close milestone dialog
  const handleCloseMilestoneDialog = () => {
    setMilestoneDialog({ open: false, milestone: null });
  };


  // Open description dialog
  const handleMoreClick = (description: string) => {
    setDescriptionDialog({ open: true, description });
  };

  // Close description dialog
  const handleCloseDescriptionDialog = () => {
    setDescriptionDialog({ open: false, description: "" });
  };


  // Handle milestone approval


  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>
        {contract?.jobTitle} - Milestones With {contract?.freelancer ?? "Freelancer"}
      </DialogTitle>

      <DialogContent>
        <Typography variant="h6" sx={{ mt: 3 }}>
          Milestones (Total: {milestonesData?.totalCount || 0}):
        </Typography>

        {/* Add Milestone Button */}
        <Button variant="contained" color="primary" sx={{ mb: 2 }} onClick={() => handleMilestoneDialog()}>
          Add Milestone
        </Button>

        {isLoading ? (
          <Typography>Loading milestones...</Typography>
        ) : milestonesData?.items?.length ? (
          <Grid container spacing={3} sx={{ mt: 2 }}>
            {milestonesData.items.map((milestone) => (
              <Grid item xs={12} md={6} key={milestone.id}>
                <Card
                  variant="outlined"
                  sx={{ display: "flex", flexDirection: "column", height: "100%", padding: 3 }}
                >
                  <CardContent sx={{ flex: "1 1 auto" }}>
                    <Typography
                      variant="h6"
                      sx={{
                        cursor: "pointer",
                        color: "primary.main",
                        "&:hover": { textDecoration: "underline" },
                      }}
                      onClick={() => handleMilestoneDialog(milestone)}
                    >
                      {milestone.title}
                    </Typography>

                    <Typography variant="body2" sx={{ mt: 1 }} color="text.secondary">
                      {milestone.description && (
                        <span dangerouslySetInnerHTML={{ __html: milestone.description.slice(0, 400) }} />
                      )}
                      {milestone.description && milestone.description.length > 400 && (
                        <Link
                          component="button"
                          variant="body2"
                          sx={{ ml: 1, color: "primary.main" }}
                          onClick={() => handleMoreClick(milestone.description ?? "")}
                        >
                          More
                        </Link>
                      )}
                    </Typography>

                    <Typography variant="body2" sx={{ mt: 2 }} color="text.secondary">
                      Payment: <strong>${milestone.amount}</strong>
                      <Chip sx={{ float: "right" }} label={milestone.status !== undefined ? MilestoneStatus[milestone.status] : "Unknown"} color="secondary" />
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ justifyContent: "center", padding: 2 }}>
                    {approvalStatus === ContractStatus.Active && (
                      <>
                      <Button
                        fullWidth
                        variant="contained"
                        color="success"
                        onClick={() => milestone.id !== undefined && handleApproveMilestone(milestone.id)}
                      >
                        Approve
                      </Button>
                      <Button
                        fullWidth
                        variant="contained"
                        color="error"
                        onClick={() => milestone.id !== undefined && handleApproveMilestone(milestone.id)}
                      >
                        Reject
                      </Button>
                      </>
                    )}
                 {user.role === UserRole.EMPLOYER&& approvalStatus === ContractStatus.Pending && ( <Button fullWidth variant="outlined" color="primary" onClick={() => handleMilestoneDialog(milestone)}>
                      Update
                    </Button>)}
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography>No milestones found.</Typography>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Close
        </Button>
      </DialogActions>

      {/* Milestone Dialog for Add or Update */}
      {milestoneDialog.open && (
        <MilestonesDialog
          onClose={handleCloseMilestoneDialog}
          contractId={contract?.id || 0}
          milestone={milestoneDialog.milestone}
        />
      )}
                  {selectedMilestone && (
                    <>
                      <CompleteMilestoneDialog open={dialogState.approveMilestone} onClose={handleCloseDialogs} milestoneId={selectedMilestone}  />
                      {/* <ClosingDialog open={dialogState.closingOpen} onClose={handleCloseDialog} applicantId={selectedApplicant} jobId={job?.id || 0} />
                      <RejectDialog open={dialogState.rejectingOpen} onClose={handleCloseDialog} applicantId={selectedApplicant} jobId={job?.id || 0} /> */}
                    </>
                  )}

      {/* Full Description Dialog */}
      <Dialog open={descriptionDialog.open} onClose={handleCloseDescriptionDialog} fullWidth maxWidth="sm">
        <DialogTitle>Milestone Description</DialogTitle>
        <DialogContent>
          <Typography variant="body1" dangerouslySetInnerHTML={{ __html: descriptionDialog.description }} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDescriptionDialog} color="secondary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Dialog>
  );
};
