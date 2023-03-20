import React, { useEffect, useState } from "react";
import Nav from "./Nav";

const FlightList = () => {
  const [Flights, setFlights] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/flights")
      .then((res) => res.json())
      .then((data) => {
        setFlights(data);
      })
      .catch((err) => {
        alert("Error fetching data");
        console.log(err);
      });
  }, []);

  return (
    <>
      <Nav />
      <div className="center">
        <h1>Flight List</h1>
        <table>
          <thead>
            <tr>
              <th>Flight Number</th>
              <th>Airline</th>
              <th>Destination</th>
              <th>Departure Time</th>
              <th>Terminal</th>
              <th>Gate Number</th>
            </tr>
          </thead>
          <tbody>
            {Flights.map((flight) => (
              <tr key={flight._id}>
                <td>{flight.flightNumber}</td>
                <td>{flight.airline}</td>
                <td>{flight.destination}</td>
                <td>{flight.departureTime}</td>
                <td>{flight.terminal}</td>
                <td>{flight.gateNumber}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default FlightList;
