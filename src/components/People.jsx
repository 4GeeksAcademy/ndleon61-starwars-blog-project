import React, { useState, useEffect } from 'react';
import useGlobalReducer from '../hooks/useGlobalReducer';
import "../styles/PeopleList.css"

const People = () => {
  const { store, dispatch } = useGlobalReducer();
  const people = store.people;
  const [details, setDetails] = useState([]);

  useEffect(() => {
    const loadPeople = async () => {
      try {
        const res = await fetch(`https://www.swapi.tech/api/people/`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        const people = Array.isArray(json.results) ? json.results : [];
        dispatch({ type: "set_people", payload: people });
      } catch (error) {
        console.error("Failed to load people", error);
      }
    };

    if (people.length === 0) loadPeople();
  }, [dispatch, people.length]);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const promises = people.map(async (p) => {
          const res = await fetch(p.url);
          const json = await res.json();
          return {
            uid: p.uid,
            ...json.result.properties,
          };
        });
        const allDetails = await Promise.all(promises);
        setDetails(allDetails);
        
      } catch (error) {
        console.error("Error loading people details", error);
      }
    };

    if (people.length > 0 && details.length === 0) fetchDetails();
  }, [people]);

  if (!details.length) {
    return <div className="text-center">Loading people...</div>;
  }

  return (
  <div
    className="d-flex flex-nowrap overflow-auto px-3 people-container"
    style={{ gap: "2rem", scrollBehavior: "smooth" }}
  >
    {details.map((person) => (
      <div key={person.uid} className="card" id='people' style={{ minWidth: "18rem" }}>
        <div className="card-body">
          <h5 className="card-title">{person.name}</h5>
          <p className="card-text">
            <strong>Gender:</strong> {person.gender}<br />
            <strong>Birth Year:</strong> {person.birth_year}<br />
            <strong>Height:</strong> {person.height}
          </p>
        </div>
         <div className="card-footer d-flex justify-content-between">
            <a href="#" className="btn btn-primary">Learn More</a>
            <i className="fa-regular fa-star"></i>
          </div>
      </div>
    ))}
  </div>
);
};

export default People;