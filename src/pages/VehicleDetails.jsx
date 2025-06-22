import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const VehicleDetails = () => {
  const { uid } = useParams();
  const [vehicle, setVehicle] = useState(null);

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const res = await fetch(`https://www.swapi.tech/api/vehicles/${uid}`);
        const json = await res.json();
        setVehicle(json.result.properties);
      } catch (err) {
        console.error("Failed to load vehicle", err);
      }
    };

    fetchVehicle();
  }, [uid]);

  if (!vehicle) return <div className="text-center mt-5">Loading...</div>;

  return (
    <div className="container mt-5">
      <Link to="/" className="btn btn-secondary mb-4">← Back</Link>
      <h2>{vehicle.name}</h2>
      <ul className="list-group">
        <li className="list-group-item"><strong>Model:</strong> {vehicle.model}</li>
        <li className="list-group-item"><strong>Manufacturer:</strong> {vehicle.manufacturer}</li>
        <li className="list-group-item"><strong>Cost in credits:</strong> {vehicle.cost_in_credits}</li>
        <li className="list-group-item"><strong>Length:</strong> {vehicle.length} m</li>
        <li className="list-group-item"><strong>Passengers:</strong> {vehicle.passengers}</li>
        <li className="list-group-item"><strong>Vehicle Class:</strong> {vehicle.vehicle_class}</li>
      </ul>
    </div>
  );
};

export default VehicleDetails;