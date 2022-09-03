import React, { useEffect, useState } from "react";
import "./mainstyle.css";
import { Layout } from "antd";
import { FaMosque } from "react-icons/fa";
import { IoChevronForward, IoChevronBack } from "react-icons/io5";

const { Header, Content, Footer } = Layout;

const Main = () => {
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [times, setTimes] = useState({});
  const [date, setDate] = useState();
  const [day, setDay] = useState({});
  const [fullDate, setFullDate] = useState();
  // const options = ["Shubuh", "Syuruq", "Dhuhur", "Ashar", "Maghrib", "Isha"];

  function getDate() {
    const d = new Date();
    let day = d.getDate();

    setDate(day);
  }

  function success(position) {
    console.log(position.coords);
    setLatitude(position.coords.latitude);
    setLongitude(position.coords.longitude);
  }
  function error() {
    setLatitude("-6.200000");
    setLongitude("106.816666");
  }

  function getLocation() {
    if (!navigator.geolocation) {
      alert("Akses lokasi belum diberikan");
    } else {
      navigator.geolocation.getCurrentPosition(success, error);
    }
  }

  function getTimes() {
    fetch(
      `https://api.aladhan.com/v1/calendar?latitude=${latitude}&longitude=${longitude}&method=4`
    )
      .then((response) => response.json())
      .then(function (response) {
        setTimes(response.data[date - 1].timings);
        setDay(response.data[date - 1].date.gregorian.weekday);
        setFullDate(response.data[date - 1].date.readable);
        console.log(response.data[date - 1]);
      })
      .catch((error) => console.log(error));
  }
  useEffect(() => {
    getDate();
  }, []);

  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    getTimes();
  }, [date]);

  return (
    <Layout>
      <Header className="header">
        <FaMosque size="25px" />
        <h2>Prayer Times</h2>
      </Header>
      <Content>
        <div className="container">
          <div className="wrapper">
            <IoChevronBack size={30} onClick={() => setDate(date - 1)} />
            <div className="date">
              <h4>{day.en},</h4>
              <h4>{fullDate}</h4>
            </div>

            <IoChevronForward size={30} onClick={() => setDate(date + 1)} />
          </div>
          <div className="timeWrapperNight">
            <p> Shubuh </p>
            <p>{times.Fajr}</p>
          </div>
          <div className="timeWrapperSun">
            <p> Syuruq </p>
            <p>{times.Sunrise}</p>
          </div>
          <div className="timeWrapperSky">
            <p> Dhuhur </p>
            <p>{times.Dhuhr}</p>
          </div>
          <div className="timeWrapperSky">
            <p> Ashar </p>
            <p>{times.Asr}</p>
          </div>
          <div className="timeWrapperSun">
            <p> Maghrib </p>
            <p>{times.Maghrib}</p>
          </div>
          <div className="timeWrapperNight">
            <p> Isya </p>
            <p>{times.Isha}</p>
          </div>
        </div>
      </Content>
      <Footer></Footer>
    </Layout>
  );
};
export default Main;
