import { Badge, Box, Tab, Tabs, useMediaQuery, useTheme } from "@mui/material";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import { JobCountsByStatus } from "../../../app/services/DZJobsApi";

interface TabProps {
  label: string;
  href: string;
  counts?: number;
  color: "primary" | "success" | "error" | "info";
}

const getTabs = ({
  inProgress,
  archived,
  open,
  closed,
}: JobCountsByStatus = {}): TabProps[] => [
  { label: "Closed", href: "/employer-dashboard", counts: closed, color: "success" },
  { label: "In Progress", href: "/employer-dashboard/inprogress-jobs", counts: inProgress, color: "success" },
  { label: "Archived", href: "/employer-dashboard/archived-jobs", counts: archived, color: "error" },
  { label: "Open", href: "/employer-dashboard/open-jobs", counts: open, color: "info" },
];

export const JobTabs = ({ counts }: { counts?: JobCountsByStatus }) => {
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
        overflowX: "auto", // Horizontal scrolling for small screens
        bgcolor: "background.paper",
        position: "sticky", // Keeps tabs visible while scrolling
        top: 0,
        zIndex: 10,
        boxShadow: isMobile ? "none" : 1, // Adds shadow for desktop
      }}
    >
      <Tabs
        value={getCurrentTabIndex()}
        variant={isMobile ? "scrollable" : "standard"} // Horizontal scroll for mobile
        scrollButtons={isMobile ? "auto" : false} // Scroll buttons visible only on mobile
        allowScrollButtonsMobile
        sx={{
          minHeight: isMobile ? "50px" : "auto", // Adjust height for mobile
        }}
      >
        {tabs.map(({ href, color, label, counts }) => (
          <Tab
            key={label}
            component={Link}
            to={href}
            sx={{
              minWidth: isMobile ? "auto" : 120,
              textTransform: "none",
              fontSize: isMobile ? "0.9rem" : "1rem",
              px: isMobile ? 1 : 2,
              py: 1, // Vertical padding for better clickability
            }}
            label={
              <Badge
                badgeContent={counts || 0}
                color={color}
                sx={{ "& .MuiBadge-badge": { fontSize: "0.75rem" } }}
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
