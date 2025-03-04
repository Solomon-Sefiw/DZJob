import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import WorkIcon from "@mui/icons-material/Work";
import { Alert, Box, Button, Grid, Link, Typography, Divider, useTheme } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useOutletContext } from "react-router-dom";
import { RootState } from "../../../app/store";
import { JobApplicantDetailsDialog } from "../JobApplicantDetailsDialog";
import { JobDetailsDialog } from "../JobDetailsDialog";
import { JobDialog } from "../JobDialog";
import { JobDto, useGetAllJobByStatusQuery, useGetJobCountByStatusQuery } from "../../../app/services/DZJobsApi";
import { Pagination } from "../../../components/Pagination";

export const OpenJobs = () => {
  const user = useSelector((state: RootState) => state.auth);
  const [pagination, setPagination] = useState({ pageNumber: 0, pageSize: 10 });

  const { data: counts, isLoading: isCountsLoading } = useGetJobCountByStatusQuery({ employerId: user.userId });
  const { data: items, isLoading: isListLoading } = useGetAllJobByStatusQuery({
    pageNumber: pagination.pageNumber + 1,
    pageSize: pagination.pageSize,
    status: 1,
    employerId: user.userId,
  });

  const { searchQuery } = useOutletContext<{ searchQuery: string }>();
  const filteredJobRoles = searchQuery
    ? (items?.items || []).filter((option) => option.title?.toLowerCase().includes(searchQuery.toLowerCase()))
    : items?.items || [];
  const showNoMatchingAlert = searchQuery && filteredJobRoles.length === 0;
  const isLoading = isCountsLoading || isListLoading;

  const [openJobApplicantDialog, setOpenJobApplicantDialog] = useState(false);
  const [selectedJobApplicant, setSelectedJobApplicant] = useState<JobDto | null>(null);

  const [openJobDetailsDialog, setOpenJobDetailsDialog] = useState(false);
  const [selectedJobDetails, setSelectedJobDetails] = useState<JobDto | null>(null);

  const [openJobDialog, setOpenJobDialog] = useState(false);
  const [selectedJob, setSelectedJob] = useState<JobDto | null>(null);

  const [expandedJobId, setExpandedJobId] = useState<number | null>(null);

  const theme = useTheme(); // Access the current theme

  const handleOpenJobApplicantDialog = (job: JobDto) => {
    setSelectedJobApplicant(job);
    setOpenJobApplicantDialog(true);
  };

  const handleOpenJobDetailsDialog = (job: JobDto) => {
    setSelectedJobDetails(job);
    setOpenJobDetailsDialog(true);
  };

  const handleOpenJobDialog = (job: JobDto) => {
    setSelectedJob(job);
    setOpenJobDialog(true);
  };

  const handleCloseDialogs = () => {
    setOpenJobApplicantDialog(false);
    setOpenJobDetailsDialog(false);
    setOpenJobDialog(false);
    setSelectedJobApplicant(null);
    setSelectedJobDetails(null);
    setSelectedJob(null);
  };

  return (
    <Box sx={{ p: 3, backgroundColor: theme.palette.background.default, minHeight: "10vh" }} onClick={() => setExpandedJobId(null)}>
      {!isLoading && !!counts?.open && (
        <Grid container spacing={3} sx={{ alignItems: "stretch" }}>
          {filteredJobRoles?.map((job) => {
            const isExpanded = expandedJobId === job.id;
            return (
              <Grid item xs={12} sm={6} md={6} lg={4} key={job.id}>
                <Box
                  sx={{
                    p: 3,
                    backgroundColor: theme.palette.mode === 'dark' ? '#2c2c2c' : 'white', // Bright dark for card background in dark mode
                    borderRadius: 2,
                    boxShadow: 2,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    height: "100%",
                    position: "relative",
                    "&:hover": { boxShadow: 4, backgroundColor: theme.palette.mode === 'dark' ? '#444' : '#f9f9f9' }, // Hover effect
                  }}
                  onClick={(e) => e.stopPropagation()} // Prevents collapse when clicking inside
                >
                  {/* Click on Title → Open JobApplicantDetailsDialog */}
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    sx={{ cursor: "pointer", color: theme.palette.primary.main, "&:hover": { textDecoration: "underline" } }}
                    onClick={() => handleOpenJobApplicantDialog(job)}
                  >
                    <WorkIcon sx={{ mr: 1 }} /> {job.title}
                  </Typography>

                  {/* Job Description with "More" Link */}
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{
                      flexGrow: 1,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: isExpanded ? "unset" : 3,
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    <div dangerouslySetInnerHTML={{ __html: job.description || "" }} />
                  </Typography>
                  {!isExpanded && job.description && job.description.length > 150 && (
                    <Link
                      href="#"
                      sx={{ fontSize: "0.9rem", mt: 1, display: "block" }}
                      onClick={(e) => {
                        e.preventDefault();
                        handleOpenJobDetailsDialog(job);
                      }}
                    >
                      More
                    </Link>
                  )}

                  {/* Salary & Posted Date */}
                  <Typography variant="body2">
                    <MonetizationOnIcon sx={{ mr: 1 }} /> ${job.salary}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    <CalendarTodayIcon sx={{ mr: 1 }} /> Posted on {job.postedDate}
                  </Typography>

                  {/* Update Button */}
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{
                      mt: 2,
                      alignSelf: "center",
                      width: "100%",
                      transition: "0.3s",
                      "&:hover": { backgroundColor: "#1976d2" },
                    }}
                    onClick={() => handleOpenJobDialog(job)}
                  >
                    Update
                  </Button>
                </Box>
              </Grid>
            );
          })}
        </Grid>
      )}

      {showNoMatchingAlert && (
        <Alert severity="info" sx={{ m: 2 }}>
          No Approved Job Role found with name {searchQuery}!!
        </Alert>
      )}

      {/* Horizontal Divider */}
      <Divider sx={{ my: 1 }} /> {/* Divider with smaller vertical margins */}

      {/* Pagination */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", width: "100%", mt: 0.5 }}>
        <Pagination
          pageNumber={pagination.pageNumber}
          pageSize={pagination.pageSize}
          onChange={setPagination}
          totalRowsCount={counts?.open}
          rowsPerPageOptions={[10, 20, 50]}
        />
      </Box>

      {/* Job Dialogs */}
      {openJobApplicantDialog && (
        <JobApplicantDetailsDialog open={openJobApplicantDialog} onClose={handleCloseDialogs} job={selectedJobApplicant} />
      )}
      {openJobDetailsDialog && (
        <JobDetailsDialog open={openJobDetailsDialog} onClose={handleCloseDialogs} job={selectedJobDetails} />
      )}
      {openJobDialog && (
        <JobDialog onClose={handleCloseDialogs} employerId={user.userId} job={selectedJob} title="Update Job" />
      )}
    </Box>
  );
};
