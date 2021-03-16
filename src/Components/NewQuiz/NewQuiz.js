import React from 'react';
import { Form, Card, Button, Col, Alert } from 'react-bootstrap';
import hooks from '../../Hooks';
import './NewQuiz.css';

/**
 * Create a new quiz
 */

const successMsg = `🎉Your quiz was saved successfully.`;
const failureMsg = `😪Sorry... We couldn't save the quiz.`;

export const NewQuiz = () => {
  const { quizName, questions, isSending, success } = hooks.useNewQuizData();
  const { tokenId } = hooks.useUserData();

  const [state, setState] = React.useState({
    quizName: '',
    questionType: 'mc',
    question: '',
    option1: '',
    option2: '',
    option3: '',
    correctAnswer: '',
    error: '',
    isSubmitted: false,
  });

  React.useEffect(() => {
    setState(state => ({ ...state, quizName: quizName }));
  }, [quizName]);

  const saveNewQuestion = hooks.useSaveQuestion(state.quizName, {
    title: state.question,
    options: [state.option1, state.option2, state.option3],
    correct: state.correctAnswer,
  });

  const saveQuiz = hooks.useSaveQuiz(quizName, questions, tokenId);

  const clearAll = hooks.useClearAllNewQuiz();

  const onChangeTypeQuestion = e => {
    const { value } = e.target;

    if (value === 'tof')
      setState({
        ...state,
        questionType: value,
        option1: 'true',
        option2: 'false',
        option3: '',
        isSubmitted: false,
        error: '',
      });
    else
      setState({
        ...state,
        questionType: value,
        option1: '',
        option2: '',
        option3: '',
        isSubmitted: false,
        error: '',
      });
  };

  const validateCorrectQuestion = () => {
    if (
      state.quizName.length !== 0 &&
      state.question.length !== 0 &&
      state.correctAnswer.length !== 0
    )
      if (
        state.questionType === 'mc' &&
        state.option1.length !== 0 &&
        state.option2.length !== 0 &&
        state.option3.length !== 0 &&
        (state.correctAnswer === state.option1 ||
          state.correctAnswer === state.option2 ||
          state.correctAnswer === state.option3)
      )
        return true;
      else if (
        state.questionType === 'tof' &&
        state.option1.length !== 0 &&
        state.option2 !== 0 &&
        (state.correctAnswer === state.option1 ||
          state.correctAnswer === state.option2)
      )
        return true;
      else if (
        state.questionType === 'free' &&
        state.correctAnswer.length !== 0
      )
        return true;

    return false;
  };

  const addQuestion = () => {
    if (validateCorrectQuestion()) {
      saveNewQuestion();
      setState({
        ...state,
        questionType: 'mc',
        question: '',
        option1: '',
        option2: '',
        option3: '',
        correctAnswer: '',
        error: '',
      });
    } else {
      setState({
        ...state,
        error: 'Correct answer does not match with the proposed options',
      });
    }
  };

  return (
    <>
      <Card bg="light" text="dark">
        <Card.Body>
          <Card.Title>New Quiz</Card.Title>

          <Form>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Subject Name</Form.Label>
                <Form.Control
                  id="quiz-name"
                  type="text"
                  placeholder="Enter Quiz name"
                  value={state.quizName}
                  onChange={e => {
                    setState({
                      ...state,
                      quizName: e.target.value,
                      isSubmitted: false,
                      error: '',
                    });
                  }}
                  required
                  readOnly={questions.length !== 0}
                />
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>No. of Questions</Form.Label>
                <Form.Control
                  id="questions-number"
                  type="text"
                  value={questions.length}
                  readOnly
                />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Type of question</Form.Label>
                <Form.Control
                  as="select"
                  id="question-type"
                  required
                  value={state.questionType}
                  onChange={e => onChangeTypeQuestion(e)}
                >
                  <option value="mc">Multiple choice</option>
                  <option value="tof">True or false</option>
                  <option value="free">Free text</option>
                </Form.Control>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Question</Form.Label>
                <Form.Control
                  id="question-name"
                  type="text"
                  placeholder="Enter the question"
                  required
                  value={state.question}
                  onChange={e => {
                    setState({
                      ...state,
                      question: e.target.value,
                      isSubmitted: false,
                      error: '',
                    });
                  }}
                />
              </Form.Group>
            </Form.Row>

            {state.questionType !== 'mc' ? null : (
              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Label>Option 1</Form.Label>
                  <Form.Control
                    id="mc-option1"
                    type="text"
                    placeholder="Enter Option 1"
                    required
                    value={state.option1}
                    onChange={e => {
                      setState({
                        ...state,
                        option1: e.target.value,
                        isSubmitted: false,
                        error: '',
                      });
                    }}
                  />
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Option 2</Form.Label>
                  <Form.Control
                    id="mc-option2"
                    type="text"
                    placeholder="Enter Option 2"
                    required
                    value={state.option2}
                    onChange={e => {
                      setState({
                        ...state,
                        option2: e.target.value,
                        isSubmitted: false,
                        error: '',
                      });
                    }}
                  />
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Option 3</Form.Label>
                  <Form.Control
                    id="mc-option3"
                    type="text"
                    placeholder="Enter Option 3"
                    required
                    value={state.option3}
                    onChange={e => {
                      setState({
                        ...state,
                        option3: e.target.value,
                        isSubmitted: false,
                        error: '',
                      });
                    }}
                  />
                </Form.Group>
              </Form.Row>
            )}

            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Correct answer</Form.Label>
                <Form.Control
                  as="textarea"
                  id="correct-free"
                  rows={2}
                  required
                  value={
                    state.questionType === 'free'
                      ? state.correctAnswer.toUpperCase()
                      : state.correctAnswer
                  }
                  onChange={e =>
                    setState({
                      ...state,
                      correctAnswer: e.target.value,
                      isSubmitted: false,
                      error: '',
                    })
                  }
                />
              </Form.Group>
            </Form.Row>

            <Form.Group>
              <Button onClick={addQuestion}>Add Question</Button>
              {state.error.length !== 0 && (
                <Alert variant="danger">{state.error}</Alert>
              )}
            </Form.Group>

            <Form.Group>
              <Button
                onClick={() => {
                  saveQuiz();
                  setState({ ...state, isSubmitted: true });
                }}
                disabled={
                  (questions.length === 0 && state.error.length === 0) ||
                  isSending
                    ? true
                    : false
                }
              >
                {isSending ? 'Sending...' : 'Save Quiz'}
              </Button>
            </Form.Group>

            <Form.Group>
              <Button onClick={clearAll}>Clear all</Button>
            </Form.Group>

            {state.isSubmitted && !success && !isSending && (
              <Alert variant="danger">{failureMsg}</Alert>
            )}
            {state.isSubmitted && success && !isSending && (
              <Alert variant="success">{successMsg}</Alert>
            )}
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};
