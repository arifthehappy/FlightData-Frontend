import React, { useState } from "react";
import { FormControl } from "@mui/material";
import axios from "axios";

const FlightForm = () => {
  //state to hold loading status
  const [Loading, setLoading] = useState(false);

  //state to hold flight data
  const [FlightData, setFlightData] = useState({
    flightNumber: "",
    airline: "",
    destination: "",
    departureTime: "",
    terminal: "",
    gateNumber: "",
  });

  //function to handle changes in form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFlightData((prevFlightData) => ({
      ...prevFlightData,
      [name]: value,
    }));
  };

  //validate form
  const validateForm = () => {
    if (
      FlightData.flightNumber === "" ||
      FlightData.airline === "" ||
      FlightData.destination === "" ||
      FlightData.departureTime === "" ||
      FlightData.terminal === "" ||
      FlightData.gateNumber === ""
    ) {
      return false;
    } else {
      return true;
    }
  };

  //function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      //add flight data to database
      setLoading(true);
      try {
        await axios
          .post("http://localhost:5000/api/flight", FlightData)
          .then((res) => {
            console.log(res);
          });
        handleReset(e);
        setLoading(false);

        alert("Flight data added successfully");
      } catch (error) {
        alert("Error adding flight data");
        setLoading(false);
      }
    } else {
      alert("Please fill out all fields");
    }
  };

  //function to handle cancel button
  const handleReset = (e) => {
    e.preventDefault();
    //reset form
    setFlightData({
      flightNumber: "",
      airline: "",
      destination: "",
      departureTime: "",
      terminal: "",
      gateNumber: "",
    });
  };

  // handle loading status
  //   if (Loading) {
  //     return <div className="overlay"> Please wait...</div>;
  //   }

  return (
    <>
      {Loading ? <div className="overlay-loader"> Please wait...</div> : null}

      <div className="center">
        <h2>Add Flight Data</h2>
        <FormControl>
          <form>
            <label>Flight Number</label>
            <input
              type="text"
              name="flightNumber"
              maxLength={10}
              value={FlightData.flightNumber}
              onChange={handleChange}
            />
            <label>Airline</label>
            <input
              type="text"
              name="airline"
              maxLength={20}
              value={FlightData.airline}
              onChange={handleChange}
            />
            <label>Destination</label>
            <input
              type="text"
              name="destination"
              maxLength={50}
              value={FlightData.destination}
              onChange={handleChange}
            />
            <label>Departure Time</label>
            <input
              type="time"
              name="departureTime"
              value={FlightData.departureTime}
              onChange={handleChange}
            />
            <label>Terminal</label>
            <input
              type="text"
              name="terminal"
              maxLength={2}
              value={FlightData.terminal}
              onChange={handleChange}
            />
            <label>Gate Number</label>
            <input
              name="gateNumber"
              maxLength={2}
              value={FlightData.gateNumber}
              onChange={handleChange}
              onInput={(e) => {
                e.target.value = Math.max(0, parseInt(e.target.value) || 0)
                  .toString()
                  .slice(0, 2);
              }}
              type="number"
            />
            <button
              type="submit"
              onClick={handleSubmit}
              className="submit-button"
            >
              Submit
            </button>
            <button onClick={handleReset} className="cancel-button">
              Cancel
            </button>
          </form>
        </FormControl>
      </div>
    </>
  );
};

export default FlightForm;
