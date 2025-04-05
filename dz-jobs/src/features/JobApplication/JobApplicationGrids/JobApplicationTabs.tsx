import { Badge, Box, Tab, Tabs, useMediaQuery, useTheme } from "@mui/material";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import { JobApplicationCountsByStatus } from "../../../app/services/DZJobsApi";

interface TabProps {
  label: string;
  href: string;
  counts?: number;
  color: "primary" | "success" | "error" | "info";
}

const getTabs = ({
  accepted,
  rejected,
  pending,
}: JobApplicationCountsByStatus = {}): TabProps[] => [
  {
    label: "Open Jobs",
    href: "/freelancer-dashboard",
    counts:0,
    color: "success",
  },
  {
    label: "Accepted",
    href: "/freelancer-dashboard/accepted",
    counts: accepted,
    color: "success",
  },
  {
    label: "Rejected",
    href: "/freelancer-dashboard/rejected",
    counts: rejected,
    color: "error",
  },
  {
    label: "Pending",
    href: "/freelancer-dashboard/pending",
    counts: pending,
    color: "info",
  },
];

export const JobApplicationabs = ({
  counts,
}: {
  counts?: JobApplicationCountsByStatus;
}) => {
  const tabs = useMemo(() => getTabs(counts), [counts]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const getCurrentTabIndex = () => {
    const tabIndex = tabs.findIndex((t) => t.href === window.location.pathname);
    return tabIndex >= 0 ? tabIndex : 0;
  };

  return (
    <Box
      sx={{
        width: "100%",
        overflowX: "auto", // Horizontal scrolling on small screens
        bgcolor: "background.paper",
        position: "sticky", // Keeps tabs visible while scrolling
        top: 0,
        zIndex: 10,
      }}
    >
      <Tabs
        value={getCurrentTabIndex()}
        variant={isMobile ? "scrollable" : "standard"} // Horizontal scrolling for mobile
        scrollButtons={isMobile ? "auto" : false}
        allowScrollButtonsMobile
        sx={{
          minHeight: isMobile ? "50px" : "auto", // Adjust height for mobile
        }}
      >
        {tabs.map(({ href, color, label, counts }) => (
          <Tab
            key={label}
            component={Link}
            color="inherit"
            to={href}
            sx={{
              minWidth: isMobile ? "auto" : 120,
              textTransform: "none",
              fontSize: isMobile ? "0.9rem" : "1rem",
              px: isMobile ? 1 : 2,
              py: 1, // Padding for better clickability
            }}
            label={
              <Badge
                badgeContent={counts || 0}
                color={color}
                sx={{
                  "& .MuiBadge-badge": { fontSize: "0.75rem" },
                  px: isMobile ? 0 : 2, // Adjust padding for mobile
                }}
              >
                <Box>{label}</Box>
              </Badge>
            }
          />
        ))}
      </Tabs>
    </Box>
  );
};
