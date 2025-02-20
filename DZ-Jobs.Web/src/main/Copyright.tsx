import { Link, Typography } from "@mui/material";

export const Copyright = () => (
  <Typography variant="body2" color="text.secondary" align="center">
    {"Copyright © "}
    <Link color="inherit" href="https://????">
      DZ Jobs
    </Link>
    {` ${new Date().getFullYear()}`}.
  </Typography>
);
