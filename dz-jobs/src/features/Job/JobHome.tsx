import AddIcon from "@mui/icons-material/Add";
import WorkIcon from "@mui/icons-material/Work";
import {
  Autocomplete,
  Box,
  Button,
  Divider,
  Paper,
  Stack,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { RootState } from "../../app/store";
import { JobDialog } from "./JobDialog";
import { JobTabs } from "./JobGrids/JobTabs";
import { PageHeader } from "../../components/PageHeader";
import { useGetAllJobsQuery, useGetJobCountByStatusQuery } from "../../app/services/DZJobsApi";
export const JobHome = () => {
  const user = useSelector((state: RootState) => state.auth);
  const [dialogOpened, setDialogOpened] = useState(false);
  const { data: JobRoleCounts } = useGetJobCountByStatusQuery({ employerId: user.userId });
  const { data = [] } = useGetAllJobsQuery();

  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [autoCompleteOpen, setAutoCompleteOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Detects mobile screens

  useEffect(() => {
    if (!searchInput) {
      setAutoCompleteOpen(false);
      setSearchQuery("");
    }
  }, [searchInput]);

  return (
    <Box sx={{ p: isMobile ? 2 : 4 }}>
      {/* Header Section */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 2 }}>
        <PageHeader
          title={user.username}
          icon={<WorkIcon sx={{ fontSize: 18, color: "#1976d2" }} />}
        />

        {/* Add Job Button */}
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setDialogOpened(true)}
          sx={{
            backgroundColor: "#1976d2",
            color: "#fff",
            fontWeight: "bold",
            "&:hover": { backgroundColor: "#115293" },
          }}
        >
          Add Job
        </Button>
      </Box>

      {/* Search Bar */}
      <Box sx={{ mt: 3, display: "flex", justifyContent: isMobile ? "center" : "flex-start" }}>
        <Stack spacing={1} sx={{ width: isMobile ? "100%" : 400 }} direction="row" alignItems="center">
          <Autocomplete
            id="searcher"
            size="small"
            fullWidth
            value={searchInput}
            onChange={() => setSearchQuery(searchInput)}
            onInputChange={(_, newInputValue, reason) => {
              setSearchInput(newInputValue);
              if (reason === "input") setAutoCompleteOpen(!!newInputValue);
              if (reason === "clear" || reason === "reset") {
                setAutoCompleteOpen(false);
                setSearchQuery("");
              }
            }}
            options={
              searchInput.length >= 3
                ? data
                    .map((option) => option.title)
                    .filter((name, index, arr) => name && arr.indexOf(name) === index)
                    .filter((roleName) => roleName?.toLowerCase().includes(searchInput.toLowerCase()))
                : []
            }
            open={autoCompleteOpen}
            renderInput={(params) => <TextField {...params} label="Search" />}
          />
          <Button
            variant="contained"
            onClick={() => setSearchQuery(searchInput)}
            sx={{
              backgroundColor: "#1976d2",
              color: "#fff",
              fontWeight: "bold",
              "&:hover": { backgroundColor: "#115293" },
            }}
          >
            Search
          </Button>
        </Stack>
      </Box>

      {/* Main Content */}
      <Paper sx={{ mt: 3, p: isMobile ? 2 : 3, borderRadius: 2 }}>
        <JobTabs counts={JobRoleCounts} />
        <Divider sx={{ my: 2 }} />
        <Outlet context={{ searchQuery }} />
      </Paper>

      {/* Back Button */}
      {/* <Box sx={{ position: "fixed", bottom: 16, left: 16 }}>
        <Button
          startIcon={<ArrowBackIosNew />}
          onClick={() => navigate("/dashboard")}
          variant="contained"
          sx={{
            backgroundColor: "#1976d2",
            "&:hover": { backgroundColor: "#115293" },
          }}
        >
          Back
        </Button>
      </Box> */}

      {/* Job Dialog */}
      {dialogOpened && (
        <JobDialog
          onClose={() => {
            setDialogOpened(false);
            window.location.reload();
          }}
          employerId={user.userId}
          title="Add New Job"
        />
      )}
    </Box>
  );
};
