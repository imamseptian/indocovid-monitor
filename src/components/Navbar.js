import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Fab from "@material-ui/core/Fab";
import Slide from "@material-ui/core/Slide";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Zoom from "@material-ui/core/Zoom";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import MenuIcon from "@material-ui/icons/Menu";
import PropTypes from "prop-types";
import React from "react";
import { MyCustomDrawer } from "./";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  homeButton: {
    flexGrow: 1,
  },
  menuDisplay: {
    display: "flex",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  menuIconDisplay: {
    display: "none",
    cursor: "pointer",
    // display: "none",
    [theme.breakpoints.down("sm")]: {
      display: "block",
    },
  },
  menuOption: {
    marginRight: 20,
    cursor: "pointer",
  },
  toolBar: {
    justifyContent: "space-between",
    background: theme.palette.light.background,
  },
}));

function ScrollTop(props) {
  const { children, window } = props;
  const classes = useStyles();
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      "#back-to-top-anchor"
    );

    if (anchor) {
      anchor.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role="presentation" className={classes.root}>
        {children}
      </div>
    </Zoom>
  );
}

function HideOnScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

ScrollTop.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default function BackToTop(props) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <HideOnScroll {...props}>
        <AppBar>
          <Toolbar className={classes.toolBar}>
            <Typography variant="h6" className={classes.homeButton}>
              IndoCovid-Monitor
            </Typography>
            <div className={classes.menuDisplay}>
              <Typography
                className={classes.menuOption}
                onClick={() => {
                  props.sec1Scroll();
                }}
                variant="subtitle1"
              >
                Covid-19 Indonesia
              </Typography>
              <Typography
                onClick={() => {
                  props.sec2Scroll();
                }}
                className={classes.menuOption}
                variant="subtitle1"
              >
                Perkembangan
              </Typography>
              <Typography
                onClick={() => {
                  props.sec3Scroll();
                }}
                className={classes.menuOption}
                variant="subtitle1"
              >
                RS-Covid
              </Typography>
            </div>
            <MenuIcon
              onClick={() => {
                // alert("a");
                setOpen(true);
              }}
              className={classes.menuIconDisplay}
              fontSize="large"
            />
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <MyCustomDrawer
        sec1Scroll={props.sec1Scroll}
        sec2Scroll={props.sec2Scroll}
        sec3Scroll={props.sec3Scroll}
        open={open}
        handleDrawerClose={handleDrawerClose}
      />
      <Toolbar id="back-to-top-anchor" />
      {props.children}
      <ScrollTop {...props}>
        <Fab color="secondary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </React.Fragment>
  );
}
