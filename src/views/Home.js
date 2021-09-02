import axios from "axios";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  CovidGraph,
  CovidHospital,
  Footer,
  Navbar,
  WhatComponent,
} from "../components";

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

const Home = () => {
  const [toogleAnimation, settoogleAnimation] = useState(false);
  const [covidCases, setcovidCases] = useState(null);
  const [covidHistory, setcovidHistory] = useState([]);
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  const [provinceList, setprovinceList] = useState([]);
  const [selectedProv, setselectedProv] = useState(null);
  const [cityList, setcityList] = useState([]);
  const [selectedCity, setselectedCity] = useState(null);

  const [hospitalList, sethospitalList] = useState([]);
  const [selectedHospital, setselectedHospital] = useState(null);
  const [hospitalDetail, sethospitalDetail] = useState(null);

  const [loadSelect, setloadSelect] = useState({
    prov: false,
    city: false,
    hospital: false,
    detail: false,
  });

  const sec1 = useRef(null);
  const sec2 = useRef(null);
  const sec3 = useRef(null);

  const sec1Scroll = () => {
    window.scrollTo(0, sec1.current.offsetTop - 50);
  };
  const sec2Scroll = () => {
    window.scrollTo(0, sec2.current.offsetTop - 50);
  };
  const sec3Scroll = () => {
    window.scrollTo(0, sec3.current.offsetTop - 50);
  };

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (toogleAnimation) {
      setTimeout(() => {
        settoogleAnimation(false);
      }, 1000);
    }
  }, [toogleAnimation]);

  useEffect(() => {
    setloadSelect({ ...loadSelect, prov: true });
    axios
      // .get(`https://apicovid19indonesia-v2.vercel.app/api/indonesia`)
      .get(`https://apicovid19indonesia-v2.vercel.app/api/indonesia/more`)
      .then((res) => {
        setcovidCases(res.data.total);
        settoogleAnimation(true);
        // console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      // .get(`https://apicovid19indonesia-v2.vercel.app/api/indonesia`)
      .get(`https://apicovid19indonesia-v2.vercel.app/api/indonesia/harian`)
      .then((res) => {
        // setcovidHistory(res.data);
        let tempArr = res.data.filter((data, index) => {
          // return index > res.data.length - 21 && index <= res.data.length - 1;
          return index > res.data.length - 11 && index <= res.data.length - 1;
        });
        setcovidHistory(tempArr);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(`https://rs-bed-covid-api.vercel.app/api/get-provinces`)
      .then((res) => {
        setprovinceList(res.data.provinces);
        setloadSelect({ ...loadSelect, prov: false });
      })
      .catch((error) => {
        setloadSelect({ ...loadSelect, prov: false });
        console.log("error awal prov");
        console.log(error);
      });
  }, []);

  useEffect(() => {
    setcityList([]);
    setselectedCity(null);
    if (selectedProv) {
      console.log("AXIOS PROV");
      setloadSelect({ ...loadSelect, city: true });
      axios
        .get(
          `https://rs-bed-covid-api.vercel.app/api/get-cities?provinceid=${selectedProv}`
        )
        .then((res) => {
          setcityList(res.data.cities);
          setloadSelect({ ...loadSelect, city: false });
        })
        .catch((error) => {
          setloadSelect({ ...loadSelect, city: false });
          console.log("error provinsi");
          setselectedProv(null);
          setcityList([]);
          console.log(error);
        });
    }
  }, [selectedProv]);

  useEffect(() => {
    setselectedHospital(null);
    sethospitalList([]);
    if (selectedCity) {
      console.log("AXIOS CITY");
      setloadSelect({ ...loadSelect, hospital: true });
      axios
        .get(
          `https://rs-bed-covid-api.vercel.app/api/get-hospitals?provinceid=${selectedProv}&cityid=${selectedCity}&type=1`
        )
        .then((res) => {
          // console.log(res.data);
          sethospitalList(res.data.hospitals);
          setloadSelect({ ...loadSelect, hospital: false });
        })
        .catch((error) => {
          setloadSelect({ ...loadSelect, hospital: false });
          setselectedCity(null);
          sethospitalList([]);
          console.log("error city");
          console.log(error);
        });
    }
  }, [selectedCity]);

  useEffect(() => {
    sethospitalDetail(null);

    if (selectedHospital) {
      console.log("AXIOS HOSPITAL");

      setloadSelect({ ...loadSelect, detail: true });
      axios
        .get(
          `https://rs-bed-covid-api.vercel.app/api/get-bed-detail?hospitalid=${selectedHospital.id}&type=1`
        )
        .then((res) => {
          setloadSelect({ ...loadSelect, detail: false });
          sethospitalDetail(res.data.data);
        })
        .catch((error) => {
          setloadSelect({ ...loadSelect, detail: false });
          setselectedHospital(null);
          sethospitalDetail(null);
          alert("error hospital");
          console.log(error);
        });
    }
  }, [selectedHospital]);

  return (
    <div>
      <Navbar
        sec1Scroll={sec1Scroll}
        sec2Scroll={sec2Scroll}
        sec3Scroll={sec3Scroll}
      >
        <div ref={sec1}></div>
        <WhatComponent
          toogleAnimation={toogleAnimation}
          covidCases={covidCases}
        />
        <div ref={sec2}></div>
        <CovidGraph screenSize={windowDimensions} covidHistory={covidHistory} />
        <div ref={sec3}></div>
        <CovidHospital
          provinceList={provinceList}
          selectedProv={selectedProv}
          // onProvChange={(value) => {
          //   setselectedProv(value);
          // }}
          onProvChange={useCallback(
            (value) => {
              setselectedProv(value);
            },
            [selectedProv]
          )}
          cityList={cityList}
          selectedCity={selectedCity}
          // onCityChange={(value) => {
          //   setselectedCity(value);
          // }}
          onCityChange={useCallback(
            (value) => {
              setselectedCity(value);
            },
            [selectedCity]
          )}
          hospitalList={hospitalList}
          selectedHospital={selectedHospital}
          // onHospitalChange={(value) => {
          //   setselectedHospital(value);
          // }}
          onHospitalChange={useCallback(
            (value) => {
              setselectedHospital(value);
            },
            [selectedHospital]
          )}
          hospitalDetail={hospitalDetail}
          loadState={loadSelect}
          screenSize={windowDimensions}
        />
        <Footer />
      </Navbar>
    </div>
  );
};

export default Home;
