import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Paper,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../app/store";
import { useAddUserSkillMutation, useGetAllSkillQuery } from "../../app/services/DZJobsApi";

interface Skill {
  id: number;
  name: string;
}

const UserSkillSelector = () => {
  const { userId } = useSelector((state: RootState) => state.auth);
  const { data: skills, isLoading, error } = useGetAllSkillQuery();
  const [addUserSkill, { isLoading: isSaving }] = useAddUserSkillMutation();
  const [selectedSkills, setSelectedSkills] = useState<Skill[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [snackbarMessage, setSnackbarMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const filteredSkills = useMemo(
    () =>
      skills?.filter((skill): skill is Skill => skill.id !== undefined)
        .filter((skill) => skill.name.toLowerCase().includes(searchTerm.toLowerCase())) || [],
    [searchTerm, skills]
  );

  const handleAddSkill = (skill: Skill) => {
    setSelectedSkills((prev) =>
      prev.some((s) => s.id === skill.id) ? prev : [...prev, skill]
    );
  };

  const handleRemoveSkill = (skillId: number) => {
    setSelectedSkills((prev) => prev.filter((skill) => skill.id !== skillId));
  };

  const handleSaveSkills = async () => {
    try {
      const response = await Promise.all(
        selectedSkills.map((skill) =>
          addUserSkill({ addUserSkillCommand: { userId, skillId: skill.id } })
        )
      );
      if (response.every((res) => "data" in res)) {
        setSnackbarMessage("Skills updated successfully!");
        navigate("/freelancer-dashboard");
      } else {
        throw new Error("Failed to save some skills.");
      }
    } catch (error) {
      console.error("Failed to save skills:", error);
      setSnackbarMessage("Failed to update skills. Please try again.");
    }
  };

  if (isLoading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress />
      </Box>
    );

  if (error)
    return (
      <Typography color="error" sx={{ textAlign: "center", mt: 4 }}>
        Failed to load skills. Please try again later.
      </Typography>
    );

  return (
    <Paper
      elevation={4}
      sx={{
        p: 3,
        maxWidth: 500,
        mx: "auto",
        textAlign: "center",
        borderRadius: 3,
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
      }}
    >
      <Typography variant="h5" fontWeight={700} gutterBottom>
        Select Your Skills
      </Typography>

      <TextField
        variant="outlined"
        placeholder="Search skills..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        fullWidth
        sx={{ mb: 2 }}
      />

      <Box
        sx={{
          maxHeight: 250,
          overflowY: "auto",
          display: "flex",
          flexWrap: "wrap",
          gap: 1,
          justifyContent: "center",
          p: 1,
        }}
      >
        {filteredSkills.length > 0 ? (
          filteredSkills.map((skill) => (
            <Button
              key={skill.id}
              onClick={() => handleAddSkill(skill)}
              variant="outlined"
              sx={{
                textTransform: "none",
                borderRadius: 2,
                fontWeight: 500,
                transition: "all 0.2s",
                "&:hover": { bgcolor: "primary.main", color: "white" },
              }}
            >
              {skill.name}
            </Button>
          ))
        ) : (
          <Typography variant="body2" sx={{ color: "gray" }}>
            No matching skills found.
          </Typography>
        )}
      </Box>

      {selectedSkills.length > 0 && (
        <Box
          sx={{
            mt: 2,
            display: "flex",
            flexWrap: "wrap",
            gap: 1,
            justifyContent: "center",
            p: 1,
          }}
        >
          {selectedSkills.map((skill) => (
            <Chip
              key={skill.id}
              label={skill.name}
              onDelete={() => handleRemoveSkill(skill.id)}
              deleteIcon={<CloseIcon />}
              color="primary"
              sx={{ fontWeight: 500 }}
            />
          ))}
        </Box>
      )}

      <Button
        variant="contained"
        color="primary"
        onClick={handleSaveSkills}
        disabled={isSaving || selectedSkills.length === 0}
        sx={{
          mt: 3,
          textTransform: "none",
          fontWeight: 600,
          borderRadius: 2,
          transition: "all 0.2s",
          "&:hover": { boxShadow: "0px 4px 15px rgba(0,0,0,0.2)" },
        }}
      >
        {isSaving ? "Saving..." : "Save Skills"}
      </Button>

      <Snackbar
        open={!!snackbarMessage}
        autoHideDuration={3000}
        onClose={() => setSnackbarMessage(null)}
        message={snackbarMessage}
      />
    </Paper>
  );
};

export default UserSkillSelector;
