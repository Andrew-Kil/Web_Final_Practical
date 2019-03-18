import React from "react";
import "./Home.css";
import music from "./music.jpg";

export default function Home() {
  return (
    <div id="home-homepage">
      <h1 id="home-header">Earworm Report</h1>
      <img
        src={music}
        alt="music background, headphones"
        id="music-background"
      />
    </div>
  );
}
