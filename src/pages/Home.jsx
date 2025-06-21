import React, { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import Planets from "../components/Planets";
import People from "../components/People"
import Vehicles from "../components/Vehicles";

const Home = () => {
  return (
    <>
      <div>
        <h1>Planets</h1>
        <Planets />
      </div>
      <div>
        <h1>People</h1>
        <People />
      </div>
      <div>
        <h1>Vehicles</h1>
        <Vehicles />
      </div>
      
    </>
  );
};

export default Home;