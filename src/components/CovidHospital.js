import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import ListSubheader from "@material-ui/core/ListSubheader";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ErrorIcon from "@material-ui/icons/Error";
import AvailableIcon from "@material-ui/icons/FiberManualRecord";
import React, { memo } from "react";
import { HealthCare, Hospitalcorona } from "../iconComponents";
import { ShimmerDetailHospital } from "./";

const CovidHospital = memo(
  ({
    provinceList,
    selectedProv,
    onProvChange,
    cityList,
    selectedCity,
    onCityChange,
    hospitalList,
    selectedHospital,
    onHospitalChange,
    hospitalDetail,
    loadState,
    screenSize,
  }) => {
    const useStyles = makeStyles((theme) => ({
      root: {
        display: "flex",
        justifyContent: "center",
        padding: "50px 10px",
        // paddingTop: 50,
        // marginBottom: 50,
      },
      hospitalWrapper: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        maxWidth: 1000,
        border: "5px solid #9e9e9e",
        padding: "20px 20px",
        borderRadius: 10,
        position: "relative",
      },
      titleWrapper: {
        display: "flex",
        position: "absolute",
        top: -25,
        right: "calc(50% - 200px)",
        width: 400,
        background: "#fafafa",
        justifyContent: "center",
        alignItems: "center",
        // background: "red",
        [theme.breakpoints.down("xs")]: {
          width: 250,
          top: -35,
          right: "calc(50% - 125px)",
        },
      },
      searchTitle: {
        color: theme.palette.light.grey500,
        // position: "absolute",
        // top: -25,
        // right: "calc(50% - 150px)",
        // width: 300,
        // background: "#fafafa",
        textAlign: "center",
        margin: "0 5px",
      },
      button: {
        display: "block",
        marginTop: theme.spacing(2),
      },
      formControl: {
        margin: theme.spacing(1),
      },
      detailRow: {
        marginBottom: 10,
        display: "flex",
      },
      leftDetail: {
        // background: "red",
        minWidth: 125,
      },
      rightDetail: {
        // background: "red",
        marginLeft: 10,
      },
      bedContent: {
        marginLeft: 20,
        border: "2px solid #9e9e9e",
        flex: 1,
        padding: "5px 10px",
        borderRadius: 5,
      },
      bedWrapper: {
        display: "flex",
        marginBottom: 10,
      },
      bedStatus: {
        display: "flex",
        alignItems: "center",
      },
    }));
    const classes = useStyles();
    console.log("rerender hospital --------------");

    const handleProvChange = (event) => {
      onProvChange(event.target.value);
    };
    const handleCityChange = (event) => {
      onCityChange(event.target.value);
    };
    const handleHospitalChange = (event) => {
      let tempArr = hospitalList.filter((item) => {
        return item.id === event.target.value;
      });

      // console.log(tempArr);
      onHospitalChange(tempArr[0]);
    };

    const DetailRow = ({ title, content }) => {
      return (
        <div className={classes.detailRow}>
          <Typography variant="subtitle1" className={classes.leftDetail}>
            {title}
          </Typography>
          <Typography variant="subtitle1">:</Typography>
          <Typography variant="subtitle1" className={classes.rightDetail}>
            {content}
          </Typography>
        </div>
      );
    };

    const BedRow = ({ number, bedName, bedAvailable }) => {
      return (
        <div className={classes.bedWrapper}>
          <Typography variant="subtitle1">{number}</Typography>
          <div className={classes.bedContent}>
            <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
              {bedName}
            </Typography>
            {bedAvailable > 0 ? (
              <div className={classes.bedStatus}>
                <AvailableIcon style={{ color: "#388e3c", marginRight: 7 }} />
                <Typography variant="subtitle1">
                  {bedAvailable} Kasur Tersedia
                </Typography>
              </div>
            ) : (
              <div className={classes.bedStatus}>
                <ErrorIcon style={{ color: "#ff5722", marginRight: 7 }} />
                <Typography variant="subtitle1">
                  Belum ada yang Tersedia
                </Typography>
              </div>
            )}
          </div>
        </div>
      );
    };

    return (
      // <div>
      //   <h1>ASU</h1>
      // </div>

      <div className={classes.root}>
        <div className={classes.hospitalWrapper}>
          <div className={classes.titleWrapper}>
            <Hospitalcorona width={30} />

            <Typography
              // variant="h4"
              variant={screenSize.width < 600 ? "h5" : "h4"}
              // style={{ fontWeight: "bold", color: "white" }}
              className={classes.searchTitle}
            >
              Cari Rumah Sakit
            </Typography>
            <HealthCare width={30} />
          </div>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="grouped-select">Pilih Provinsi</InputLabel>
            <Select
              defaultValue=""
              id="grouped-select"
              onChange={handleProvChange}
              value={selectedProv}
            >
              <ListSubheader>Pilih Provinsi</ListSubheader>
              {/* {loadState.prov ? (
              <ListSubheader>Pilih Provinsi</ListSubheader>
            ) : (
              <ListSubheader>
                {provinceList.length > 0
                  ? "Pilih Provinsi"
                  : "Maaf Daftar Provinsi Gagal Dimuat"}
              </ListSubheader>
            )} */}

              {provinceList.map((item, index) => {
                return (
                  <MenuItem key={index} value={item.id}>
                    {item.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>

          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="grouped-select">
              Pilih Kabupaten / Kota
            </InputLabel>
            <Select
              defaultValue=""
              id="grouped-select"
              onChange={handleCityChange}
              value={selectedCity}
              disabled={loadState.city}
            >
              <ListSubheader>Pilih Kabupaten / Kota</ListSubheader>

              {cityList.map((item, index) => {
                return (
                  <MenuItem key={index} value={item.id}>
                    {item.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>

          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="grouped-select">Pilih Rumah Sakit</InputLabel>
            <Select
              defaultValue=""
              id="grouped-select"
              onChange={handleHospitalChange}
              value={selectedHospital ? selectedHospital.id : null}
              disabled={loadState.hospital}
            >
              <ListSubheader>
                {hospitalList.length > 0
                  ? "Pilih Rumah Sakit"
                  : "Belum Ada Rumah Sakit yang Tersedia di Sistem"}
              </ListSubheader>

              {hospitalList.map((item, index) => {
                return (
                  <MenuItem
                    key={index}
                    value={item.id}
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography
                      variant="body2"
                      style={{ flex: 1, overflow: "hidden" }}
                    >
                      {item.name}
                    </Typography>
                    <div style={{ display: "flex", marginLeft: 10 }}>
                      {item.bed_availability > 0 ? (
                        <AvailableIcon
                          style={{
                            color: "#388e3c",
                            height: 20,
                            marginRight: 5,
                          }}
                        />
                      ) : (
                        <ErrorIcon
                          style={{
                            color: "#ff5722",
                            height: 20,
                            marginRight: 5,
                          }}
                        />
                      )}

                      {item.bed_availability > 0 ? "Tersedia" : "Kosong"}
                    </div>
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          {loadState.detail && <ShimmerDetailHospital />}

          {hospitalDetail && selectedHospital && (
            <div>
              <Typography
                variant="h6"
                style={{ marginTop: 30, marginBottom: 10 }}
              >
                Detail Rumah Sakit
              </Typography>

              <DetailRow title={"Nama"} content={hospitalDetail.name} />
              <DetailRow title={"Alamat"} content={hospitalDetail.address} />
              <DetailRow title={"Telepon"} content={hospitalDetail.phone} />
              <DetailRow
                title={"Update Terakhir"}
                content={selectedHospital.info}
              />

              <Typography
                variant="h6"
                style={{ marginTop: 10, marginBottom: 10 }}
              >
                Ketersediaan Kasur
              </Typography>
              {hospitalDetail.bedDetail.map((item, index) => {
                return (
                  <BedRow
                    key={index}
                    number={`${index + 1}.`}
                    bedName={item.stats.title}
                    bedAvailable={item.stats.bed_available}
                  />
                );
              })}
              {/* <BedRow number={"1."} bedName={"Mawar"} bedAvailable={4} /> */}
            </div>
          )}
          {/* {JSON.stringify(provinceList)} */}
        </div>
      </div>
    );
  }
);

export default CovidHospital;
