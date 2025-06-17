import React, { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import Card from "../components/Card";

const Home = () => {
  const { store, dispatch } = useGlobalReducer();

  useEffect(() => {
    fetch("https://www.swapi.tech/api/planets")
      .then(res => res.json())
      .then(data => {
        dispatch({ type: "set_planets", payload: data.results }); // data.results is an array
      })
      .catch(err => console.error("Error fetching planets:", err));
  }, [dispatch]);

  return (
    <div className="container">
      <h2 className="my-4">Planets</h2>
      <div className="d-flex flex-wrap justify-content-start">
        {store.planets.map((planet) => (
          <Card key={planet.uid} uid={planet.uid} name={planet.name} />
        ))}
      </div>
    </div>
  );
};

export default Home;