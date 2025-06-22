import React, { useEffect, useState } from 'react';
import useGlobalReducer from '../hooks/useGlobalReducer';
import "../styles/PlanetList.css";

const Planets = () => {
  const { store, dispatch } = useGlobalReducer();
  const planets = store.planets;
  const [details, setDetails] = useState([]);
  const getPlanetColor = (climate) => {
   const c = climate.toLowerCase();
  if (c.includes("frozen")) return "planet-bg-frozen";
  if (c.includes("arid")) return "planet-bg-arid";
  if (c.includes("tropical")) return "planet-bg-tropical";
  if (c.includes("temperate")) return "planet-bg-temperate";
  if (c.includes("murky")) return "planet-bg-murky";
  return "planet-bg-default"; 
};

  
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
    <div 
    className="d-flex flex-nowrap overflow-auto px-3"
    style={{ gap: "1rem", scrollBehavior: "smooth" }}
    >
      {details.map((planet) => (
        <div>
          <div key={planet.uid} className="card m-3" id='planets' style={{ minWidth: "18rem", background: getPlanetColor(planet.climate) }}>
         
          <div className="card-body">
            <h5 className="card-title">{planet.name}</h5>
            <p className="card-text">
              <strong>Climate:</strong> {planet.climate}<br />
              <strong>Terrain:</strong> {planet.terrain}<br />
              <strong>Population:</strong> {planet.population}
            </p>
          </div>
          
        </div>
          <div className="card-footer" id='planet'>
              <a href="#" className="btn btn-primary">Learn More</a>
              <i className="fa-regular fa-star"></i>
            </div>
        </div>
        
        
      ))}
    </div>
  );
};

export default Planets;