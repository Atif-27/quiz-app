import React, { useEffect, useReducer } from 'react';
import Header from './Header';
import Main from './Main';
import Loader from './Loader';
import Error from './Error';
import StartScreen from './StartScreen';
import Question from './Question';
import NextQuestion from './NextQuestion';
import Progress from './Progress';
import FinishedScreen from './FinishedScreen';
import Footer from './Footer';
import Timer from './Timer';

const secPQuestion = 30;
const initialState = {
  questions: [],
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
  secLeft: null,
  // 'loading', 'error', 'ready','active','finished'
  status: 'loading',
};
function reducer(state, action) {
  switch (action.type) {
    case 'dataReceived':
      return {
        ...state,
        questions: action.payload,
        status: 'ready',
        secLeft: state.questions.length * secPQuestion,
      };
    case 'dataFailed':
      return { ...state, status: 'error' };
    case 'start':
      return { ...state, status: 'active' };
    case 'newAnswer':
      const question = state.questions.at(state.index);

      return {
        ...state,
        answer: action.payload,
        points:
          question.correctOption === action.payload
            ? state.points + question.points
            : state.points,
      };
    case 'nextQuestion':
      return { ...state, answer: null, index: state.index++ };
    case 'finish':
      return {
        ...state,
        status: 'finished',
        highScore: Math.max(state.highScore, state.points),
      };
    case 'restart':
      // return { ...state, status: 'ready', points: 0, answer: null, index: 0 };
      return { ...initialState, questions: state.questions, status: 'ready' };
    case 'tick':
      return {
        ...state,
        secLeft: state.secLeft - 1,
        status: state.secLeft <= 0 ? 'finished' : state.status,
      };
    default:
      return;
  }
}
export default function App() {
  const [
    { questions, status, index, answer, points, highScore, secLeft },
    dispatch,
  ] = useReducer(reducer, initialState);
  const numQuestion = questions.length;
  const totalPoints = questions.reduce(
    (prev, question) => prev + question.points,
    0
  );
  useEffect(function () {
    async function fetchData() {
      try {
        const res = await fetch('http://localhost:8000/questions');
        if (!res.ok) {
          throw new Error('Something went Wrong');
        }
        const data = await res.json();
        dispatch({ type: 'dataReceived', payload: data });
      } catch (err) {
        dispatch({ type: 'dataFailed', payload: err });
      }
    }
    fetchData();
  }, []);
  return (
    <div className="app">
      <Header />
      <Main>
        {status === 'loading' && <Loader />}
        {status === 'error' && <Error />}
        {status === 'ready' && (
          <StartScreen numQuestion={numQuestion} dispatch={dispatch} />
        )}
        {status === 'active' && (
          <>
            <Progress
              i={index}
              numQuestion={numQuestion}
              points={points}
              totalPoints={totalPoints}
              answer={answer}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />

            <Footer>
              <Timer dispatch={dispatch} secLeft={secLeft} />
              <NextQuestion
                dispatch={dispatch}
                answer={answer}
                index={index}
                numQuestion={numQuestion}
              />
            </Footer>
          </>
        )}
        {status === 'finished' && (
          <FinishedScreen
            points={points}
            totalPoints={totalPoints}
            highScore={highScore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}
