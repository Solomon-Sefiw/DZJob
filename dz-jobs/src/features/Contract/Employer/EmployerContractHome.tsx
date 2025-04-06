
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
import { RootState } from "../../../app/store";
import { useGetAllJobsQuery, useGetContractsCountByEmployerQuery } from "../../../app/services/DZJobsApi";
import { EmployerContractTabs } from "./EmployerContractGrids/EmployerContractTabs";

export const EmployerContractHome = () => {
  const user = useSelector((state: RootState) => state.auth);
  const { data: JobRoleCounts } = useGetContractsCountByEmployerQuery({ employerId: user.userId });
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
    <Box sx={{ p: isMobile ? 0 : 4 }}>
      {/* Header Section */}


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
      <Paper sx={{ mt: 3, flex:1 }}>
        <EmployerContractTabs counts={JobRoleCounts} />
        <Divider sx={{ my: 2 }} />
        <Outlet context={{ searchQuery }} />
      </Paper>
    </Box>
  );
};
