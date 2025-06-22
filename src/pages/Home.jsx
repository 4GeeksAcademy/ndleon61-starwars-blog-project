import React, { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import Planets from "../components/Planets";
import People from "../components/People"
import Vehicles from "../components/Vehicles";
import "../styles/List.css";

const Home = () => {
  return (
    <div className="homeContainer">

       <div className="sections">
        <h1 className="sectionTitle">Planets</h1>
        <Planets />
      </div>

      <div className="sections">
        <h1 className="sectionTitle">People</h1>
        <People />
      </div>

      <div className="sections">
        <h1 className="sectionTitle">Vehicles</h1>
        <Vehicles />
      </div>
    </div>
  );
};

export default Home;