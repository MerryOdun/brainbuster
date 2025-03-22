import React, { useState, useEffect } from "react";
import useSound from "use-sound";
import play from "../assets/play.mp3";
import correct from "../assets/correct.mp3";
import wrong from "../assets/wrong.mp3";

const Quiz = ({ data, questionNumber, setQuestionNumber, setTimeOut }) => {
  const [question, setQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [className, setClassName] = useState("answer");
  const [letsPlay] = useSound(play);
  const [correctAnswer] = useSound(correct);
  const [wrongAnswer] = useSound(wrong);

  useEffect(() => {
    setQuestion(data[questionNumber - 1]);
  }, [data, questionNumber]);

  useEffect(() => {
    letsPlay();
  }, [letsPlay]);

  const delay = (duration, callback) => {
    setTimeout(() => {
      callback();
    }, duration);
  };

  const handleClick = (item) => {
    setSelectedAnswer(item);
    setClassName("answer active");

    delay(5000, () => {
      setClassName(item.correct ? "answer correct" : "answer wrong");
    });

    delay(6000, () => {
      if (item.correct) {
        correctAnswer();
        delay(1000, () => {
          setQuestionNumber((prev) => prev + 1);
          setSelectedAnswer(null);
        });
      } else {
        wrongAnswer();
        delay(1000, () => {
          setTimeOut(true);
        });
      }
    });
  };

  return (
    <div className="quiz">
      <div className="question">{question?.question}</div>
      <div className="answers">
        {question?.answers.map((item, index) => (
          <div
            key={index}
            className={selectedAnswer === item ? className : "answer"}
            onClick={() => !selectedAnswer && handleClick(item)}
          >
            {item.text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Quiz;
// Compare this snippet from src/component/Start.js:
// import React from "react";
// import { MDBBtn } from "mdb-react-ui-kit";