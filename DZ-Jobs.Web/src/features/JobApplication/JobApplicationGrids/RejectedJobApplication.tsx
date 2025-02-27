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
    Typography
} from "@mui/material";
import { motion } from "framer-motion";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { useGetAllJobApplicationByStatusQuery, useGetJobApplicationCountByStatusQuery } from "../../../app/api";
import { ApplicationStatus } from "../../../app/api/enums";
import { Pagination } from "../../../components/Pagination";
export const RejectedJobApplication = () => {
  const [pagination, setPagination] = useState<{
    pageNumber: number;
    pageSize?: number;
  }>({
    pageNumber: 0,
    pageSize: 10,
  });

  const { data: counts, isLoading: isCountsLoading } =
    useGetJobApplicationCountByStatusQuery();

  const { data: items, isLoading: isListLoading } = useGetAllJobApplicationByStatusQuery({
    pageNumber: pagination.pageNumber + 1,
    pageSize: pagination.pageSize,
    status: ApplicationStatus.Rejected,
  });

  const { searchQuery } = useOutletContext<{ searchQuery: string }>();

  const filteredJobRoles = searchQuery
    ? (items?.items || []).filter((option) =>
        option.job?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : items?.items || [];

  const showNoMatchingAlert = searchQuery && filteredJobRoles.length === 0;

  // const [dialogOpened, setDialogOpened] = useState(false);
  // const [selectedId, setSelectedId] = useState<number | null>(null);

  // const handleDialogClose = () => {
  //   setDialogOpened(false);
  //   setSelectedId(null);
  // };

  // const handleDialogOpen = (id: number) => {
  //   setDialogOpened(true);
  //   setSelectedId(id);
  // };

  const isLoading = isCountsLoading || isListLoading;

  return (
    <Box>
      {!isLoading && !!counts?.rejected && (
 <Box sx={{ p: 5, backgroundColor: "#f4f4f4", minHeight: "100vh" }}>

 <Grid container spacing={4} justifyContent="center">
   {filteredJobRoles?.map((application) => (
     <Grid item xs={12} sm={6} md={4} key={application.id}>
       <motion.div
         whileHover={{ scale: 1.05 }}
         whileTap={{ scale: 0.95 }}
       >
         <Card
           sx={{
             background: "linear-gradient(to right, #6a11cb, #2575fc)",
             color: "white",
             boxShadow: 5,
             borderRadius: 3,
             overflow: "hidden",
           }}
         >
           <CardContent>
             <Typography variant="h5" fontWeight="bold" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
               <WorkIcon /> {application.job}
             </Typography>

             <Box mt={1}>
               <Chip label={application.coverLetter} color="secondary" sx={{ mr: 1, fontSize: "0.9rem" }} />
               <Chip label={application.freelancer} color="primary" sx={{ fontSize: "0.9rem" }} />
             </Box>

             <Typography variant="body1" sx={{ display: "flex", alignItems: "center", mt: 2 }}>
               <LocationOnIcon sx={{ mr: 1 }} /> {application.appliedDate}
             </Typography>

             <Typography variant="body1" sx={{ display: "flex", alignItems: "center", mt: 1 }}>
               <MonetizationOnIcon sx={{ mr: 1 }} /> ${application.proposedSalary}
             </Typography>

             <Typography variant="body2" sx={{ display: "flex", alignItems: "center", mt: 1 }}>
               <CalendarTodayIcon sx={{ mr: 1 }} /> Posted on {application.createdAt}
             </Typography>

             <Button
               variant="contained"
               sx={{ mt: 2, backgroundColor: "#fff", color: "#6a11cb", fontWeight: "bold" }}
               fullWidth
             >
               Apply Now
             </Button>
           </CardContent>
         </Card>
       </motion.div>
     </Grid>
   ))}
 </Grid>
</Box>
      )}

      {showNoMatchingAlert && (
        <Alert severity="info" sx={{ m: 2 }}>
          No Approved Job Role found with name {searchQuery}!!
        </Alert>
      )}

      <Pagination
        pageNumber={pagination.pageNumber}
        pageSize={pagination.pageSize}
        onChange={setPagination}
        totalRowsCount={counts?.rejected}
        rowsPerPageOptions={[10, 20, 50]}
      />

    </Box>
  );
};
