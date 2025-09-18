import React from "react";
import { useRoutes } from "react-router-dom";

import App from "./App.jsx";
import NewTravel from "./pages/NewTravel.jsx";
import TripDetail from "./pages/Tripdetail.jsx";

export default function AppRoutes() {
  const routes = useRoutes([
    { path: "/", element: <App /> },
    { path: "/newtravel", element: <NewTravel /> },
    { path: "/trip/:id", element: <TripDetail /> }, // dinamik route
  ]);

  return routes;
}
