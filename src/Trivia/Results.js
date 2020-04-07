import React, { useEffect, useState } from 'react';
import Badge from 'react-bootstrap/Badge';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { HOME } from '../constants/routes';

const Results = () => {
  const quiz = useSelector(state => state.quiz.quiz);
  const answers = useSelector(state => state.quiz.answers);
  const [results, setResults] = useState([]);

  useEffect(() => {
    const validateQuiz = () => {
      let resultsAux = quiz.map((q, index) => {
        let i = answers.findIndex(a => a.id === q.id);

        if (answers[i].text === q.correct)
          return { response: `Pregunta ${index + 1} ==> Correcta` };
        else return { response: `Pregunta ${index + 1} ==> Incorrecta` };
      });
      setResults(resultsAux);
    };

    validateQuiz();
  }, []);

  return (
    <div>
      {answers.length === 0 ? (
        <Redirect to={HOME} />
      ) : (
        <div className="trivia">
          <h1>
            <Badge variant="secondary">Results</Badge>
          </h1>
          {results.map((r, index) => {
            return <h4 key={index}>{r.response}</h4>;
          })}
        </div>
      )}
    </div>
  );
};

export default Results;
