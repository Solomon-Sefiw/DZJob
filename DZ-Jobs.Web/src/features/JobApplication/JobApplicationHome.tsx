import WorkIcon from "@mui/icons-material/Work";
import {
  Autocomplete,
  Box,
  Button,
  Divider,
  Paper,
  Stack,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";

import { ArrowBackIosNew } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { useGetAllJobsQuery, useGetJobApplicationCountByStatusQuery } from "../../app/api";
import { RootState } from "../../app/store";
import { PageHeader } from "../../components";

import { JobApplicationDialog } from "./JobApplicationDialog";
import { JobApplicationabs } from "./JobApplicationGrids/JobApplicationTabs";

export const JobApplicationHome = () => {

  const user = useSelector((state: RootState) => state.auth);
  console.log(user)
  const [dialogOpened, setDialogOpened] = useState(false);
  const { data: JobApplicationCounts } = useGetJobApplicationCountByStatusQuery({ freelancerId: user.userId });
  const { data = [] } = useGetAllJobsQuery();

  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [autoCompleteOpen, setAutoCompleteOpen] = useState(false);
  const navigate = useNavigate();
  const handleBackToHome = () => {
    navigate("/dashboard");
  };
  useEffect(() => {
    if (!searchInput) {
      setAutoCompleteOpen(false);
      setSearchQuery("");
    }
  }, [searchInput]);

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <PageHeader
          title={user.username}
          icon={<WorkIcon sx={{ fontSize: 15, color: "#1976d2" }} />}
        />

        {/* Button placed on the right side */}
        {/* <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={() => {
            setDialogOpened(true);
          }}
          sx={{
            color: "#fff",
            borderColor: "#1976d2",
            backgroundColor: "#1976d2",
            "&:hover": {
              backgroundColor: "#1976d2",
              color: "#fff",
              borderColor: "#1976d2",
            },
          }}
        >
          Add Job
        </Button> */}
      </Box>
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          cursor: "progress",
        }}
      >
        <Button
          startIcon={<ArrowBackIosNew />}
          onClick={handleBackToHome}
          variant="contained"
          sx={{
            backgroundColor: "#1976d2",
            cursor: "pointer",
            "&:hover": {
              backgroundColor: "#1976d2",
            },
          }}
        ></Button>
      </Box>
      {/* Search section in a new line */}
      <Box sx={{ marginTop: 2, display: "flex", justifyContent: "flex-start" }}>
        <Stack
          spacing={1}
          sx={{ width: 400 }}
          direction="row"
          alignItems="center"
        >
          <Autocomplete
            id="searcher"
            size="small"
            value={searchInput}
            onChange={() => {
              setSearchQuery(searchInput);
            }} // Handle the selection
            onInputChange={(event, newInputValue, reason) => {
              setSearchInput(newInputValue);
              switch (reason) {
                case "input":
                  setAutoCompleteOpen(!!newInputValue); // Open dropdown on typing
                  break;
                case "clear":
                case "reset":
                  setAutoCompleteOpen(false); // Close dropdown on clear
                  setSearchQuery(""); // Reset the search query when cleared
                  break;
                default:
              }
            }}
            options={
              searchInput.length >= 3
                ? data
                    .map((option) => option.title)
                    .filter(
                      (name, index, newArray) =>
                        name != null && newArray.indexOf(name) === index
                    )
                    .filter((roleName) =>
                      roleName
                        ?.toLowerCase()
                        .includes(searchInput.toLowerCase())
                    )
                : []
            }
            open={autoCompleteOpen}
            renderInput={(params) => <TextField {...params} label="Search" />}
            sx={{ flex: 1 }}
          />

          <Button
            variant="outlined"
            onClick={() => {
              setSearchQuery(searchInput); // Trigger search logic
            }}
          >
            Search
          </Button>
        </Stack>
      </Box>

      <Paper sx={{ p: 2, flex: 1 }}>
        <JobApplicationabs counts={JobApplicationCounts} />
        <Divider />
        <Outlet context={{ searchQuery }} />
      </Paper>
      {dialogOpened && (
        <JobApplicationDialog
          onClose={() => {
            setDialogOpened(false);
            window.location.reload();

          }}
          employerId = {user.userId}
        />
      )}
    </Box>
  );
};
