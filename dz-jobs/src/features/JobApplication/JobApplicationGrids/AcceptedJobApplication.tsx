import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import WorkIcon from "@mui/icons-material/Work";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
  Typography,
  useTheme,
  Modal,
} from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useOutletContext } from "react-router-dom";
import { RootState } from "../../../app/store";
import {
  useGetAllJobApplicationByStatusQuery,
  useGetJobApplicationCountByStatusQuery,
} from "../../../app/services/DZJobsApi";
import { ApplicationStatus } from "../../../app/services/enums";
import { Pagination } from "../../../components/Pagination";

export const AcceptedJobApplication = () => {
     const navigate = useNavigate();
  const theme = useTheme();
  const user = useSelector((state: RootState) => state.auth);
  const [selectedCoverLetter, setSelectedCoverLetter] = useState<string | null>(null);
  const [pagination, setPagination] = useState({ pageNumber: 0, pageSize: 10 });

  const { data: counts, isLoading: isCountsLoading } =
    useGetJobApplicationCountByStatusQuery({ freelancerId: user.userId });

  const { data: items, isLoading: isListLoading } =
    useGetAllJobApplicationByStatusQuery({
      pageNumber: pagination.pageNumber + 1,
      pageSize: pagination.pageSize,
      status: ApplicationStatus.Accepted,
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

  // Truncate text for cover letter preview
  const truncateText = (text: string, limit: number) => {
    return text.length > limit ? text.substring(0, limit) + "..." : text;
  };

  const goToChat = (jobId : number ,senderId : string, receiverId: string | undefined) => {
    
    navigate(`/chat/${jobId}/${senderId}/${receiverId}`);
  };

  return (
    <Box sx={{ p: 3, backgroundColor: theme.palette.background.default, minHeight: "100vh" }}>
      {!isLoading && counts?.accepted ? (
        <Grid container spacing={3} justifyContent="center">
          {filteredJobRoles.map((application) => (
            <Grid item xs={12} sm={6} md={4} key={application.id}>
              <Card
                sx={{
                  background: theme.palette.mode === "dark" ? "#333" : theme.palette.background.paper, // Light black in dark mode
                  boxShadow: 3,
                  borderRadius: 2,
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  minHeight: 250,
                }}
              >
                <CardContent>
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    sx={{ display: "flex", alignItems: "center", gap: 1 }}
                  >
                    <WorkIcon sx={{ color: theme.palette.primary.main }} /> {application.job}
                  </Typography>

                  {/* Cover Letter with "Read More" */}
                  <Box mt={1}>
                    <Typography
                      variant="body2"
                      sx={{ display: "inline", fontSize: "0.9rem", color: "text.secondary" }}
                      dangerouslySetInnerHTML={{ __html: truncateText(application.coverLetter || "", 60)}}
                    />
                      
                      
                    {application.coverLetter && application.coverLetter.length > 60 && (
                      <Typography
                        component="span"
                        sx={{
                          color: theme.palette.primary.main,
                          cursor: "pointer",
                          textDecoration: "underline",
                          fontSize: "0.85rem",
                          ml: 1,
                        }}
                        onClick={() => setSelectedCoverLetter(application.coverLetter ?? null)}
                      >
                        Read More
                      </Typography>
                    )}
                  </Box>

                  {/* Freelancer Name */}
                  <Chip
                    label={application.freelancer}
                    color="primary"
                    sx={{ mt: 1, fontSize: "0.8rem" }}
                  />

                  {/* Job Details */}
                  <Typography variant="body2" sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                    <LocationOnIcon sx={{ mr: 1, fontSize: 18, color: "text.secondary" }} />
                    {application.appliedDate}
                  </Typography>

                  <Typography variant="body2" sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                    <MonetizationOnIcon sx={{ mr: 1, fontSize: 18, color: "text.secondary" }} />
                    ${application.proposedSalary}
                  </Typography>

                  <Typography variant="body2" sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                    <CalendarTodayIcon sx={{ mr: 1, fontSize: 18, color: "text.secondary" }} />
                    Posted on {application.createdAt}
                  </Typography>
                </CardContent>

                {/* Apply Now Button */}
                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    mt: 2,
                    backgroundColor: theme.palette.primary.main,
                    color: "white",
                    fontWeight: "bold",
                  }}
                  onClick={() => application?.jobId && application.freelancer && application.freelancerId && goToChat(application.jobId, application.freelancerId, application.employerId ?? undefined)}

                >
                  Message
                </Button>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="h6" sx={{ textAlign: "center", mt: 5 }}>
          {isLoading ? "Loading..." : "No Accepted Applications Found"}
        </Typography>
      )}

      {showNoMatchingAlert && (
        <Alert severity="info" sx={{ m: 2 }}>
          No Approved Job Role found with name "{searchQuery}"!
        </Alert>
      )}

      <Pagination
        pageNumber={pagination.pageNumber}
        pageSize={pagination.pageSize}
        onChange={setPagination}
        totalRowsCount={counts?.accepted}
        rowsPerPageOptions={[10, 20, 50]}
      />

      {/* Cover Letter Modal */}
      <Modal open={!!selectedCoverLetter} onClose={() => setSelectedCoverLetter(null)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "90%",
            maxWidth: 500,
            bgcolor: theme.palette.background.paper,
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            maxHeight: "80vh",
            overflowY: "auto",
          }}
        >
          <Typography variant="h6" fontWeight="bold">
            Cover Letter
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            {selectedCoverLetter}
          </Typography>
          <Button
            onClick={() => setSelectedCoverLetter(null)}
            sx={{
              mt: 3,
              width: "100%",
              color: "white",
              backgroundColor: theme.palette.primary.main,
            }}
          >
            Close
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};
