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
        overflowX: "auto",
        bgcolor: "background.paper",
        position: "sticky", // Keeps tabs visible when scrolling (optional)
        top: 0,
        zIndex: 10,
      }}
    >
      <Tabs
        value={getCurrentTabIndex()}
        variant={isMobile ? "scrollable" : "standard"} // Enables horizontal scrolling on mobile
        scrollButtons={isMobile ? "auto" : false}
        allowScrollButtonsMobile
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
            }}
            label={
              <Badge badgeContent={counts || 0} color={color} sx={{ "& .MuiBadge-badge": { fontSize: "0.75rem" } }}>
                <Box>{label}</Box>
              </Badge>
            }
          />
        ))}
      </Tabs>
    </Box>
  );
};
