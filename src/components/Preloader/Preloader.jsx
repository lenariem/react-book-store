import React from "react";
import PreloaderImg from ".././../img/preloader.svg";
import "./Preloader.css";

export default function Preloader() {
  return (
    <div className="preloaderContainer">
      <img src={PreloaderImg} alt="loading" />
      <p>Loading...</p>
    </div>
  );
}
