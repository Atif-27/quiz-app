import React from 'react';

export default function FinishedScreen({
  points,
  totalPoints,
  highScore,
  dispatch,
}) {
  const percentage = (points / totalPoints) * 100;
  let emoji;
  if (percentage === 100) emoji = '🥇';
  if (percentage <= 80 && percentage >= 50) emoji = '😉';
  if (percentage <= 50) emoji = '🤔';
  if (percentage === 0) emoji = '🤦‍♂️';
  return (
    <>
      <p className="result">
        <span>{emoji}</span>You scrored {points} out of {totalPoints} (
        {Math.ceil(percentage)}%)
      </p>
      <p className="highscore">High Score: {highScore}</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: 'restart' })}
      >
        Restart Quiz
      </button>
    </>
  );
}
