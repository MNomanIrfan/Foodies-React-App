import React from "react";
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import box from "./card";

const mystyle = {
  color: "white",
  backgroundColor: "DodgerBlue",
  padding: "10px",
  fontFamily: "Arial"
};

const LandingPage = () => (
  <div>
     <AwesomeSlider>
    <div data-src="https://i.pinimg.com/originals/96/d6/c2/96d6c279ce8d4a8a8fc81e6eef4bc9f0.png" />
    <div data-src="https://i.pinimg.com/originals/1a/0d/2b/1a0d2ba0c84bdb385c0a7069232d3f80.png" />
    <div data-src="https://1.bp.blogspot.com/-RCNh4TxwEmQ/WOSTVyaWxGI/AAAAAAAASJY/ZbUHOI6wRksw9-JqXNwcZ4Tpk7Kt8OD_wCLcB/s1600/KFC%2BLunch%2BBox%2BTwitter%2Bartwork%2B.jpg" />
  </AwesomeSlider>
  <h1 style={mystyle} >Resturants</h1>
  <box>test</box>
  </div>

);





export default LandingPage;
