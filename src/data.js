import React, { useState, useEffect } from "react";

export const allQuestions = [
  {
    id: 1,
    question: "Where was the BRICS summit held in 2024?",
    answers: [
      { text: "Brazil", correct: true },
      { text: "India", correct: false },
      { text: "Russia", correct: false }
    ],
    prize: "#5,000"
  },
  {
    id: 2,
    question: "What is the capital of France?",
    answers: [
      { text: "Berlin", correct: false },
      { text: "Madrid", correct: false },
      { text: "Paris", correct: true },
      { text: "Lisbon", correct: false }
    ],
    prize: "#10,000"
  },
  {
    id: 3,
    question: "Which planet is known as the Red Planet?",
    answers: [
      { text: "Earth", correct: false },
      { text: "Mars", correct: true },
      { text: "Jupiter", correct: false },
      { text: "Saturn", correct: false }
    ],
    prize: "#20,000"
  },
  {
    id: 4,
    question: "What is 2 + 2?",
    answers: [
      { text: "3", correct: false },
      { text: "4", correct: true },
      { text: "5", correct: false },
      { text: "6", correct: false }
    ],
    prize: "#40,000"
  },
  {
    id: 5,
    question: "What is the chemical symbol for gold?",
    answers: [
      { text: "Ag", correct: false },
      { text: "Au", correct: true },
      { text: "Pb", correct: false },
      { text: "Fe", correct: false }
    ],
    prize: "#80,000"
  },
  {
    id: 6,
    question: "Who painted the Mona Lisa?",
    answers: [
      { text: "Van Gogh", correct: false },
      { text: "Picasso", correct: false },
      { text: "Leonardo da Vinci", correct: true },
      { text: "Michelangelo", correct: false }
    ],
    prize: "#160,000"
  },
  {
    id: 7,
    question: "Which gas do plants absorb from the atmosphere?",
    answers: [
      { text: "Oxygen", correct: false },
      { text: "Carbon Dioxide", correct: true },
      { text: "Nitrogen", correct: false },
      { text: "Hydrogen", correct: false }
    ],
    prize: "#320,000"
  },
  {
    id: 8,
    question: "How many continents are there?",
    answers: [
      { text: "5", correct: false },
      { text: "6", correct: false },
      { text: "7", correct: true },
      { text: "8", correct: false }
    ],
    prize: "#640,000"
  },
  {
    id: 9,
    question: "Which animal is known as the 'King of the Jungle'?",
    answers: [
      { text: "Elephant", correct: false },
      { text: "Tiger", correct: false },
      { text: "Lion", correct: true },
      { text: "Cheetah", correct: false }
    ],
    prize: "#1,280,000"
  },
  {
    id: 10,
    question: "What is the largest ocean on Earth?",
    answers: [
      { text: "Atlantic", correct: false },
      { text: "Indian", correct: false },
      { text: "Arctic", correct: false },
      { text: "Pacific", correct: true }
    ],
    prize: "#2,560,000"
  }
];

const getRandomQuestions = (questionsArray, numQuestions) => {
  return [...questionsArray].sort(() => Math.random() - 0.5).slice(0, numQuestions);
};

const Quiz = () => {
  const TIMER_DURATION = 15;
  const [questions, setQuestions] = useState(getRandomQuestions(allQuestions, 5));
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TIMER_DURATION);
  const [showScore, setShowScore] = useState(false);

  useEffect(() => {
    if (timeLeft === 0) {
      handleNextQuestion();
    }
    
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  useEffect(() => {
    setTimeLeft(TIMER_DURATION);
  }, [currentQuestionIndex]);

  const handleAnswer = (selectedOption) => {
    const correctAnswer = questions[currentQuestionIndex].answers.find((ans) => ans.correct)?.text;
    
    if (selectedOption === correctAnswer) {
      setScore((prevScore) => prevScore + 1);
    }
    
    handleNextQuestion();
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setShowScore(true);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      {showScore ? (
        <h2>You scored {score} out of {questions.length}</h2>
      ) : (
        <div>
          <h3>{questions[currentQuestionIndex].question}</h3>
          <h4>Time Left: {timeLeft}s</h4>
          {questions[currentQuestionIndex].answers.map((option) => (
            <button 
              key={option.text} 
              onClick={() => handleAnswer(option.text)} 
              style={{ display: "block", margin: "10px auto" }}>
              {option.text}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Quiz;