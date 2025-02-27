import { Badge, Box, Tab, Tabs } from "@mui/material";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import { JobCountsByStatus } from "../../../app/api";


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
    label: "Jobs",
    href: "/employer-dashboard",
    counts: closed,
    color: "success",
  },
  {
    label: "In Progress",
    href: "/employer-dashboard/inprogress-jobs",
    counts: inProgress,
    color: "success",
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

export const JobTabs = ({
  counts,
}: {
  counts?: JobCountsByStatus;
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
