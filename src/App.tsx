import React from "react";
import {
  LivepeerConfig,
  createReactClient,
  studioProvider,
} from "@livepeer/react";

import Header from "./components/Header";
import { VideoPlayer } from "./components/VideoPlayer";

console.log("STUDIO_KEY", process.env.REACT_APP_STUDIO_KEY);
const client = createReactClient({
  provider: studioProvider({ apiKey: process.env.REACT_APP_STUDIO_KEY }),
});

function App() {
  return (
    <LivepeerConfig client={client}>
      <Header />
      <VideoPlayer />
    </LivepeerConfig>
  );
}

export default App;
