import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import WorkIcon from "@mui/icons-material/Work";
import { Alert, Box, Button, Grid, Link, Typography, Divider, useTheme, Chip } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useOutletContext } from "react-router-dom";
import { RootState } from "../../../app/store";
import { JobDto, useGetAllOpenJobByStatusQuery } from "../../../app/services/DZJobsApi";
import { Pagination } from "../../../components/Pagination";
import { JobDetailsDialog } from "../../Job/JobDetailsDialog";
import { ApplayforJobDialog } from "../ApplayforJobDialog";

export const OpenJobsForApplication = () => {
  const user = useSelector((state: RootState) => state.auth);
  const [pagination, setPagination] = useState({ pageNumber: 0, pageSize: 10 });
  const { data: items, isLoading: isListLoading } = useGetAllOpenJobByStatusQuery({
    pageNumber: pagination.pageNumber + 1,
    pageSize: pagination.pageSize,
    status: 1,
  });
  const { searchQuery } = useOutletContext<{ searchQuery: string }>();

  const filteredJobRoles = searchQuery
    ? (items?.items || []).filter((option) =>
        option.title?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : items?.items || [];

  const [openJobDetailsDialog, setOpenJobDetailsDialog] = useState(false);
  const [selectedJobDetails, setSelectedJobDetails] = useState<JobDto | null>(null);
  const [expandedJobId, setExpandedJobId] = useState<number | null>(null);
  const theme = useTheme();
  const showNoMatchingAlert = searchQuery && filteredJobRoles.length === 0;
  const [dialogOpened, setDialogOpened] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleOpenJobDetailsDialog = (job: JobDto) => {
    setSelectedJobDetails(job);
    setOpenJobDetailsDialog(true);
  };

  const handleCloseDialogs = () => {
    setOpenJobDetailsDialog(false);
    setSelectedJobDetails(null);
  };

  return (
    <Box sx={{ p: 2, backgroundColor: theme.palette.background.default, minHeight: "10vh" }} onClick={() => setExpandedJobId(null)}>
      {!isListLoading && !!items?.totalCount && (
        <Grid container spacing={2}>
          {filteredJobRoles?.map((job) => {
            const isExpanded = expandedJobId === job.id;
            return (
              <Grid item xs={12} sm={6} md={4} key={job.id}>
                <Box
                  sx={{
                    p: 2,
                    backgroundColor: theme.palette.mode === 'dark' ? '#2c2c2c' : 'white',
                    borderRadius: 2,
                    boxShadow: 2,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    height: "100%", // Ensure the card has a fixed height
                    transition: "all 0.3s ease-in-out",
                    "&:hover": { boxShadow: 4, backgroundColor: theme.palette.mode === 'dark' ? '#444' : '#f9f9f9' },
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    sx={{ cursor: "pointer", color: theme.palette.primary.main }}
                    onClick={() => handleOpenJobDetailsDialog(job)}
                  >
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
                      WebkitLineClamp: isExpanded ? "unset" : 3,
                      WebkitBoxOrient: "vertical",
                      transition: "max-height 0.3s ease-in-out",
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

                  <Box display="flex" gap={1} flexWrap="wrap" mt={1}>
                    <Chip label={job.jobCategory} color="secondary" size="small" />
                    <Chip label={job.jobType} color="primary" size="small" />
                    <Typography variant="body2" sx={{ display: "flex", alignItems: "center" }}>
                      <MonetizationOnIcon sx={{ mr: 0.5 }} /> ${job.salary}
                    </Typography>
                    <Typography variant="body2" sx={{ display: "flex", alignItems: "center" }}>
                      <CalendarTodayIcon sx={{ mr: 0.5 }} /> Posted on {job.postedDate}
                    </Typography>
                  </Box>

                  <Button
                    variant="contained"
                    fullWidth
                    sx={{
                      mt: 2,
                      fontWeight: "bold",
                      backgroundColor: "#0073b1",
                      fontSize: "0.85rem",
                      padding: "6px 0",
                      textTransform: "none", // Prevents text from being capitalized
                    }}
                    onClick={() => {
                      if (job.id !== undefined) {
                        setSelectedId(job.id);
                      }
                      setDialogOpened(true);
                    }}
                  >
                    Apply Now
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

      <Divider sx={{ my: 1 }} />

      <Box sx={{ display: "flex", justifyContent: "center", width: "100%", mt: 1 }}>
        <Pagination
          pageNumber={pagination.pageNumber}
          pageSize={pagination.pageSize}
          onChange={setPagination}
          totalRowsCount={items?.totalCount}
          rowsPerPageOptions={[10, 20, 50]}
        />
      </Box>

      {openJobDetailsDialog && <JobDetailsDialog open={openJobDetailsDialog} onClose={handleCloseDialogs} job={selectedJobDetails} />}
      {dialogOpened && <ApplayforJobDialog onClose={() => { setDialogOpened(false); window.location.reload(); }} freelancerId={user.userId} jobId={selectedId} />}
    </Box>
  );
};
