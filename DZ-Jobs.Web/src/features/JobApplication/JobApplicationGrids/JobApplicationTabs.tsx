import { Badge, Box, Tab, Tabs } from "@mui/material";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import { JobApplicationCountsByStatus } from "../../../app/api";


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
    counts: accepted,
    color: "success",
  },
  {
    label: "Accepted",
    href: "/freelancer-dashboard/accepted",
    counts: accepted,
    color: "success",
  },
  {
    label: "rejected",
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

  const getCurrentTabIndex = () => {
    const tabIndex = tabs.findIndex((t) => t.href === window.location.pathname);
    return tabIndex >= 0 ? tabIndex : 0;
  };

  return (
    <Box>
      <Tabs value={getCurrentTabIndex()}>
        {tabs.map(({ href, color, label, counts }) => (
          <Tab
            key={label}
            component={Link}
            color="inherit"
            to={href}
            label={
              <Badge badgeContent={counts || 0} color={color} sx={{ px: 2 }}>
                <Box>{label}</Box>
              </Badge>
            }
          ></Tab>
        ))}
      </Tabs>
    </Box>
  );
};
