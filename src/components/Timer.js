import { useEffect } from 'react';

export default function Timer({ dispatch, secLeft }) {
  useEffect(
    function () {
      const idInterval = setInterval(() => {
        dispatch({ type: 'tick' });
      }, 1000);

      return () => {
        clearInterval(idInterval);
      };
    },
    [dispatch, secLeft]
  );
  const min = Math.floor(secLeft / 60);
  const sec = Math.floor(secLeft % 60);
  return (
    <div className="timer">
      {(min < 10 ? '0' : '') + min + ':' + (sec < 10 ? '0' : '') + sec}
    </div>
  );
}
