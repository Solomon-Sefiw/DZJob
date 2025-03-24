import { useState } from "react";
import { useSelector } from "react-redux";
import { useOutletContext } from "react-router-dom";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Paper,
  Button,
  Typography,
  Chip,
  Tooltip,
  Card,
  CardContent,
  Grid,
} from "@mui/material";
import WorkIcon from "@mui/icons-material/Work";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { RootState } from "../../../../app/store";
import {
  ContractDto,
  useGetContractsByFreelancerQuery,
  useGetContractsCountByFreelancerQuery,
} from "../../../../app/services/DZJobsApi";
import { Pagination } from "../../../../components/Pagination";
import { ContractStatus } from "../../../../app/services/enums";
import { MilestonesDialogDetail } from "../../Milestone/MilestonesDialogDetail";
import { AcceptContractDialog } from "../../ContractWorkflowDialog/AcceptContractDialog";

export const PendingFreelancerContract = () => {
  const user = useSelector((state: RootState) => state.auth);
  const [pagination, setPagination] = useState({ pageNumber: 0, pageSize: 10 });
  const [orderBy, setOrderBy] = useState<keyof ContractDto>("jobTitle");
  const [order, setOrder] = useState<"asc" | "desc">("asc");

  const { data: counts, isLoading: isCountsLoading } = useGetContractsCountByFreelancerQuery({
    freelancerId: user.userId,
  });

  const { data: items, isLoading: isListLoading } = useGetContractsByFreelancerQuery({
    pageNumber: pagination.pageNumber + 1,
    pageSize: pagination.pageSize,
    status: ContractStatus.Pending,
    freelancerId: user.userId,
  });

  const { searchQuery } = useOutletContext<{ searchQuery: string }>();
  const filteredContracts = searchQuery
    ? (items?.items || []).filter((contract) =>
        contract.jobTitle?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : items?.items || [];

  const isLoading = isCountsLoading || isListLoading;
  const showNoMatchingAlert = searchQuery && filteredContracts.length === 0;

  const [openJobDialog, setOpenJobDialog] = useState(false);
  const [selectedJob, setSelectedJob] = useState<ContractDto | null>(null);

  const [selectedContract, setSelectedContract] = useState<number | null>(null);

  const [dialogState, setDialogState] = useState<{ submitContract: boolean; }>({
    submitContract: false,
  });
  const handleCloseClick = (applicantId: number) => {
    setSelectedContract(applicantId);
    setDialogState({ submitContract: true,});
  };
  const handleOpenJobDialog = (job: ContractDto) => {
    setSelectedJob(job);
    setOpenJobDialog(true);
  };

  // const handleCloseDialogs = () => {
  //   setOpenJobDialog(false);
  //   setSelectedJob(null);
  // };
  const handleCloseDialogs = () => {
    setSelectedContract(null);
    setOpenJobDialog(false);
    setDialogState({ submitContract: false });
  };

  const handleSort = (property: keyof ContractDto) => {
    const isAscending = orderBy === property && order === "asc";
    setOrder(isAscending ? "desc" : "asc");
    setOrderBy(property);
  };

  return (
    <Box sx={{ p: 3, backgroundColor: "background.default", minHeight: "10vh" }}>
      {!isLoading && !!counts?.pending && (
        <>
          {/* Desktop view with Table */}
          <TableContainer component={Paper} sx={{ display: { xs: "none", md: "block" } }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <TableSortLabel
                      active={orderBy === "jobTitle"}
                      direction={orderBy === "jobTitle" ? order : "asc"}
                      onClick={() => handleSort("jobTitle")}
                    >
                      Job Title
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>Employer</TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={orderBy === "agreedAmount"}
                      direction={orderBy === "agreedAmount" ? order : "asc"}
                      onClick={() => handleSort("agreedAmount")}
                    >
                      Agreed Amount
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>Start Date</TableCell>
                  <TableCell>End Date</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredContracts.map((job) => (
                  <TableRow key={job.id} hover>
                    <TableCell>
                      <Tooltip title="View Applicants">
                        <Typography
                          variant="subtitle2"
                          color="primary"
                          sx={{ cursor: "pointer", "&:hover": { textDecoration: "underline" } }}
                          onClick={() => handleOpenJobDialog(job)}
                        >
                          <WorkIcon sx={{ mr: 1, verticalAlign: "middle" }} /> {job.jobTitle}
                        </Typography>
                      </Tooltip>
                    </TableCell>
                    <TableCell>{job.employer}</TableCell>
                    <TableCell>
                      <Chip label={`ETB ${job.agreedAmount}`} color="secondary" />
                    </TableCell>
                    <TableCell>
                       {job.startDate}
                    </TableCell>
                    <TableCell>
                        {job.endDate}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={() => handleOpenJobDialog(job)}
                      >
                        View Milestones
                      </Button>
                    </TableCell>
                    <TableCell>
                    <Tooltip title="Submit to Applicant for Approving all milestons and going to Start the contract">
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={() => job.id !== undefined && handleCloseClick(job.id)}
                      >
                        Accept Contract
                      </Button>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Mobile view with Cards */}
          <Grid container spacing={2} sx={{ display: { xs: "block", md: "none" } }}>
            {filteredContracts.map((job) => (
              <Grid item xs={12} key={job.id}>
                <Card sx={{ display: "flex", flexDirection: "column", p: 2 }}>
                  <CardContent>
                    <Typography
                      variant="h6"
                      color="primary"
                      sx={{ cursor: "pointer" }}
                      onClick={() => handleOpenJobDialog(job)}
                    >
                      <WorkIcon sx={{ mr: 1, verticalAlign: "middle" }} />
                      {job.jobTitle}
                    </Typography>
                    <Typography variant="body2">Employer: {job.employer}</Typography>
                    <Typography variant="body2">Agreed Amount: ETB {job.agreedAmount}</Typography>
                    <Typography variant="body2">
                      <CalendarTodayIcon sx={{ mr: 1, verticalAlign: "middle" }} />
                      {job.startDate} - {job.endDate}
                    </Typography>
                  </CardContent>
                  <Box sx={{ p: 2, display: "flex", justifyContent: "flex-end" }}>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={() => handleOpenJobDialog(job)}
                    >
                      View Milestones
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </>
      )}

      {showNoMatchingAlert && (
        <Typography variant="body2" color="textSecondary" sx={{ mt: 2, textAlign: "center" }}>
          No matching contracts found for "{searchQuery}"
        </Typography>
      )}

      {/* Pagination */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
        <Pagination
          pageNumber={pagination.pageNumber}
          pageSize={pagination.pageSize}
          onChange={setPagination}
          totalRowsCount={counts?.pending}
          rowsPerPageOptions={[10, 20, 50]}
        />
      </Box>

      {/* Job Details Dialog */}
      {openJobDialog && selectedJob && (
        <MilestonesDialogDetail
          open={openJobDialog}
          onClose={handleCloseDialogs}
          contract={selectedJob}
          approvalStatus={ContractStatus.Draft}
        />
      )}
            {selectedContract && (
              <>
                <AcceptContractDialog open={dialogState.submitContract} onClose={handleCloseDialogs} contractId={selectedContract}  />
                {/* <ClosingDialog open={dialogState.closingOpen} onClose={handleCloseDialog} applicantId={selectedApplicant} jobId={job?.id || 0} />
                <RejectDialog open={dialogState.rejectingOpen} onClose={handleCloseDialog} applicantId={selectedApplicant} jobId={job?.id || 0} /> */}
              </>
            )}
    </Box>
  );
};
