import {
  Badge,
  Box,
  Tab,
  Tabs,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useMemo } from "react";
import { Link, useLocation } from "react-router-dom"; // 👈 Added useLocation
import { ContractCountsByEmployer } from "../../../../app/services/DZJobsApi";

interface TabProps {
  label: string;
  href: string;
  counts?: number;
  color: "primary" | "success" | "error" | "info";
}

const getTabs = ({
  draft,
  pending,
  active,
  completed,
}: ContractCountsByEmployer = {}): TabProps[] => [
  {
    label: "completed",
    href: "/employer-Contract",
    counts: completed,
    color: "success",
  },
  {
    label: "active",
    href: "/employer-Contract/active-Contract",
    counts: active,
    color: "primary",
  },
  {
    label: "pending",
    href: "/employer-Contract/pending-Contract",
    counts: pending,
    color: "error",
  },
  {
    label: "draft",
    href: "/employer-Contract/draft-Contract",
    counts: draft,
    color: "info",
  },
];

export const EmployerContractTabs = ({
  counts,
}: {
  counts?: ContractCountsByEmployer;
}) => {
  const tabs = useMemo(() => getTabs(counts), [counts]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const location = useLocation(); // 👈 Hook to track current route

  const currentTabIndex = useMemo(() => {
    const tabIndex = tabs.findIndex((t) => t.href === location.pathname);
    return tabIndex >= 0 ? tabIndex : 0;
  }, [location.pathname, tabs]); // 👈 Dynamic tab selection

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
              px: isMobile ? 1 : 2,
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
