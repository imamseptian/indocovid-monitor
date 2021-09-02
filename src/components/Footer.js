import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CopyrightIcon from "@material-ui/icons/Copyright";
import React from "react";

const Footer = () => {
  const useStyles = makeStyles((theme) => ({
    root: {
      background: theme.palette.light.background,
      padding: "10px 0",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "wrap",
    },
    footerText: {
      color: "white",
    },
    github: {
      color: "#ffeb3b",
    },
  }));
  const classes = useStyles();
  return (
    <footer className={classes.root}>
      <Typography variant="h6" className={classes.footerText}>
        Created By{" "}
        <a
          href="https://github.com/imamseptian"
          target="_blank"
          rel="noreferrer"
          className={classes.github}
        >
          Imam Septian
        </a>{" "}
        |
      </Typography>
      <CopyrightIcon style={{ margin: "0 10px", color: "white" }} />
      <Typography variant="h6" className={classes.footerText}>
        2021 All rights reserved.
      </Typography>
    </footer>
  );
};

export default Footer;
