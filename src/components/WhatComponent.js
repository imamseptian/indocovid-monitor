import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";
import React from "react";
import { formatNumber } from "../functions";
import {
  Cryemoji,
  Happyemoji,
  IconCovid19,
  Sickemoji,
  WhatCorona,
} from "../iconComponents";

const WhatComponent = ({ covidCases, toogleAnimation }) => {
  const useStyles = makeStyles((theme) => ({
    wrapper: {
      display: "flex",
      // background: theme.palette.light.background,
      // padding: "10px 20px",
      paddingLeft: 20,
      paddingRight: 20,
      // alignItems: "center",
      justifyContent: "center",

      paddingTop: 50,
      paddingBottom: 50,
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column-reverse",
        alignItems: "center",
        paddingTop: 10,
      },
    },

    wrapperDetail: {
      display: "flex",

      [theme.breakpoints.down("xs")]: {
        flexDirection: "column",
      },
    },
    whatCovid: {
      width: 350,

      [theme.breakpoints.down("sm")]: {
        width: 300,
        // background: "red",
      },
    },
    leftContent: {
      // width: 700,
      // width: "calc(100% - 500px)",
      // flex: 1,
      maxWidth: 600,
      // background: "blue",
      display: "flex",
      alignItems: "center",
      [theme.breakpoints.down("sm")]: {
        width: "100%",
        marginTop: 40,
        maxWidth: "100%",
        // background: "red",
      },
    },
    leftWrapper: {
      border: "5px solid #9e9e9e",

      borderRadius: 10,
      padding: "10px 10px",
      position: "relative",
      // margintop: 50,
      paddingTop: 30,
      [theme.breakpoints.down("xs")]: {
        paddingTop: 40,
      },

      // background: "green",
    },
    coronaInfoTitle: {
      color: theme.palette.light.grey500,
      position: "absolute",
      top: -25,

      right: "calc(50% - 200px)",
      width: 400,
      background: "#fafafa",
      textAlign: "center",

      [theme.breakpoints.down("xs")]: {
        width: 200,
        right: "calc(50% - 100px)",
        top: -50,
      },
    },
    coronaInfoContent: {
      color: theme.palette.light.grey500,
      marginBottom: 20,
    },
  }));
  const classes = useStyles();

  const ButtonCase = (props) => {
    return (
      <Box
        style={{
          background: `linear-gradient(to top right,${props.color1},${props.color1})`,
          // borderRadius: 5,
          borderTopRightRadius: 10,
          borderTopLeftRadius: 3,
          borderBottomRightRadius: 3,
          borderBottomLeftRadius: 10,
          padding: "5px 20px",
          display: "flex",
          alignItems: "center",
          boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
          marginRight: 5,
          // width: "50%",
          minWidth: 250,
          justifyContent: "center",
          position: "relative",
        }}
        // className="custom-card-anim"
        className={toogleAnimation && "custom-card-anim"}
      >
        <div
          style={{
            position: "absolute",
            top: -15,
            left: 0,
            display: "flex",
            alignItems: "center",
          }}
        >
          {/* <IconCovid19 width={40} /> */}
          {props.icon}
        </div>

        <Typography variant="h6" style={{ color: "white", marginLeft: 10 }}>
          {/* {covidCases === null ? 0 : formatNumber(covidCases.positif)}{" "} */}
          {props.total} {props.keyword}
        </Typography>
      </Box>
    );
  };

  const ButtonDetail = (props) => {
    return (
      <Box
        style={{
          background: `linear-gradient(to top right,${props.color1},${props.color1})`,
          borderTopRightRadius: 10,
          borderTopLeftRadius: 3,
          borderBottomRightRadius: 3,
          borderBottomLeftRadius: 10,
          padding: "5px 20px",
          paddingTop: 10,
          paddingLeft: 30,
          display: "flex",
          flexDirection: "column",
          marginBottom: 20,

          boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
          marginRight: 20,
          // width: "50%",

          position: "relative",
        }}
        // className="custom-card-anim"
        className={toogleAnimation && "custom-card-anim"}
      >
        <div style={{ position: "absolute", top: -15, left: -10 }}>
          {/* <IconCovid19 width={40} /> */}
          {props.icon}
        </div>
        <Typography
          variant="title1"
          style={{ color: "white", marginLeft: 10, fontWeight: "bold" }}
        >
          {props.keyword}
        </Typography>

        <Typography variant="title1" style={{ color: "white", marginLeft: 10 }}>
          {/* {covidCases === null ? 0 : formatNumber(covidCases.positif)}{" "} */}
          {props.total}
        </Typography>
      </Box>
    );
  };

  return (
    <div className={clsx(classes.wrapper)}>
      <div className={classes.leftContent}>
        <div className={classes.leftWrapper}>
          <Typography
            variant="h4"
            // style={{ fontWeight: "bold", color: "white" }}
            className={classes.coronaInfoTitle}
          >
            Covid-19 di Indonesia
          </Typography>
          <Typography
            variant="body1"
            // style={{ color: "white", marginBottom: 20 }}
            className={classes.coronaInfoContent}
            align="justify"
          >
            Indonesia pertama kali mengkonfirmasi kasus Covid-19 pada tanggal 2
            Maret 2020. Hingga saat ini pemerintah masi melakukan tindakan untuk
            menangani penyebaran virus ini, saat ini pemerintah menerapkan
            kebijakan Pemberlakukan Pembatasan Kegiatan Masyarakat (PPKM) untuk
            menekan penyebaran virus Covid-19. Ringkasan kasus covid-19 di
            Indonesia adalah sebagai berikut
            {/* {JSON.stringify(covidCases)} */}
          </Typography>

          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            style={{ opacity: covidCases === null ? 0 : 1 }}
          >
            <ButtonCase
              keyword="Kasus"
              icon={<IconCovid19 width={40} />}
              total={covidCases === null ? 0 : formatNumber(covidCases.positif)}
              color1="#d84315"
              color2="#f4511e"
            />
            <Box className={classes.wrapperDetail} mt={2}>
              <ButtonDetail
                keyword="Sembuh"
                icon={<Happyemoji width={30} />}
                total={
                  covidCases === null ? 0 : formatNumber(covidCases.sembuh)
                }
                color1="#2e7d32"
                color2="#43a047"
              />
              <ButtonDetail
                keyword="Dirawat"
                icon={<Sickemoji width={35} />}
                total={
                  covidCases === null ? 0 : formatNumber(covidCases.sembuh)
                }
                color1="#f9a825"
                color2="#fdd835"
              />
              <ButtonDetail
                keyword="Meninggal"
                icon={<Cryemoji width={30} />}
                total={
                  covidCases === null ? 0 : formatNumber(covidCases.sembuh)
                }
                color1="#424242"
                color2="#757575"
              />
            </Box>

            {/* <CaseDetail /> */}
          </Box>
        </div>
      </div>

      <WhatCorona className={classes.whatCovid} />
    </div>
  );
};

export default WhatComponent;
