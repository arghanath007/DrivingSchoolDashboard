import React, { Suspense, useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Copyright from "../components/Copyright";
// import Navbar from "../components/Navbar/Navbar";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { Container, LinearProgress, Menu, MenuItem } from "@material-ui/core";
import { getAuth, resetAuth } from "../utils/LocalStorageUtil";
import { Redirect, Route, Switch, useHistory } from "react-router";
// import routes from "../utils/routes";
import Brightness7Icon from "@material-ui/icons/Brightness7";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import { logOut } from "API/auth";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(1),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
}));

// const getRoutes = (routes) => {
//   return routes.map((prop, key) => {
//     const { role } = getAuth();
//     if (role) {
//       return (
//         <Route
//           path={"/" + prop.role + prop.path}
//           exact
//           render={(props) => <prop.component {...props} />}
//           key={key}
//         />
//       );
//     } else {
//       return <Redirect to="/" />;
//     }
//   });
// };

const Panel = ({ toggleTheme, isLightTheme }) => {
  const history = useHistory();
  const classes = useStyles();
  const { role } = getAuth();
  const [open, setOpen] = useState(true);
  const [anchorEl, setAnchorEl] = React.useState(false);
  const openMenu = Boolean(anchorEl);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  // const handleDrawerClose = () => {
  //   setOpen(false);
  // };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            Dashboard
          </Typography>
          <div>
            <IconButton
              aria-label="Toggle Theme"
              color="inherit"
              onClick={toggleTheme}
            >
              {isLightTheme ? <Brightness4Icon /> : <Brightness7Icon />}
            </IconButton>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircleIcon />
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
              open={openMenu}
              onClose={handleClose}
            >
              <MenuItem
                onClick={() => {
                  history.push(`/${role}/profile`);
                  handleClose();
                }}
              >
                My Profile
              </MenuItem>
              <MenuItem
                onClick={() => {
                  logOut()
                    .then((res) => {
                      // console.log(res);
                      resetAuth();
                      history.push("/");
                    })
                    .catch();
                }}
              >
                Log Out
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>

      {/* <Navbar
        open={open}
        handleDrawerClose={handleDrawerClose}
        handleDrawerOpen={handleDrawerOpen}
      /> */}

      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Suspense fallback={<LinearProgress color="secondary" />}>
          <Container className={classes.container}>
            {/* <Switch>{getRoutes(routes)}</Switch> */}
          </Container>

          <Box py={3}>
            <Copyright />
          </Box>
        </Suspense>
      </main>
    </div>
  );
};

export default Panel;
