import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";
import Participant from "./components/Participant";
import Viewer from "./components/Viewer";

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

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <ChakraProvider resetCSS={true}>
    <RouterProvider router={router} />
  </ChakraProvider>
);
