import { GitHub, LinkedIn, Web } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog, DialogActions, DialogContent, DialogTitle,
  Divider,
  IconButton, Link,
  List, ListItem, ListItemText, 
  Typography
} from "@mui/material";
import { useGetUserByIdQuery } from "../../../../app/services/DZJobsApi";
import { FreelancerHeader } from "./FreelancerHeader";
import { FreelancerEducation } from "./FreelancerEduction";
import { FreelancerSkills } from "./FreelancerSkills";
import { FreelancerContracts } from "./FreelancerContracts";


interface FreelancerDetailsDialogProps {
  open: boolean;
  onClose: () => void;
  freelancerId: string;
}

export const FreelancerDetailsDialog: React.FC<FreelancerDetailsDialogProps> = ({
  open,
  onClose,
  freelancerId,
}) => {
  const { data: freelancer, isLoading } = useGetUserByIdQuery({ id: freelancerId });

  // Sample demo data (replace with API data)
  const demoData = {
    firstName: freelancer?.firstName || undefined,
    lastName: freelancer?.lastName || undefined,
    email: freelancer?.email || undefined,
    location: "New York, USA",
    experienceYears: 5,
    bio: "Passionate full-stack developer with expertise in modern web technologies.",
    education: "Bachelor of Computer Science - ABC University",
    skills: ["React", "Node.js", "TypeScript", "SQL", "GraphQL", "Docker"],
    workExperience: [
      { company: "Company A", role: "Frontend Developer", duration: "Jan 2020 - Dec 2022" },
      { company: "Company B", role: "Full Stack Developer", duration: "Feb 2018 - Dec 2019" },
    ],
    completedContracts: [
      { contractTitle: "Web Application Development", client: "Client A", date: "2021-06-30" },
      { contractTitle: "E-commerce Platform", client: "Client B", date: "2020-11-20" },
    ],
    profileImage: "https://i.pravatar.cc/150?img=3",  // Placeholder profile image
    socialLinks: {
      linkedIn: "https://linkedin.com/in/johndoe",
      github: "https://github.com/johndoe",
      portfolio: "https://johndoe.dev",
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle textAlign="center">              
        <Typography variant="h5" fontWeight="bold">{demoData.firstName} {demoData.lastName}</Typography>
      </DialogTitle>
      <DialogContent>
        {isLoading ? (
          <Typography>Loading...</Typography>
        ) : freelancer ? (
          <>
            {/* Profile Photo & Basic Details */}
            <FreelancerHeader freelancer={freelancer}/>
            <Divider sx={{ my: 2 }} />

            {/* Education */}
            <FreelancerEducation freelancer={freelancer}/>

            <Divider sx={{ my: 2 }} />

            {/* Skills */}
              <FreelancerSkills freelancer={freelancer}/>
            
            <Divider sx={{ my: 2 }} />

            {/* Work Experience */}
            <Typography variant="h6" fontWeight="bold">Work Experience</Typography>
            <List>
              {demoData.workExperience.map((work, index) => (
                <ListItem key={index}>
                  <ListItemText
                    primary={`${work.role} at ${work.company}`}
                    secondary={`Duration: ${work.duration}`}
                  />
                </ListItem>
              ))}
            </List>

            <Divider sx={{ my: 2 }} />

            {/* Completed Contracts */}
            <FreelancerContracts freelancer={freelancer}/>

                

            <Divider sx={{ my: 2 }} />

            {/* Social Media Links */}
            <Typography variant="h6" fontWeight="bold">Social Links</Typography>
            <Box sx={{ display: "flex", gap: 2, justifyContent: "center", mt: 1 }}>
              <IconButton component={Link} href={demoData.socialLinks.linkedIn} target="_blank">
                <LinkedIn color="primary" />
              </IconButton>
              <IconButton component={Link} href={demoData.socialLinks.github} target="_blank">
                <GitHub />
              </IconButton>
              <IconButton component={Link} href={demoData.socialLinks.portfolio} target="_blank">
                <Web color="secondary" />
              </IconButton>
            </Box>
          </>
        ) : (
          <Typography>Freelancer details not found.</Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
