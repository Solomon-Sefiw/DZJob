import {
    Box,
    Card,
    CardActionArea,
    CardContent,
    Container,
    Grid,
    Typography,
} from "@mui/material";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
    UpdatePermissionDto,
    usePostApiAuthenticationGiveEmployerRoleMutation,
    usePostApiAuthenticationGiveFreelancerRoleMutation,
} from "../../app/api";
  
  // Assume this interface exists (adjust as needed)
  
  export const RoleSelection = () => {
    const navigate = useNavigate();
    const [giveFreelancerRole] = usePostApiAuthenticationGiveFreelancerRoleMutation();
    const [giveEmployerRole] = usePostApiAuthenticationGiveEmployerRoleMutation();
  
    // Retrieve the user's email from local storage.
    const userEmail = localStorage.getItem("emailForRole");
    const useFullName = localStorage.getItem("useFullName");

  
    const handleRoleSelect = useCallback(
      async (selectedRole: string) => {
        if (!userEmail) {
          console.error("User email not found.");
          return;
        }
        const updatePermissionDto: UpdatePermissionDto = {
          email: userEmail,
        };
  
        try {
          if (selectedRole === "freelancer") {
            await giveFreelancerRole({ updatePermissionDto  }).unwrap();
          } else if (selectedRole === "employer") {
            await giveEmployerRole({ updatePermissionDto }).unwrap();
          }
          useFullName && localStorage.setItem("welcomeMSg", "WellCome Dear, " + useFullName + ", You Have Created DZ-Jobs Account, with "+selectedRole+" Role." );
          navigate("/dashboard");
        } catch (error) {
          console.error("Error updating user role:", error);
        }
      },
      [userEmail, navigate, giveFreelancerRole, giveEmployerRole]
    );
  
    return (
      <Container maxWidth="sm">
        <Box sx={{ textAlign: "center", mt: 8, mb: 4 }}>
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", color: "#14A800" }}
          >
            Select Your Role
          </Typography>
          <Typography variant="subtitle1" sx={{ mt: 1 }}>
            Choose whether you want to work as a freelancer or hire talent.
          </Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Card>
              <CardActionArea
                onClick={() => handleRoleSelect("freelancer")}
              >
                <CardContent sx={{ textAlign: "center", p: 4 }}>
                  {/* Replace with your custom freelancer icon */}
                  <Box sx={{ mb: 2 }}>
                    <img
                      src="/assets/freelancer-icon.svg"
                      alt="Freelancer"
                      style={{ width: "64px", height: "64px" }}
                    />
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    Freelancer
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ mt: 1 }}
                  >
                    I want to work as a freelancer and offer my skills.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card>
              <CardActionArea
                onClick={() => handleRoleSelect("employer")}
              >
                <CardContent sx={{ textAlign: "center", p: 4 }}>
                  {/* Replace with your custom employer icon */}
                  <Box sx={{ mb: 2 }}>
                    <img
                      src="/assets/employer-icon.svg"
                      alt="Employer"
                      style={{ width: "64px", height: "64px" }}
                    />
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    Employer
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ mt: 1 }}
                  >
                    I want to hire professionals to help with my projects.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      </Container>
    );
  };
  