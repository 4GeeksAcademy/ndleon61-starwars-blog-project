import { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import '../styles/VehicleList.css';

const Vehicles = () => {
    const {store, dispatch} = useGlobalReducer();
    const vehicles = store.vehicles;
    const [details, setDetails] = useState([]);


    useEffect(() => {
     const loadVehicles = async () => {

        try{
            const res = await fetch(`https://www.swapi.tech/api/vehicles/`);
            if (!res.ok) throw new Error (`HTTP ${res.status}`);
            const json = await res.json();
            const vehicles = Array.isArray(json.results) ? json.results: [];
            dispatch({type: "set_vehicles", payload: vehicles});

        } catch (error) {
            console.error("Failed to load vehicles", error)
        }
     };

        if (vehicles.length === 0) loadVehicles();

    }, [dispatch, vehicles.length]);
    
    useEffect(() => {
     const fetchDetails = async () => {

        try {
            const promises = vehicles.map(async (v) => {
            const res = await fetch(v.url);
            const json = await res.json();
            return {
                uid: v.uid,
                ...json.result.properties,
            };
        });

            const allDetails = await Promise.all(promises);
            setDetails(allDetails);

        } catch (error) {
            console.error("Error loading vehicle details", error)
        }
     };

     if (vehicles.length > 0 && details.length === 0 ) fetchDetails()
    }, [vehicles]);

    if (!details.length) {
        return <div className="text-center">Loading Vehicles</div>
    }
    


  return (
     <div
    className="d-flex flex-nowrap overflow-auto px-3 vehicle-container"
    style={{ gap: "2rem", scrollBehavior: "smooth" }}
  >
    {details.map((vehicle) => (
      <div key={vehicle.uid} className="card" id="vehicle" style={{ minWidth: "18rem" }}>
        <div className="card-body">
          <h5 className="card-title">{vehicle.name}</h5>
          <p className="card-text">
            <strong>Model:</strong> {vehicle.model}<br />
            <strong>Cargo Capacity:</strong> {vehicle.cargo_capacity}<br />
            <strong>Class:</strong> {vehicle.vehicle_class}
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

export default Vehicles;