import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React, { memo, useEffect, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { formatNumber } from "../functions";
import { DoctorExplain } from "../iconComponents";

const monthNames = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

const CovidGraph = memo(({ screenSize, covidHistory }) => {
  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      background: theme.palette.light.background,
      padding: "0px 50px",
      paddingBottom: 20,
    },
    wrapper: {
      display: "flex",
      alignItems: "center",

      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
        paddingTop: 40,
      },
    },
    graphWrapper: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    doctorSVG: {
      width: 500,
      transform: "scaleX(-1)",
      webkitTransform: "scaleX(-1)",

      [theme.breakpoints.down("xs")]: {
        width: 300,
        // background: "red",
      },
    },
  }));
  const classes = useStyles();

  console.log("MY GRAPH");

  const [graphSize, setgraphSize] = useState({
    width: 300,
    height: 150,
  });

  const [minMaxPositif, setminMaxPositif] = useState({ min: 0, max: 10000 });

  const minMaxCovid = (paramData, keyword, callback) => {
    let min = paramData[0][keyword];
    let max = paramData[0][keyword];
    paramData.forEach((item, index) => {
      if (item[keyword] < min) {
        min = item[keyword];
      }
      if (item[keyword] > max) {
        max = item[keyword];
      }
    });

    callback({ min: min - 0.0005 * min, max: max });
  };

  useEffect(() => {
    console.log("SIZE CHANGE");
    if (screenSize.width > 600) {
      setgraphSize({ ...graphSize, width: 500, height: 250 });
    } else {
      setgraphSize({ ...graphSize, width: 300, height: 150 });
    }
  }, [screenSize]);

  useEffect(() => {
    if (covidHistory.length > 0) {
      minMaxCovid(covidHistory, "positif_kumulatif", setminMaxPositif);
    }
  }, [covidHistory]);

  return (
    // <div className={classes.root}>
    //   <h1>GRAPH</h1>
    // </div>

    <div className={classes.root}>
      <div className={classes.wrapper}>
        <DoctorExplain width={400} className={classes.doctorSVG} />
        <div className={classes.graphWrapper}>
          <Typography
            variant="h5"
            align="center"
            style={{ color: "white", marginBottom: 30 }}
          >
            Grafik Perkembangan Kasus Positif
          </Typography>
          <ResponsiveContainer
            width={graphSize.width}
            height={graphSize.height}
          >
            <LineChart
              data={covidHistory}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="tanggal"
                stroke="#fff"
                style={{
                  // textAnchor: "middle",
                  textAnchor: "start",
                  fontSize: 12,
                  fill: "rgba(255, 255, 255, 0.87)",
                }}
                tickFormatter={(item) => {
                  let tempTanggal = new Date(item);
                  return `${tempTanggal.getDate()}/${
                    tempTanggal.getMonth() + 1
                  }`;
                }}
              />
              <YAxis
                type="number"
                tickMargin={10}
                stroke="#fff"
                domain={[minMaxPositif.min, minMaxPositif.max]}
                tickFormatter={(item) => {
                  let formattedNumber = formatNumber(Math.round(item));
                  return formattedNumber;
                }}
                style={{
                  textAnchor: "end",
                  // fontSize: "60%",
                  fontSize: 12,
                  marginBottom: 30,
                  fill: "rgba(255, 255, 255, 0.87)",
                }}
              />
              <Tooltip
                // Box stye
                contentStyle={{
                  // background: "#424242"
                  background: `linear-gradient(to top right,#424242,#424242)`,
                  borderRadius: 4,
                }}
                //top title style
                labelStyle={{ color: "white", fontWeight: "bold" }}
                itemStyle={{ color: "white" }}
                labelFormatter={(item) => {
                  let tempTanggal = new Date(item);
                  return `${tempTanggal.getDate()} ${
                    monthNames[tempTanggal.getMonth()]
                  } ${tempTanggal.getFullYear()}`;
                }}
                formatter={(value, name, props) => {
                  return [formatNumber(value), "positif"];
                }}
              />
              {/* <Legend /> */}
              <Line
                type="monotone"
                dataKey="positif_kumulatif"
                name="Jumlah Positif"
                stroke="#ffeb3b"
                strokeWidth={3}
                activeDot={{ r: 8 }}
              />
              {/* <Line type="monotone" dataKey="dirawat" stroke="#82ca9d" /> */}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
});

export default CovidGraph;
