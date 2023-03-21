import React, { useEffect, useState } from "react";
import Chat from "./Chat";

const FlightList = () => {
  const [Flights, setFlights] = useState([]);

  useEffect(() => {
    fetch("https://flightdataserver.onrender.com/api/flights")
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
      <div className="flex-grid">
        <div id="chatbot">
          <Chat />
        </div>

        <table>
          <caption>Flight List</caption>
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
