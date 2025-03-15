import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Button,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  BottomNavigation,
  BottomNavigationAction,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Brightness4,
  Brightness7,
  AccountCircle,
  Work,
  Phone,
  PinDropRounded,
  Edit,
  Logout,
} from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { toggleDarkMode } from "../../app/slicies/themeSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { UserRole } from "../../app/services/enums";

const Header: React.FC = () => {
  const darkMode = useAppSelector((state) => state.theme.darkMode);
  const user = useSelector((state: RootState) => state.auth); 

  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const [isProfileOpen, setProfileOpen] = useState(false);

  const menuItems = [
    // { label: "About Me", href: "/about", icon: <AccountCircle /> },
    // { label: "Skills", href: "/skills", icon: <Work /> },
    // { label: "Projects", href: "/projects", icon: <PinDropRounded /> },
    // { label: "Contact", href: "/contact", icon: <Phone /> },
    {
      label: "Jobs",
      href: user.role === UserRole.EMPLOYER ? "/employer-dashboard" : "/freelancer-dashboard",icon: <AccountCircle />},
    { label: "Contracts", href: "#", icon: <Work /> },
    { label: "My Work", href: "#", icon: <PinDropRounded /> },
    { label: "Message", href: "#", icon: <Phone /> },
  ];

  const currentIndex = menuItems.findIndex((item) => item.href === location.pathname);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      {/* Transparent Header */}
      <AppBar
        position="sticky"
        sx={{
          background: "transparent",
          boxShadow: "none",
          backdropFilter: "blur(10px)",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
          {/* Left Section - Dark Mode Toggle & Title */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              onClick={() => dispatch(toggleDarkMode())}
              sx={{
                color: darkMode ? "#fff" : "#000",
                "&:hover": { color: darkMode ? "#1976d2" : "#333" },
                mr: 2,
              }}
            >
              {darkMode ? <Brightness7 /> : <Brightness4 />}
            </IconButton>

            <Typography variant="h6" sx={{ fontWeight: "bold", color: "#14A800" }}>
              DZ-Jobs
            </Typography>
          </Box>

          {/* Center Section - Desktop Navigation */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              gap: 2,
              flexGrow: 1,
              justifyContent: "center",
            }}
          >
            { user.userId &&  menuItems.map((item, index) => (
              <Button
                key={item.label}
                onClick={() => navigate(item.href)}
                sx={{
                  fontWeight: "bold",
                  color: darkMode ? "#fff" : "#000",
                  "&:hover": { color: darkMode ? "#1976d2" : "#333" },
                  borderBottom:
                    currentIndex === index ? `2px solid ${darkMode ? "#1976d2" : "#333"}` : "none",
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>

          {/* Right Section - Profile Icon */}
          { user.userId &&  <IconButton
            onClick={() => setProfileOpen(!isProfileOpen)}
            sx={{
              color: darkMode ? "#fff" : "#000",
              "&:hover": { color: darkMode ? "#1976d2" : "#333" },
              ml: "auto", // Pushes the profile icon to the right on mobile
            }}
          >
            <AccountCircle />
          </IconButton>
}
        </Toolbar>
      </AppBar>

      {/* Bottom Navigation for Mobile */}
      <Box sx={{ display: { xs: "block", md: "none" } }}>
        <BottomNavigation
          value={currentIndex}
          onChange={(_, newValue) => navigate(menuItems[newValue].href)}
          showLabels
          sx={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 1000,
            background: darkMode ? "#333" : "#fff",
            boxShadow: "0 -2px 5px rgba(0,0,0,0.1)",
          }}
        >
          {menuItems.map((item) => (
            <BottomNavigationAction
              key={item.label}
              label={isMobile ? "" : item.label}
              icon={item.icon}
              sx={{
                color: darkMode ? "#ccc" : "#666",
                "&.Mui-selected": {
                  color: darkMode ? "#1976d2" : "#000",
                },
              }}
            />
          ))}
        </BottomNavigation>
      </Box>

      {/* Right Sidebar for Profile */}
      <Drawer anchor="right" open={isProfileOpen} onClose={() => setProfileOpen(false)}>
        <List sx={{ width: 250 }}>
          <ListItemButton disableRipple>
            <Typography variant="h6" fontWeight="bold">
              Profile Settings
            </Typography>
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <Edit />
            </ListItemIcon>
            <ListItemText primary="Edit Profile" />
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <Logout />
            </ListItemIcon>
            <ListItemText onClick={() => {navigate('/login'); window.location.reload()}} primary="Logout" />
          </ListItemButton>
        </List>
      </Drawer>
    </>
  );
};

export default Header;
