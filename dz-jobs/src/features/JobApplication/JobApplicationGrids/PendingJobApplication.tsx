import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import WorkIcon from "@mui/icons-material/Work";
import { 
  Box, Grid, Typography, Divider, useTheme, Alert, Dialog, DialogContent, 
  DialogTitle, IconButton, Link, 
  Chip
} from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useOutletContext } from "react-router-dom";
import { RootState } from "../../../app/store";
import { ApplicationStatus } from "../../../app/services/enums";
import { Pagination } from "../../../components/Pagination";
import { 
  useGetAllJobApplicationByStatusQuery, 
  useGetJobApplicationCountByStatusQuery 
} from "../../../app/services/DZJobsApi";
import CloseIcon from "@mui/icons-material/Close";

export const PendingJobApplication = () => {
  const user = useSelector((state: RootState) => state.auth);
  const [pagination, setPagination] = useState<{ pageNumber: number; pageSize?: number }>({
    pageNumber: 0,
    pageSize: 10,
  });

  const [openCoverLetterDialog, setOpenCoverLetterDialog] = useState<boolean>(false);
  const [selectedCoverLetter, setSelectedCoverLetter] = useState<string | null>(null);

  const { data: counts, isLoading: isCountsLoading } = useGetJobApplicationCountByStatusQuery({
    freelancerId: user.userId,
  });

  const { data: items, isLoading: isListLoading } = useGetAllJobApplicationByStatusQuery({
    pageNumber: pagination.pageNumber + 1,
    pageSize: pagination.pageSize,
    status: ApplicationStatus.Pending,
    freelancerId: user.userId,
  });

  const { searchQuery } = useOutletContext<{ searchQuery: string }>();
  const filteredJobRoles = searchQuery
    ? (items?.items || []).filter((option) =>
        option.job?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : items?.items || [];

  const showNoMatchingAlert = searchQuery && filteredJobRoles.length === 0;
  const isLoading = isCountsLoading || isListLoading;

  const theme = useTheme();

  const handleDialogOpen = (coverLetter: string) => {
    setSelectedCoverLetter(coverLetter);
    setOpenCoverLetterDialog(true);
  };

  const handleDialogClose = () => {
    setOpenCoverLetterDialog(false);
    setSelectedCoverLetter(null);
  };

  // Function to truncate the cover letter to a certain length

  return (
    <Box sx={{ p: 0, backgroundColor: theme.palette.background.default, minHeight: "10vh" }}>
      {!isLoading && !!counts?.pending && (
        <Grid container spacing={2}>
          {filteredJobRoles?.map((application) => (
            <Grid item xs={12} sm={6} md={4} key={application.id}>
            <Box
              sx={{
                p: 2,
                backgroundColor: theme.palette.mode === "dark" ? "#2c2c2c" : "white",
                borderRadius: 2,
                boxShadow: 2,
                transition: "all 0.3s ease-in-out",
                "&:hover": {
                  boxShadow: 4,
                  backgroundColor: theme.palette.mode === "dark" ? "#444" : "#f9f9f9",
                },
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography
                variant="h6"
                fontWeight="bold"
                sx={{ cursor: "pointer", color: theme.palette.primary.main }}
              
              >
                <WorkIcon sx={{ mr: 1 }} /> {application.job}
              </Typography>

              <Typography
                variant="body2"
                color="textSecondary"
                sx={{
                  flexGrow: 1,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: 5,
                  WebkitBoxOrient: "vertical",
                }}
                dangerouslySetInnerHTML={{ __html: application.coverLetter || "No Cover Letter available" }}
              />

                 {application.coverLetter && (
                  <Link
                    onClick={() => handleDialogOpen(application.coverLetter || "")}
                    sx={{
                      fontSize: "0.875rem",
                      textDecoration: "underline",
                      color: theme.palette.primary.main,
                      cursor: "pointer",
                      mt: 0, // Remove extra spacing before "More"
                    }}
                  >
                    More
                  </Link>
                )}

              <Box display="flex" gap={1} flexWrap="wrap" mt={1}>
                <Chip label={application.proposedSalary + " ETB"  || "Unknown"} color="secondary" size="small" />
              </Box>
              <Box display="flex" gap={1} flexWrap="wrap" mt={1}>
              <Typography variant="body2" sx={{ display: "flex", alignItems: "center" }}>
                  <CalendarTodayIcon sx={{ mr: 0.5 }} /> Posted on {application.createdAt}
                </Typography>
                <Typography variant="body2" sx={{ display: "flex", alignItems: "center" }}>
                  <CalendarTodayIcon sx={{ mr: 0.5 }} /> Posted on {application.appliedDate}
                </Typography>
              </Box>
              

              
            </Box>
          </Grid>
          ))}
        </Grid>
      )}

      {showNoMatchingAlert && (
        <Alert severity="info" sx={{ m: 2 }}>
          No Approved Job Role found with name {searchQuery}!!
        </Alert>
      )}

      <Divider sx={{ my: 1 }} />

      <Box sx={{ display: "flex", justifyContent: "flex-end", width: "100%", mt: 1 }}>
        <Pagination
          pageNumber={pagination.pageNumber}
          pageSize={pagination.pageSize}
          onChange={setPagination}
          totalRowsCount={counts?.pending}
          rowsPerPageOptions={[10, 20, 50]}
        />
      </Box>

      {/* Cover Letter Dialog */}
      <Dialog open={openCoverLetterDialog} onClose={handleDialogClose} maxWidth="md" fullWidth>
        <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          Application Cover Letter
          <IconButton onClick={handleDialogClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            <div dangerouslySetInnerHTML={{ __html: selectedCoverLetter || "" }} />
          </Typography>
        </DialogContent>
      </Dialog>
    </Box>
  );
};
