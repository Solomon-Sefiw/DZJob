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
import { ContractStatus, MilestoneStatus } from "../../../app/services/enums";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { MilestonesDialog } from "./MilestonesDialog";

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
    { contractId: contract?.id ?? 0 },
    { skip: !contract }
  );

  // State for opening milestone dialog (Add / Update)
  const [milestoneDialog, setMilestoneDialog] = useState<{
    open: boolean;
    milestone: MilestoneDto | null;
  }>({ open: false, milestone: null });

  // State for opening description dialog
  const [descriptionDialog, setDescriptionDialog] = useState<{
    open: boolean;
    description: string;
  }>({ open: false, description: "" });

  const [approving, setApproving] = useState(false);

  // Open dialog for editing an existing milestone
  const handleMilestoneClick = (milestone: MilestoneDto) => {
    setMilestoneDialog({ open: true, milestone });
  };

  // Open dialog for adding a new milestone
  const handleAddMilestone = () => {
    setMilestoneDialog({ open: true, milestone: null });
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
  const handleApproveMilestone = async (milestoneId: number) => {
    try {
      setApproving(true);
      // Call API to approve milestone
      // await approveMilestone({ milestoneId }).unwrap();
    } catch (error) {
      console.error("Approval failed:", error);
    } finally {
      setApproving(false);
    }
  };

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
        <Button variant="contained" color="primary" sx={{ mb: 2 }} onClick={handleAddMilestone}>
          Add Milestone
        </Button>

        {isLoading ? (
          <Typography>Loading milestones...</Typography>
        ) : milestonesData?.items?.length ? (
          <Grid container spacing={3} sx={{ mt: 2 }}>
            {milestonesData.items.map((milestone) => (
              <Grid item xs={12} md={6} key={milestone.id}>
                <Card variant="outlined" sx={{ display: "flex", flexDirection: "column", height: "100%", padding: 3 }}>
                  <CardContent sx={{ flex: "1 1 auto" }}>
                    <Typography
                      variant="h6"
                      sx={{ cursor: "pointer", color: "primary.main", "&:hover": { textDecoration: "underline" } }}
                      onClick={() => handleMilestoneClick(milestone)}
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
                      Payment: <strong>${milestone.amount}</strong>  <Chip sx={{float:"right"}} label={`${milestone.status && MilestoneStatus[milestone.status]}`} color="secondary" />
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ justifyContent: "center", padding: 2 }}>
                    {approvalStatus === ContractStatus.Pending && (
                      <Button
                        fullWidth
                        variant="contained"
                        color="success"
                        disabled={approving}
                        onClick={() => milestone.id !== undefined && handleApproveMilestone(milestone.id)}
                      >
                        {approving ? "Approving..." : "Approve Milestone"}
                      </Button>
                    )}
                    <Button fullWidth variant="outlined" color="primary" onClick={() => handleMilestoneClick(milestone)}>
                      Update Milestone
                    </Button>
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
      {milestoneDialog.open && milestoneDialog.milestone && (
        <MilestonesDialog
          onClose={handleCloseMilestoneDialog}
          contractId={contract?.id ?? 0}
          milestone={milestoneDialog.milestone}
        />
      ) 
      }
    { milestoneDialog.open && !milestoneDialog.milestone && (
        <MilestonesDialog
          onClose={handleCloseMilestoneDialog}
          contractId={contract?.id ?? 0}
        />
      ) 
    }

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
