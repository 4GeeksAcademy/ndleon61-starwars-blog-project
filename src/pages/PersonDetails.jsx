import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const PersonDetails = () => {
  const { uid } = useParams();
  const [person, setPerson] = useState(null);

  useEffect(() => {
    const fetchPerson = async () => {
      try {
        const res = await fetch(`https://www.swapi.tech/api/people/${uid}`);
        const json = await res.json();
        setPerson(json.result.properties);
      } catch (err) {
        console.error("Failed to load person", err);
      }
    };

    fetchPerson();
  }, [uid]);

  if (!person) return <div className="text-center mt-5">Loading...</div>;

  return (
    <div className="container mt-5">
      <Link to="/" className="btn btn-secondary mb-4">← Back</Link>
      <h2>{person.name}</h2>
      <ul className="list-group">
        <li className="list-group-item"><strong>Height:</strong> {person.height} cm</li>
        <li className="list-group-item"><strong>Mass:</strong> {person.mass} kg</li>
        <li className="list-group-item"><strong>Gender:</strong> {person.gender}</li>
        <li className="list-group-item"><strong>Birth Year:</strong> {person.birth_year}</li>
        <li className="list-group-item"><strong>Eye Color:</strong> {person.eye_color}</li>
        <li className="list-group-item"><strong>Hair Color:</strong> {person.hair_color}</li>
      </ul>
    </div>
  );
};

export default PersonDetails;