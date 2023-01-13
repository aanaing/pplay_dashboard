import React from "react";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "../style/App.css";

const drawerWidth = 300;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Header = ({ handleDrawerOpen, open }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);

  // const { data, loading } = useQuery(PENDING_ORDERS, {
  //   variables: { status: "%pending%" },
  // });

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedUser");
    //   history.push('/login')
    navigate("/login");
  };

  // if (loading) {
  //   return (
  //     <div>
  //       <em>Loading...</em>
  //     </div>
  //   );
  // }

  return (
    <AppBar position="fixed" open={open}>
      <Toolbar className="AppBar">
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 1, ml: 0.5 }}
          onClick={handleDrawerOpen}
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </IconButton>
        <Typography variant="h5" sx={{ flexGrow: 3 }} fontWeight="bold">
          PowerPlay Dashboard
        </Typography>

        <div>
          <span color="info">Dr.P</span>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
          >
            {/* <AccountCircle sx={{ color: "#59595a" }} /> */}
            <AccountCircle color="warning" />
          </IconButton>

          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
