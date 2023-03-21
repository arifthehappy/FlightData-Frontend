/* eslint-disable react/jsx-no-comment-textnodes */
import axios from "axios";
import React, { useState } from "react";
import { memo } from "react";

const Chat = () => {
  const [prompt, setPrompt] = useState([]);
  const [response, setResponse] = useState("");

  //validate form
  const validateForm = () => {
    if (prompt === "") {
      return false;
    } else {
      return true;
    }
  };

  // reset form and response
  const handleReset = (e) => {
    e.preventDefault();
    setPrompt("");
    setResponse("");
  };

  // enable enter key to submit form
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  // function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      //send prompt to backend
      axios
        .post("https://flightdataserver.onrender.com/api/chat", { prompt })
        .then((res) => {
          setResponse(res.data.content);
        })
        .catch((err) => {
          console.log(err);
          setResponse("Error fetching data");
        });
    }
  };

  return (
    <div className="chatbot">
      <div className="chatbot-footer">
        <form onSubmit={handleSubmit}>
          <label className="chatbot-header">Ask your query</label>
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            required
            placeholder="What are the flights to New Delhi ?"
            s
            onKeyDown={handleKeyPress}
          />
          <button type="submit">Search</button>
          <button type="reset" className="clearButton" onClick={handleReset}>
            clear
          </button>
        </form>
      </div>
      <div className="chatbot-body">
        <p>Answer:</p>

        {response === "" ? ( // if response is empty
          <p>
            <i>Enter your query..</i>
          </p>
        ) : (
          <p>{response}</p>
        )}
      </div>
    </div>
  );
};

export default memo(Chat);
