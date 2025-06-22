// routes.js
import PlanetDetails from "./pages/PlanetDetails";
import PersonDetails from "./pages/PersonDetails";
import VehicleDetails from "./pages/VehicleDetails";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import { Layout } from "./pages/Layout";
import Home  from "./pages/Home";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>} >
      <Route index element={<Home />} />
      <Route path="planet/:uid" element={<PlanetDetails />} />
      <Route path="people/:uid" element={<PersonDetails />} />
      <Route path="vehicle/:uid" element={<VehicleDetails />} />
      {/* Add more routes here, like: */}
      {/* <Route path="people/:uid" element={<PersonDetail />} /> */}
    </Route>
  )
);