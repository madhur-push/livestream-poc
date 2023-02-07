import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";
import Participant from "./components/Participant";
import Viewer from "./components/Viewer";

import {
  LivepeerConfig,
  createReactClient,
  studioProvider,
} from "@livepeer/react";
import { ChakraProvider } from "@chakra-ui/react";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/host",
    element: <Participant isHost={true} />,
  },
  {
    path: "/participant",
    element: <Participant />,
  },
  {
    path: "/viewer",
    element: <Viewer />,
  },
]);

console.log("LIVEPEER_STUDIO_KEY", process.env.LIVEPEER_STUDIO_KEY);
// creating a connection to livepeer
const client = createReactClient({
  provider: studioProvider({ apiKey: process.env.LIVEPEER_STUDIO_KEY }),
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <ChakraProvider resetCSS={true}>
    <LivepeerConfig client={client}>
      <RouterProvider router={router} />
    </LivepeerConfig>
  </ChakraProvider>
);
