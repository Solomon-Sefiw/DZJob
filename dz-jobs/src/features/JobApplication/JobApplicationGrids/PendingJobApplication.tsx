import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import WorkIcon from "@mui/icons-material/Work";
import { Box, Button, Grid, Typography, Divider, useTheme, Alert, Dialog, DialogContent, DialogTitle, IconButton, Link } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useOutletContext } from "react-router-dom";
import { RootState } from "../../../app/store";
import { ApplicationStatus } from "../../../app/services/enums";
import { Pagination } from "../../../components/Pagination";
import { useGetAllJobApplicationByStatusQuery, useGetJobApplicationCountByStatusQuery } from "../../../app/services/DZJobsApi";
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
  const truncateCoverLetter = (text: string, maxLength: number = 150) => {
    if (!text) return "";
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  return (
    <Box sx={{ p: 2, backgroundColor: theme.palette.background.default, minHeight: "10vh" }}>
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
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  height: "100%", // Make sure it takes equal height for all cards
                  minHeight: 350, // Set a minimum height to make sure they are consistent
                  transition: "all 0.3s ease-in-out",
                  "&:hover": {
                    boxShadow: 4,
                    backgroundColor: theme.palette.mode === "dark" ? "#444" : "#f9f9f9",
                  },
                }}
              >
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    color: theme.palette.primary.main,
                    cursor: "pointer",
                    flexGrow: 0, // Ensures title doesn't take up too much space
                  }}
                >
                  <WorkIcon /> {application.job}
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    mt: 1.5,
                    flexGrow: 0, // Prevent this from growing too large and distorting height
                    overflow: "hidden", // Ensures text doesn't overflow beyond the card
                  }}
                >
                  <div dangerouslySetInnerHTML={{ __html: truncateCoverLetter(application.coverLetter || "") }} />
                </Typography>

                {/* More Link for Cover Letter */}
                {application.coverLetter && (
                  <Link
                    onClick={() => handleDialogOpen(application.coverLetter || "")}
                    sx={{
                      mt: 1,
                      fontSize: "0.875rem",
                      textDecoration: "underline",
                      color: theme.palette.primary.main,
                      cursor: "pointer",
                    }}
                  >
                    More
                  </Link>
                )}

                <Typography variant="body1" sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                  <MonetizationOnIcon sx={{ mr: 1 }} /> ${application.proposedSalary}
                </Typography>

                <Typography variant="body2" sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                  <CalendarTodayIcon sx={{ mr: 1 }} /> Posted on {application.createdAt}
                </Typography>

                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    mt: 1.5, 
                    backgroundColor: "#0073b1",
                    fontWeight: "bold",
                    fontSize: "0.85rem",
                    padding: "6px 0",
                  }}
                >
                  Apply Now
                </Button>
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

      <Box sx={{ display: "flex", justifyContent: "center", width: "100%", mt: 1 }}>
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
