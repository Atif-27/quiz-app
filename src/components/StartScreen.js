import React from 'react';

export default function StartScreen({ numQuestion, dispatch }) {
  return (
    <div className="start">
      <h2>Welcome to The React Quiz</h2>
      <h3>{numQuestion} question to test your React Mastery</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: 'start' })}
      >
        Start Quiz
      </button>
    </div>
  );
}
