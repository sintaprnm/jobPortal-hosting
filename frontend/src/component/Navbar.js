import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  makeStyles,
  IconButton,
  Popover, // Tambahkan Popover
  MenuItem, // Tambahkan MenuItem
} from "@material-ui/core";
import { Menu as MenuIcon } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import isAuth, { userType } from "../lib/isAuth";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Navbar = (props) => {
  const classes = useStyles();
  let history = useHistory();

  const [anchorEl, setAnchorEl] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuClick = (location) => {
    history.push(location);
    handleClose();
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <AppBar position="fixed" style={{ backgroundColor: "#225f7e" }}>
      <Toolbar style={{ minHeight: "80px" }}>
        <Typography variant="h6" className={classes.title}>
          <img src="logo1.ico" width="30px" height="auto" alt="Logo" /> JOB HARBOR
        </Typography>
        {windowWidth >= 768 ? (
          <div className="nav-links">
            {isAuth() ? (
              userType() === "recruiter" ? (
                <>
                  <Button color="inherit" onClick={() => handleMenuClick("/home")}>
                    Home
                  </Button>
                  <Button
                    color="inherit"
                    onClick={() => handleMenuClick("/addjob")}
                  >
                    Add Jobs
                  </Button>
                  <Button
                    color="inherit"
                    onClick={() => handleMenuClick("/myjobs")}
                  >
                    Posted
                  </Button>
                  <Button
                    color="inherit"
                    onClick={() => handleMenuClick("/employees")}
                  >
                    Employees
                  </Button>
                  <Button
                    color="inherit"
                    onClick={() => handleMenuClick("/profile")}
                  >
                    Profile
                  </Button>
                  <Button
                    color="inherit"
                    onClick={() => handleMenuClick("/logout")}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button color="inherit" onClick={() => handleMenuClick("/home")}>
                    Home
                  </Button>
                  <Button
                    color="inherit"
                    onClick={() => handleMenuClick("/applications")}
                  >
                    Applied
                  </Button>
                  <Button
                    color="inherit"
                    onClick={() => handleMenuClick("/profile")}
                  >
                    Profile
                  </Button>
                  <Button
                    color="inherit"
                    onClick={() => handleMenuClick("/logout")}
                  >
                    Logout
                  </Button>
                </>
              )
            ) : (
              <>
                <Button color="inherit" onClick={() => handleMenuClick("/login")}>
                  Login
                </Button>
                <Button
                  color="inherit"
                  onClick={() => handleMenuClick("/signup")}
                >
                  SignUp
                </Button>
              </>
            )}
          </div>
        ) : (
          <div className="menu-icon-container">
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleClick}
              className="menu-icon"
            >
              <MenuIcon />
            </IconButton>
            <Popover
              open={Boolean(anchorEl)}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <div style={{ width: "150px" }}>
              {isAuth() ? (
                userType() === "recruiter" ? (
                  <>
                    <MenuItem onClick={() => handleMenuClick("/home")}>Home</MenuItem>
                    <MenuItem onClick={() => handleMenuClick("/addjob")}>Add Jobs</MenuItem>
                    <MenuItem onClick={() => handleMenuClick("/myjobs")}>Posted</MenuItem>
                    <MenuItem onClick={() => handleMenuClick("/employees")}>Employees</MenuItem>
                    <MenuItem onClick={() => handleMenuClick("/profile")}>Profile</MenuItem>
                    <MenuItem onClick={() => handleMenuClick("/logout")}>Logout</MenuItem>
                  </>
                ) : (
                  <>
                    <MenuItem onClick={() => handleMenuClick("/home")}>Home</MenuItem>
                    <MenuItem onClick={() => handleMenuClick("/applications")}>Applied</MenuItem>
                    <MenuItem onClick={() => handleMenuClick("/profile")}>Profile</MenuItem>
                    <MenuItem onClick={() => handleMenuClick("/logout")}>Logout</MenuItem>
                  </>
                )
              ) : (
                <>
                  <MenuItem onClick={() => handleMenuClick("/login")}>Login</MenuItem>
                  <MenuItem onClick={() => handleMenuClick("/signup")}>SignUp</MenuItem>
                </>
              )} 
              </div>
            </Popover>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;