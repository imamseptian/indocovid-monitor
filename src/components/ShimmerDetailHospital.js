import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Skeleton from "@material-ui/lab/Skeleton";
import React, { memo } from "react";

const ShimmerDetailHospital = memo((props) => {
  const useStyles = makeStyles((theme) => ({
    wrapper: {
      marginTop: 30,
    },
    text: {
      height: 35,
    },
    rowShimmer: {
      display: "flex",
      alignItems: "center",
    },
    shimmerLeft: {
      width: 125,
    },
    shimmerRight: {
      flex: 1,
      marginLeft: 10,
    },
    bedLeft: {
      width: 30,
    },
    bedRight: {
      flex: 1,
      marginLeft: 10,
      height: 100,
    },
  }));
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      <Typography variant="h6">Detail Rumah Sakit</Typography>
      {[...Array(3)].map((item, index) => (
        <div key={index} className={classes.rowShimmer}>
          <Skeleton
            variant="text"
            className={`${classes.text} ${classes.shimmerLeft}`}
          />
          <Skeleton
            variant="text"
            className={`${classes.text} ${classes.shimmerRight}`}
          />
        </div>
      ))}
      <Typography variant="h6">Ketersediaan Kasur</Typography>
      {[...Array(4)].map((item, index) => (
        <div key={index} className={classes.rowShimmer}>
          <Skeleton
            variant="text"
            className={`${classes.text} ${classes.bedLeft}`}
          />
          <Skeleton
            variant="text"
            className={`${classes.text} ${classes.bedRight}`}
          />
        </div>
      ))}
    </div>
  );
});

export default ShimmerDetailHospital;
