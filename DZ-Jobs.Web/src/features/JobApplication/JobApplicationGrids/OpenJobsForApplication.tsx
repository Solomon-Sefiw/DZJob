import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
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
} from "@mui/material";
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
  const [expandedJobId, setExpandedJobId] = useState<number | null>(null);

  const handleExpand = (jobId: number) => {
    setExpandedJobId(expandedJobId === jobId ? null : jobId);
  };

  return (
    <Box sx={{ p: 5, backgroundColor: "#f4f4f4", minHeight: "10vh" }}>
      {!isListLoading && !!items?.totalCount && (
        <Grid container spacing={4} justifyContent="center">
          {filteredJobRoles.map((job) => (
            <Grid item xs={12} sm={6} md={4} key={job.id}>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Card
                  sx={{
                    background: "linear-gradient(to right,rgb(246, 241, 252),rgb(210, 215, 223))",
                    boxShadow: 5,
                    borderRadius: 3,
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    minHeight: "300px",
                  }}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h5" fontWeight="bold" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <WorkIcon /> {job.title}
                    </Typography>
                    <Box mt={1}>
                      <Chip label={job.jobCategory} color="secondary" sx={{ mr: 1, fontSize: "0.9rem" }} />
                      <Chip label={job.jobType} color="primary" sx={{ fontSize: "0.9rem" }} />
                    </Box>

                    {/* Job Description with Expand/Collapse */}
                    <Typography
                      variant="body1"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        mt: 2,
                        maxHeight: expandedJobId === job.id ? "none" : "50px",
                        overflow: expandedJobId === job.id ? "visible" : "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: expandedJobId === job.id ? "normal" : "nowrap",
                        transition: "max-height 0.3s ease-in-out",
                      }}
                    >
                      <div dangerouslySetInnerHTML={{ __html: job.description || "" }} />
                    </Typography>

                    {(job.description?.length ?? 0) > 100 && (
                      <Button
                        variant="text"
                        sx={{  textTransform: "none" }}
                        onClick={() => job.id !== undefined && handleExpand(job.id)}
                      >
                        {expandedJobId === job.id ? "Less" : "More"}
                      </Button>
                    )}

                    <Typography variant="body1" sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                      <MonetizationOnIcon sx={{ mr: 1 }} /> ${job.salary}
                    </Typography>

                    <Typography variant="body2" sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                      <CalendarTodayIcon sx={{ mr: 1 }} /> Posted on {job.postedDate}
                    </Typography>
                  </CardContent>

                  <Button
                    variant="contained"
                    sx={{
                      m: 2,
                      backgroundColor: "#fff",
                      color: "#6a11cb",
                      fontWeight: "bold",
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
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      )}

      {showNoMatchingAlert && (
        <Alert severity="info" sx={{ m: 2 }}>
          No Approved Job Role found with name {searchQuery}!!
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
