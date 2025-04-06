import {
  Badge,
  Box,
  Tab,
  Tabs,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useMemo } from "react";
import { Link, useLocation } from "react-router-dom"; // 👈 import useLocation
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
    counts: 0,
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
  const location = useLocation(); // 👈 React Router location hook

  const currentTabIndex = useMemo(() => {
    const tabIndex = tabs.findIndex((t) => t.href === location.pathname);
    return tabIndex >= 0 ? tabIndex : 0;
  }, [location.pathname, tabs]); // 👈 Update when location or tabs change

  return (
    <Box
      sx={{
        width: "100%",
        overflowX: "auto",
        bgcolor: "background.paper",
        position: "sticky",
        top: 0,
        zIndex: 10,
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
              px: isMobile ? 1 : 2,
              py: 1,
            }}
            label={
              <Badge
                badgeContent={counts || 0}
                color={color}
                sx={{
                  "& .MuiBadge-badge": { fontSize: "0.75rem" },
                  px: isMobile ? 0 : 2,
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
