import { GitHub, LinkedIn, Web } from "@mui/icons-material";
import {
  Box,
  Button,
  Chip,
  Dialog, DialogActions, DialogContent, DialogTitle,
  Divider,
  IconButton, Link,
  List, ListItem, ListItemText, 
  Typography
} from "@mui/material";
import { useGetUserByIdQuery } from "../../../app/services/DZJobsApi";
import { UserPhoto } from "../UserPhoto";

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
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 2 }}>
              <UserPhoto user={freelancer} />
              
              <Typography variant="h6" fontWeight="bold">
                {demoData.firstName} {demoData.lastName}
              </Typography>
              <Typography variant="body2">{demoData.location}</Typography>
              <Typography variant="body2"><strong>Email:</strong> {demoData.email}</Typography>
              <Typography variant="body2"><strong>Experience:</strong> {demoData.experienceYears} years</Typography>
              {/* Fixed the unescaped quote issue */}
              <Typography 
                variant="body2" 
                sx={{ mt: 1, textAlign: "center", fontStyle: "italic" }}
                component="span"
              >
                {demoData.bio || "No bio available."}
              </Typography>
            </Box>

            <Divider sx={{ my: 2 }} />

            {/* Education */}
            <Typography variant="h6" fontWeight="bold">Education</Typography>
            <Typography variant="body2">{demoData.education}</Typography>

            <Divider sx={{ my: 2 }} />

            {/* Skills */}
            <Typography variant="h6" fontWeight="bold">Skills</Typography>
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
              {demoData.skills.map((skill, index) => (
                <Chip key={index} label={skill} color="primary" />
              ))}
            </Box>

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
            <Typography variant="h6" fontWeight="bold">Completed Contracts</Typography>
            <List>
              {demoData.completedContracts.map((contract, index) => (
                <ListItem key={index}>
                  <ListItemText
                    primary={contract.contractTitle}
                    secondary={`Client: ${contract.client} | Date: ${contract.date}`}
                  />
                </ListItem>
              ))}
            </List>

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
