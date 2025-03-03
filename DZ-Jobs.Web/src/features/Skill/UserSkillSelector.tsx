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
import { useAddUserSkillMutation, useGetAllSkillQuery } from "../../app/api";
import { RootState } from "../../app/store";

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

  if (isLoading) return <CircularProgress sx={{ display: "block", margin: "auto" }} />;
  if (error) return <Typography color="error">Failed to load skills.</Typography>;

  return (
    <Paper elevation={4} sx={{ p: 4, maxWidth: 600, mx: "auto", textAlign: "center" }}>
      <Typography variant="h5" fontWeight={600} gutterBottom>
        Select Your Skills
      </Typography>
      
      <TextField
        variant="outlined"
        placeholder="Search Skills..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        fullWidth
        sx={{ mb: 2 }}
      />

      <Box sx={{ maxHeight: 300, overflowY: "auto", display: "flex", flexWrap: "wrap", gap: 1, p: 1 }}>
        {filteredSkills.length > 0 ? (
          filteredSkills.map((skill) => (
            <Button
              key={skill.id}
              onClick={() => handleAddSkill(skill)}
              variant="outlined"
              sx={{ textTransform: "none", borderRadius: 2 }}
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

      <Box sx={{ mt: 2, display: "flex", flexWrap: "wrap", gap: 1 }}>
        {selectedSkills.map((skill) => (
          <Chip
            key={skill.id}
            label={skill.name}
            onDelete={() => handleRemoveSkill(skill.id)}
            deleteIcon={<CloseIcon />}
            color="primary"
          />
        ))}
      </Box>

      <Button
        variant="contained"
        color="primary"
        onClick={handleSaveSkills}
        disabled={isSaving || selectedSkills.length === 0}
        sx={{ mt: 3, textTransform: "none", fontWeight: 600 }}
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
