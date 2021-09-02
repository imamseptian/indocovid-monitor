import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import React from "react";

// const drawerWidth = 240;
const drawerWidth = "100%";
const MyCustomDrawer = ({
  open,
  handleDrawerClose,
  sec1Scroll,
  sec2Scroll,
  sec3Scroll,
}) => {
  const useStyles = makeStyles((theme) => ({
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: "flex",
      alignItems: "center",
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: "flex-end",
    },
    drawerText: {
      textDecoration: "none",
    },
  }));
  const classes = useStyles();

  return (
    <Drawer
      className={classes.drawer}
      variant="temporary"
      anchor="top"
      open={open}
      onClose={handleDrawerClose}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.drawerHeader}>
        <IconButton onClick={handleDrawerClose}>
          <KeyboardArrowUpIcon />
        </IconButton>
      </div>

      <List>
        <ListItem
          button
          onClick={() => {
            sec1Scroll();
            handleDrawerClose();
          }}
        >
          <ListItemText primary={"Covid-19 Indonesia"} />
        </ListItem>

        <ListItem
          button
          onClick={() => {
            sec2Scroll();
            handleDrawerClose();
          }}
        >
          <ListItemText primary={"Perkembangan"} />
        </ListItem>

        <ListItem
          button
          onClick={() => {
            sec3Scroll();
            handleDrawerClose();
          }}
        >
          <ListItemText primary={"RS-Covid"} />
        </ListItem>
      </List>
      <Divider />
    </Drawer>
  );
};

export default MyCustomDrawer;
