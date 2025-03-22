import React, { useEffect, useState } from "react";

const Timer = ({ setTimeOut, questionNumber }) => {
  const [timer, setTimer] = useState(30);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev === 0) {
          clearInterval(interval);
          setTimeOut(true);
          return prev; // Prevents unnecessary state update
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [setTimeOut, questionNumber]); // Runs when the question number changes

  useEffect(() => {
    setTimer(30);
  }, [questionNumber]);

  return <div className="timer">{timer}</div>;
};

export default Timer;
