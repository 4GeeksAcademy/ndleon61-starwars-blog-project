import React, { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import Planets from "../components/Planets";

const Home = () => {
  return (
    <>
      <div>
        <h1>Planets</h1>
        <Planets />
      </div>
      <div>
        <h1>People</h1>
      </div>
      
    </>
  );
};

export default Home;