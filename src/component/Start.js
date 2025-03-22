import React from "react";
import { MDBBtn } from "mdb-react-ui-kit";

const Start = ({ setName, setTimeOut }) => {
  const inputRef = React.useRef();

  const handleClick = () => {
    setTimeOut(false);
    if (inputRef.current.value) {
      setName(inputRef.current.value);
    }
  };

  return (
    <div
      style={{
        margin: "auto",
        padding: "15px",
        maxWidth: "400px",
        textAlign: "center",
        marginTop: "300px",
      }}
    >
      <input
        type="text"
        placeholder="Enter Name"
        ref={inputRef}
        className="form-control"
      />
      <MDBBtn style={{ width: "100%" }} className="mt-2" onClick={handleClick}>
        Start Game
      </MDBBtn>
    </div>
  );
};

export default Start;
// Compare this snippet from src/component/Timer.js:
// import React, { useEffect, useState } from "react";