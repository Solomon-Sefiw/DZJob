import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import WorkIcon from "@mui/icons-material/Work";
import { Alert, Box, Button, Chip, Grid, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useOutletContext } from "react-router-dom";
import { useGetAllOpenJobByStatusQuery } from "../../../app/api";
import { RootState } from "../../../app/store";
import { Pagination } from "../../../components/Pagination";
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

  const showNoMatchingAlert = searchQuery && filteredJobRoles.length === 0;
  const [dialogOpened, setDialogOpened] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  return (
    <Box sx={{ p: 5, backgroundColor: "#fff", minHeight: "100vh", maxWidth: "900px", mx: "auto" }}>
      {!isListLoading && !!items?.totalCount && (
        <Grid container spacing={4} direction="column">
          {filteredJobRoles.map((job) => (
            <Grid item xs={12} key={job.id}>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Box
                  sx={{
                    background: "#fff",
                    boxShadow: 3,
                    borderRadius: 2,
                    p: 3,
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    border: "1px solid #ddd",
                  }}
                >
                  {/* Job Title */}
                  <Typography variant="h5" fontWeight="bold" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <WorkIcon color="primary" /> {job.title}
                  </Typography>

                  {/* Job Description */}
                  <Typography
                    variant="body1"
                    sx={{
                      mt: 1,
                      color: "#555",
                      fontSize: "1rem",
                      lineHeight: 1.5,
                      textAlign: "justify",
                    }}
                    dangerouslySetInnerHTML={{ __html: job.description || "" }}
                  />

                  {/* Job Details */}
                  <Box display="flex" gap={2} flexWrap="wrap" mt={2}>
                    <Chip label={job.jobCategory} color="secondary" />
                    <Chip label={job.jobType} color="primary" />
                    <Typography variant="body1" sx={{ display: "flex", alignItems: "center" }}>
                      <MonetizationOnIcon sx={{ mr: 1 }} /> ${job.salary}
                    </Typography>
                    <Typography variant="body2" sx={{ display: "flex", alignItems: "center" }}>
                      <CalendarTodayIcon sx={{ mr: 1 }} /> Posted on {job.postedDate}
                    </Typography>
                  </Box>

                  {/* Apply Button */}
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{ mt: 2, fontWeight: "bold", backgroundColor: "#0073b1" }}
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
              </motion.div>
            </Grid>
          ))}
        </Grid>
      )}

      {showNoMatchingAlert && (
        <Alert severity="info" sx={{ mt: 3 }}>
          No Approved Job Role found with name &quot;{searchQuery}&quot;!!
        </Alert>
      )}

      {dialogOpened && (
        <ApplayforJobDialog
          onClose={() => {
            setDialogOpened(false);
            window.location.reload();
          }}
          freelancerId={user.userId}
          jobId={selectedId}
        />
      )}

      <Pagination
        pageNumber={pagination.pageNumber}
        pageSize={pagination.pageSize}
        onChange={setPagination}
        totalRowsCount={items?.totalCount}
        rowsPerPageOptions={[10, 20, 50]}
      />
    </Box>
  );
};
