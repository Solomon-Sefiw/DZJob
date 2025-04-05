import {
  Badge,
  Box,
  Tab,
  Tabs,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useMemo } from "react";
import { Link, useLocation } from "react-router-dom"; // 👈 Added
import { ContractCountsByFreelancer } from "../../../../app/services/DZJobsApi";

interface TabProps {
  label: string;
  href: string;
  counts?: number;
  color: "primary" | "success" | "error" | "info";
}

const getTabs = ({
  pending,
  active,
  completed,
}: ContractCountsByFreelancer = {}): TabProps[] => [
  {
    label: "completed",
    href: "/freelancer-Contract",
    counts: completed,
    color: "success",
  },
  {
    label: "active",
    href: "/freelancer-Contract/active-Contract",
    counts: active,
    color: "primary",
  },
  {
    label: "pending",
    href: "/freelancer-Contract/pending-Contract",
    counts: pending,
    color: "error",
  },
];

export const FreelancerContractTabs = ({
  counts,
}: {
  counts?: ContractCountsByFreelancer;
}) => {
  const tabs = useMemo(() => getTabs(counts), [counts]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const location = useLocation(); // 👈 Use current location

  const currentTabIndex = useMemo(() => {
    const tabIndex = tabs.findIndex((t) => t.href === location.pathname);
    return tabIndex >= 0 ? tabIndex : 0;
  }, [location.pathname, tabs]);

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
