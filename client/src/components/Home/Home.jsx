import React from "react";
import "./Home.css";
import music from "./music.jpg";

export default function Home() {
  return (
    <div id="container">
      <div id="home-homepage">
        <h1 className="ubuntu-font">Earworm Report</h1>
        <img
          src={music}
          alt="music background, headphones"
          id="music-background"
        />
      </div>
    </div>
  );
}
