import React, { useEffect, useState } from 'react';
import useGlobalReducer from '../hooks/useGlobalReducer';

const Planets = () => {
  const { store, dispatch } = useGlobalReducer();
  const planets = store.planets;
  const [details, setDetails] = useState([]);

  
  useEffect(() => {
    const loadPlanets = async () => {
      try {
        const res = await fetch(`https://www.swapi.tech/api/planets/`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        const planets = Array.isArray(json.results) ? json.results : [];
        dispatch({ type: "set_planets", payload: planets });
      } catch (error) {
        console.error("Error loading planet list", error);
      }
    };

    if (planets.length === 0) loadPlanets();
  }, [dispatch, planets.length]);


  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const promises = planets.map(async (planet) => {
          const res = await fetch(planet.url);
          const json = await res.json();
          return {
            uid: planet.uid,
            ...json.result.properties,
          };
        });
        const allDetails = await Promise.all(promises);
        setDetails(allDetails);
      } catch (error) {
        console.error("Error loading planet details", error);
      }
    };

    if (planets.length > 0 && details.length === 0) fetchDetails();
  }, [planets]);

  if (!details.length) {
    return <div className="text-center">Loading planets...</div>;
  }

  return (
    <div className="d-flex flex-wrap justify-content-center">
      {details.map((planet) => (
        <div key={planet.uid} className="card m-3" style={{ width: "18rem" }}>
          <img
            src={`https://starwars-visualguide.com/assets/img/planets/${planet.uid}.jpg`}
            className="card-img-top"
            alt={planet.name}
          />
          <div className="card-body">
            <h5 className="card-title">{planet.name}</h5>
            <p className="card-text">
              <strong>Climate:</strong> {planet.climate}<br />
              <strong>Terrain:</strong> {planet.terrain}<br />
              <strong>Population:</strong> {planet.population}
            </p>
            <div className="card-footer footer d-flex justify-content-between">
              <a href="#" className="btn btn-primary">Learn More</a>
              <i className="fa-regular fa-star"></i>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Planets;