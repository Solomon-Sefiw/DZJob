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
import { useGetAllOpenJobByStatusQuery } from "../../../app/api";
import { Pagination } from "../../../components/Pagination";
export const OpenJobsForApplication = () => {
  const [pagination, setPagination] = useState<{
    pageNumber: number;
    pageSize?: number;
  }>({
    pageNumber: 0,
    pageSize: 10,
  });

//   const { data: counts, isLoading: isCountsLoading } =
//     useGetJobCountByStatusQuery();

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

  const isLoading = isListLoading || isListLoading;

  return (
    <Box>
      {!isLoading && !!items?.totalCount && (
 <Box sx={{ p: 5, backgroundColor: "#f4f4f4", minHeight: "100vh" }}>

 <Grid container spacing={4} justifyContent="center">
   {filteredJobRoles?.map((job) => (
     <Grid item xs={12} sm={6} md={4} key={job.id}>
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
               <WorkIcon /> {job.title}
             </Typography>

             <Box mt={1}>
               <Chip label={job.jobCategory} color="secondary" sx={{ mr: 1, fontSize: "0.9rem" }} />
               <Chip label={job.jobType} color="primary" sx={{ fontSize: "0.9rem" }} />
             </Box>

             <Typography variant="body1" sx={{ display: "flex", alignItems: "center", mt: 2 }}>
               <LocationOnIcon sx={{ mr: 1 }} /> {job.description}
             </Typography>

             <Typography variant="body1" sx={{ display: "flex", alignItems: "center", mt: 1 }}>
               <MonetizationOnIcon sx={{ mr: 1 }} /> ${job.salary}
             </Typography>

             <Typography variant="body2" sx={{ display: "flex", alignItems: "center", mt: 1 }}>
               <CalendarTodayIcon sx={{ mr: 1 }} /> Posted on {job.postedDate}
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
        totalRowsCount={items?.totalCount}
        rowsPerPageOptions={[10, 20, 50]}
      />

    </Box>
  );
};
