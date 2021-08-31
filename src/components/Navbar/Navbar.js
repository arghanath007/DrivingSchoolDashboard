import React from "react";
import {
  Divider,
  Drawer,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
} from "@material-ui/core";
import clsx from "clsx";
import { NavLink } from "react-router-dom";
import { getAuth } from "../../utils/LocalStorageUtil";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { version } from "../../../package.json";
import routes from "../../utils/routes";
import { Typography } from "@material-ui/core";
import { MERCHANT, SUPERVISOR, SUPER_ADMIN } from "config/constants";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
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
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  navLink: {
    textDecoration: "none",
    color: theme.palette.text.primary,
  },
}));

const Navbar = ({ handleDrawerClose, open }) => {
  const { role } = getAuth();
  const classes = useStyles();
  // console.log(role==='merchant')
  return (
    <Drawer
      variant="permanent"
      // variant="temporary"
      classes={{
        paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
      }}
      open={open}
    >
      <div className={classes.toolbarIcon}>
        <Grid container direction="row" justify="center" alignItems="flex-end">
          <Grid item>
            <Typography align="right" color="textPrimary" variant="h6">
              SaaS Portal
            </Typography>
          </Grid>
          {/* <h2 style={{ margin: 0 }}>SaaS Portal</h2> */}
        </Grid>
        <Typography align="right" color="textSecondary" variant="caption">
          {version}
        </Typography>
        <IconButton onClick={handleDrawerClose}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <List>
        <div>
          {routes
            .filter((route) => {
              if (route.role === role) {
                return route;
              }
              return null;
            })
            .map((prop) => {
              if (role === SUPER_ADMIN && !prop.hidden) {
                return (
                  <NavLink
                    key={prop.path}
                    to={"/" + prop.role + prop.path}
                    className={classes.navLink}
                  >
                    <ListItem button>
                      <ListItemIcon>
                        <prop.icon />
                      </ListItemIcon>
                      <ListItemText primary={prop.name} />
                    </ListItem>
                  </NavLink>
                );
              }
              if (role === MERCHANT && !prop.hidden) {
                return (
                  <NavLink
                    key={prop.path}
                    to={"/" + prop.role + prop.path}
                    className={classes.navLink}
                  >
                    <ListItem button>
                      <ListItemIcon>
                        <prop.icon />
                      </ListItemIcon>
                      <ListItemText primary={prop.name} />
                    </ListItem>
                  </NavLink>
                );
              }
              if (role === SUPERVISOR && !prop.hidden) {
                return (
                  <NavLink
                    key={prop.path}
                    to={"/" + prop.role + prop.path}
                    className={classes.navLink}
                  >
                    <ListItem button>
                      <ListItemIcon>
                        <prop.icon />
                      </ListItemIcon>
                      <ListItemText primary={prop.name} />
                    </ListItem>
                  </NavLink>
                );
              } else {
                return null;
              }
            })}
        </div>
      </List>
    </Drawer>
  );
};

export default Navbar;
