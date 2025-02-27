import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAddUserSkillMutation, useGetAllSkillQuery } from "../../app/api";
import { RootState } from "../../app/store";
  
  interface Skill {
    id: number; // id is required
    name: string;
  }
  
  const UserSkillSelector = () => {
    const { userId } = useSelector((state: RootState) => state.auth);
    const { data: skills, isLoading, error } = useGetAllSkillQuery();
    const [addUserSkill, { isLoading: isSaving }] = useAddUserSkillMutation();
    const [selectedSkills, setSelectedSkills] = useState<Skill[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredSkills, setFilteredSkills] = useState<Skill[]>([]);
  const navigate = useNavigate();
    // Filter skills based on search term
    useEffect(() => {
      if (skills) {
        setFilteredSkills(
          skills.filter((skill: any) => 
            skill.id !== undefined && // Ensure id is defined
            skill.name.toLowerCase().includes(searchTerm.toLowerCase())
          ) as Skill[] // Cast to Skill[] after filtering
        );
      }
    }, [searchTerm, skills]);
  
    const handleAddSkill = (skill: Skill) => {
      if (!selectedSkills.some((s) => s.id === skill.id)) {
        setSelectedSkills([...selectedSkills, skill]);
      }
    };
  
    const handleRemoveSkill = (skillId: number) => {
      setSelectedSkills(selectedSkills.filter((skill) => skill.id !== skillId));
    };
  
    const handleSaveSkills = async () => {
      try {
        for (const skill of selectedSkills) {
          await addUserSkill({ addUserSkillCommand: { userId : userId, skillId: skill.id } });
        }
        navigate("/freelancer-dashboard"); 
      } catch (error) {
        console.error("Failed to save skills:", error);
        alert("Failed to update skills. Please try again.");
      }
    };
  
    if (isLoading) return <CircularProgress />;
    if (error) return <Typography color="error">Failed to load skills.</Typography>;
  
    return (
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3, width: "600px" }}>
        {/* Search Bar */}
        <TextField
          variant="outlined"
          placeholder="Search Skills..."
          onChange={(e) => setSearchTerm(e.target.value)}
          fullWidth
        />
  
        {/* Circular Skill Selector */}
        <Paper elevation={3} sx={{ padding: 2, position: 'relative', width: '100%', height: '400px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
          <Typography variant="h6" gutterBottom sx={{ position: 'absolute', top: '10px' }}>
            Select Skills
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%', position: 'relative' }}>
            {filteredSkills?.map((skill: Skill) => (
              <Button
                key={skill.id}
                onClick={() => handleAddSkill(skill)}
                sx={{
                  borderRadius: '50%',
                  width: '60px',
                  height: '60px',
                  margin: '5px',
                  bgcolor: selectedSkills.some((s) => s.id === skill.id) ? 'lightgreen' : 'white',
                  border: '1px solid #ccc',
                  '&:hover': {
                    bgcolor: selectedSkills.some((s) => s.id === skill.id) ? 'lightgreen' : '#f0f0f0',
                  },
                }}
              >
                <Typography variant="body2">{skill.name}</Typography>
              </Button>
            ))}
          </Box>
        </Paper>
  
        {/* Selected Skills Display */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {selectedSkills.map((skill) => (
            <Chip
              key={skill.id}
              label={skill.name}
              onDelete={() => handleRemoveSkill(skill.id)}
              deleteIcon={<CloseIcon />}
            />
          ))}
        </Box>
  
        {/* Save Button */}
        <Button
          variant="contained"
          color="primary"
          onClick={handleSaveSkills}
          disabled={isSaving || selectedSkills.length === 0}
        >
          {isSaving ? "Saving..." : "Save Skills"}
        </Button>
      </Box>
    );
  };
  
  export default UserSkillSelector;
  