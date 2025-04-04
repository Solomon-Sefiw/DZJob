import {
  Autocomplete,
  Box,
  Button,
  Divider,
  Paper,
  Stack,
  TextField,
  CircularProgress,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { RootState } from "../../app/store";
import { JobApplicationabs } from "./JobApplicationGrids/JobApplicationTabs";
import {
  useGetAllJobsQuery,
  useGetJobApplicationCountByStatusQuery,
} from "../../app/services/DZJobsApi";
import { PageHeader } from "../../components/PageHeader";
import { Person } from "@mui/icons-material";

export const JobApplicationHome = () => {
  const user = useSelector((state: RootState) => state.auth);
  const { data: JobApplicationCounts } = useGetJobApplicationCountByStatusQuery({ freelancerId: user.userId });
  const { data = [], isLoading } = useGetAllJobsQuery();

  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [autoCompleteOpen, setAutoCompleteOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    if (!searchInput) {
      setAutoCompleteOpen(false);
      setSearchQuery("");
    }
  }, [searchInput]);

  return (
    <Box sx={{ p: isMobile ? -2 : 4, width: "100%" }}>
      {/* Header */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <PageHeader
          title={user.username}
          icon={<Person sx={{ fontSize: 24, color: "#1976d2" }} />}
        />
      </Box>

      {/* Search Bar */}
      <Box sx={{ mt: 2, display: "flex" }}>
        <Stack spacing={2} direction="row" alignItems="center" sx={{ width: isMobile ? "100%" : 400 }}>
          <Autocomplete
            id="searcher"
            size="small"
            value={searchInput}
            open={autoCompleteOpen}
            loading={isLoading}
            onChange={() => setSearchQuery(searchInput)}
            onInputChange={(_, newInputValue, reason) => {
              setSearchInput(newInputValue);
              if (reason === "input") {
                setAutoCompleteOpen(!!newInputValue);
              } else {
                setAutoCompleteOpen(false);
                setSearchQuery("");
              }
            }}
            options={
              searchInput.length >= 3
                ? data
                    .map((option) => option.title)
                    .filter((name, index, newArray) => name && newArray.indexOf(name) === index)
                    .filter((roleName) => roleName?.toLowerCase().includes(searchInput.toLowerCase()))
                : []
            }
            renderInput={(params) => (
              <TextField {...params} label="Search Jobs" InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {isLoading ? <CircularProgress color="inherit" size={16} /> : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }} />
            )}
            sx={{ flex: 1 }}
          />
          <Button variant="contained" onClick={() => setSearchQuery(searchInput)}>
            Search
          </Button>
        </Stack>
      </Box>

      {/* Job Applications Tabs */}
      <Paper sx={{ mt: 3, p: 2, flex: 1 }}>
        <JobApplicationabs counts={JobApplicationCounts} />
        <Divider sx={{ my: 2 }} />
        <Outlet context={{ searchQuery }} />
      </Paper>

  
    </Box>
  );
};
