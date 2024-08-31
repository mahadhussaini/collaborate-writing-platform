import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import { useMediaQuery } from "@mui/material";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const isMobile = useMediaQuery("(max-width:768px)");

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          CollaborateDocs
        </Typography>
        {!isMobile && (
          <div className="navbar-links">
            <Button color="inherit" component={Link} to="/dashboard">
              Dashboard
            </Button>
            <Button color="inherit" component={Link} to="/profile">
              Profile
            </Button>
            <Button color="inherit" component={Link} to="/settings">
              Settings
            </Button>
          </div>
        )}
        {isMobile && (
          <>
            <IconButton
              className="navbar-menu-toggle"
              size="large"
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={handleMenuOpen}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              PaperProps={{
                sx: {
                  width: "200px",
                  "@media (max-width: 480px)": {
                    width: "150px",
                  },
                },
              }}
            >
              <MenuItem
                onClick={handleMenuClose}
                component={Link}
                to="/dashboard"
              >
                Dashboard
              </MenuItem>
              <MenuItem
                onClick={handleMenuClose}
                component={Link}
                to="/profile"
              >
                Profile
              </MenuItem>
              <MenuItem
                onClick={handleMenuClose}
                component={Link}
                to="/settings"
              >
                Settings
              </MenuItem>
            </Menu>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
