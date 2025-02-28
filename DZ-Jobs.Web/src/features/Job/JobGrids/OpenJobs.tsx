import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import WorkIcon from "@mui/icons-material/Work";
import { Alert, Box, Button, Grid, Link, Typography } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useOutletContext } from "react-router-dom";
import { JobDto, useGetAllJobByStatusQuery, useGetJobCountByStatusQuery } from "../../../app/api";
import { RootState } from "../../../app/store";
import { Pagination } from "../../../components/Pagination";
import { JobDialog } from "../JobDialog";

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

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedJob, setSelectedJob] = useState<JobDto | undefined>(undefined);
  const [expandedJobId, setExpandedJobId] = useState<number | null>(null);

  const handleOpenDialog = (job: JobDto) => {
    setSelectedJob(job);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedJob(undefined);
  };

  const handleExpandToggle = (jobId: number) => {
    setExpandedJobId((prev) => (prev === jobId ? null : jobId));
  };

  return (
    <Box sx={{ p: 3, backgroundColor: "#f4f4f4", minHeight: "10vh" }} onClick={() => setExpandedJobId(null)}>
      {!isLoading && !!counts?.open && (
        <Grid container spacing={3} sx={{ alignItems: "stretch" }}>
          {filteredJobRoles?.map((job) => {
            const isExpanded = expandedJobId === job.id;
            return (
              <Grid item xs={12} sm={6} md={6} lg={4} key={job.id}>
                <Box
                  sx={{
                    p: 3,
                    backgroundColor: "white",
                    borderRadius: 2,
                    boxShadow: 2,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    height: "100%",
                    position: "relative",
                    "&:hover": { boxShadow: 4 },
                  }}
                  onClick={(e) => e.stopPropagation()} // Prevents collapse when clicking inside
                >
                  <Typography variant="h6" fontWeight="bold">
                    <WorkIcon sx={{ mr: 1 }} /> {job.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{
                      flexGrow: 1,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: isExpanded ? "unset" : 3, // Expand or limit lines
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
                        if (job.id !== undefined) handleExpandToggle(job.id);
                      }}
                    >
                      More
                    </Link>
                  )}
                  <Typography variant="body2">
                    <MonetizationOnIcon sx={{ mr: 1 }} /> ${job.salary}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    <CalendarTodayIcon sx={{ mr: 1 }} /> Posted on {job.postedDate}
                  </Typography>
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
                    onClick={() => handleOpenDialog(job)}
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

      {/* Pagination now properly separated */}
      <Box sx={{ mt: 5, display: "flex", justifyContent: "center", width: "100%" }}>
        <Pagination
          pageNumber={pagination.pageNumber}
          pageSize={pagination.pageSize}
          onChange={setPagination}
          totalRowsCount={counts?.open}
          rowsPerPageOptions={[10, 20, 50]}
        />
      </Box>

      {openDialog && (
        <JobDialog onClose={handleCloseDialog} employerId={user.userId} job={selectedJob} title="Update Job" />
      )}
    </Box>
  );
};
