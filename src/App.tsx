import React from "react";
import {
  LivepeerConfig,
  createReactClient,
  studioProvider,
} from "@livepeer/react";

import Header from "./components/Header";
import Playback from "./components/Playback";
import Stream from "./components/Stream";

import "./App.css";

console.log("LIVEPEER_STUDIO_KEY", process.env.REACT_APP_STUDIO_KEY);
// creating a connection to livepeer
const client = createReactClient({
  provider: studioProvider({ apiKey: process.env.REACT_APP_STUDIO_KEY }),
});

function App() {
  return (
    <LivepeerConfig client={client}>
      <Header />
      <div className="Main">
        <Playback />
        {/* <Stream /> */}
      </div>
    </LivepeerConfig>
  );
}

export default App;
