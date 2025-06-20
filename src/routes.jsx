// routes.js

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
      {/* Add more routes here, like: */}
      {/* <Route path="people/:uid" element={<PersonDetail />} /> */}
    </Route>
  )
);