import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import '../styles/PlanetDetails.css';

const PlanetDetails = () => {
  const { uid } = useParams();
  const [planet, setPlanet] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlanet = async () => {
      try {
        const res = await fetch(`https://www.swapi.tech/api/planets/${uid}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        setPlanet(json.result.properties);
        setLoading(false);
      } catch (error) {
        console.error("Error loading planet details:", error);
        setLoading(false);
      }
    };

    fetchPlanet();
  }, [uid]);

  if (loading) {
    return <div className="text-center mt-5">Loading planet details...</div>;
  }

  if (!planet) {
    return <div className="text-center mt-5 text-danger">Planet not found.</div>;
  }

  return (
    <div className="container mt-5">
      <Link to="/" className="btn btn-secondary mb-4">&larr; Back to Planets</Link>
      <h2 className="mb-3">{planet.name}</h2>
      <ul className="list-group">
        <li className="list-group-item"><strong>Climate:</strong> {planet.climate}</li>
        <li className="list-group-item"><strong>Terrain:</strong> {planet.terrain}</li>
        <li className="list-group-item"><strong>Population:</strong> {planet.population}</li>
        <li className="list-group-item"><strong>Gravity:</strong> {planet.gravity}</li>
        <li className="list-group-item"><strong>Diameter:</strong> {planet.diameter} km</li>
        <li className="list-group-item"><strong>Orbital Period:</strong> {planet.orbital_period} days</li>
        <li className="list-group-item"><strong>Rotation Period:</strong> {planet.rotation_period} hours</li>
        <li className="list-group-item"><strong>Surface Water:</strong> {planet.surface_water}%</li>
      </ul>
    </div>
  );
};

export default PlanetDetails;