import React from 'react';

export default function Progress({
  i,
  numQuestion,
  points,
  totalPoints,
  answer,
}) {
  return (
    <header className="progress">
      <progress value={i + Number(answer !== null)} max={numQuestion} />
      <p>
        Questions <strong>{i + 1}</strong>/{numQuestion}
      </p>
      <p>
        <strong>{points}</strong>/{totalPoints}
      </p>
    </header>
  );
}
