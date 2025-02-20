import { Box, SxProps, Theme, Typography } from "@mui/material";
import { ContentCard } from "../../components";


const style: SxProps<Theme> = {
  p: 2,
  m: 2,
  minWidth: 450,
  minHeight: 300,
};

export const Dashboard = () => {
  const registerationmsg = localStorage.getItem("welcomeMSg")
  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
      <Box
        sx={{
          width: "100%",
          p: 2,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >

      </Box>
      {registerationmsg &&        
        <Typography
            variant="h6"
            component="h1"
            sx={{ fontWeight: "bold", color: "#0073b1" }}
          >
           { registerationmsg}
          </Typography>}
      <ContentCard
        title="Full Stack Developer"
        elevation={1}
        divider={true}
        sx={style}
      ></ContentCard>
      <ContentCard
        title="Customer Service Officer "
        elevation={1}
        divider={true}
        sx={style}
      ></ContentCard>
      <ContentCard
        title="Video Editor"
        elevation={1}
        divider={true}
        sx={style}
      ></ContentCard>
      <ContentCard
        title="Graaphcs Designer"
        elevation={1}
        divider={true}
        sx={style}
      ></ContentCard>
      <ContentCard
        title="Architect"
        elevation={1}
        divider={true}
        sx={style}
      ></ContentCard>
      <ContentCard
        title="Sales"
        elevation={1}
        divider={true}
        sx={style}
      ></ContentCard>
    </Box>
  );
};
