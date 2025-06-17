import React, { useState, useEffect } from 'react';

const Card = () => {
  const [planet, setPlanet] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://www.swapi.tech/api/planets/1/")
      .then(res => res.json())
      .then(data => {
        setPlanet(data.result.properties);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch planet:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (!planet) {
    return <div className="text-danger">Failed to load planet data.</div>;
  }

  return (
    <div className="card m-3" style={{ width: "18rem" }}>
      <img
        src={`https://starwars-visualguide.com/assets/img/planets/1.jpg`}
        className="card-img-top"
        alt={planet.name}
      />
      <div className="card-body">
        <h5 className="card-title">{planet.name}</h5>
        <p className="card-text">
          <strong>Climate:</strong> {planet.climate} <br />
          <strong>Terrain:</strong> {planet.terrain} <br />
          <strong>Population:</strong> {planet.population}
        </p>
        <a href="#" className="btn btn-primary">Learn More</a>
      </div>
    </div>
  );
};

export default Card;