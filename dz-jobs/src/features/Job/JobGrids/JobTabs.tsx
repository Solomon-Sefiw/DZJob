import {
  Badge,
  Box,
  Tab,
  Tabs,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useMemo } from "react";
import { Link, useLocation } from "react-router-dom"; // 👈 Fix: import useLocation
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
  {
    label: "Approved",
    href: "/employer-dashboard",
    counts: closed,
    color: "success",
  },
  {
    label: "In Progress",
    href: "/employer-dashboard/inprogress-jobs",
    counts: inProgress,
    color: "primary",
  },
  {
    label: "Archived",
    href: "/employer-dashboard/archived-jobs",
    counts: archived,
    color: "error",
  },
  {
    label: "Open",
    href: "/employer-dashboard/open-jobs",
    counts: open,
    color: "info",
  },
];

export const JobTabs = ({ counts }: { counts?: JobCountsByStatus }) => {
  const tabs = useMemo(() => getTabs(counts), [counts]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const location = useLocation(); // 👈 Get current route

  const currentTabIndex = useMemo(() => {
    const tabIndex = tabs.findIndex((t) => t.href === location.pathname);
    return tabIndex >= 0 ? tabIndex : 0;
  }, [location.pathname, tabs]); // 👈 Re-evaluate on route change

  return (
    <Box
      sx={{
        width: "100%",
        overflowX: "auto",
        bgcolor: "background.paper",
        position: "sticky",
        top: 0,
        zIndex: 10,
        boxShadow: isMobile ? "none" : 1,
      }}
    >
      <Tabs
        value={currentTabIndex}
        variant={isMobile ? "scrollable" : "standard"}
        scrollButtons={isMobile ? "auto" : false}
        allowScrollButtonsMobile
        sx={{ minHeight: isMobile ? "50px" : "auto" }}
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
              // px: isMobile ? 1 : 2,
              py: 1,
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
