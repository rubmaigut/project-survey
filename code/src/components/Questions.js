import React, { useState } from 'react'
import data from '../Data.json'
import Answer from './Answer'
import Final from './Final'
import Filter from './Filter'
import ProgressBar from './ProgressBar'


const Questions = ({ onClickStart }) => {
  //State to control increase / decrease questions Id
  const [questionNumber, setQuestionNumber] = useState(0)

  //State to store answer.
  const [answerStored, setAnswerStored] = useState([])

  const [progressBar, setProgressBar] = useState(0)

  //logic to jump between questions.
  const getAnswer = (questionId, answerSelected) => {
    if (questionId === 0 && answerSelected === "yes") {
      setQuestionNumber(2)
      calculateProgressBar(1)

    }
    else {
      increaseQuestionNumber()
      calculateProgressBar(questionId)
    }
    answerStored.push({
      questionId: questionId,
      answer: answerSelected
    })
    setAnswerStored(answerStored)
  }
  //***********STAR FUNCTION ***************** "To control navigation buttons (between questions)""
  const increaseQuestionNumber = () => {
    let counter = questionNumber
    if (questionNumber < data.questions.length) {
      counter++
      setQuestionNumber(counter)
    }
  }
  const decreaseQuestionNumber = () => {
    let counter = questionNumber
    if (questionNumber > 0) {
      counter--
      setQuestionNumber(counter)
    }
  }
  if (questionNumber > data.questions.length - 1) {
    return (
      <div>
        <Final
          questionArray={data.questions}
          answerArray={answerStored} />
        <Filter
          resetQuestion={onClickStart}
          questionArray={data.questions}
          answerArray={answerStored} />
      </div>

    )
  }
  //*************END FUCNTION************//

  const calculateProgressBar = (questionId) => {
    setProgressBar(data.questions.length - (questionId + 1))
  }

  return (
    <article className="container">
      <div className="question-container" >
        <p>{data.questions[questionNumber].question}</p>
        <Answer
          questionId={data.questions[questionNumber].id}
          optionType={data.questions[questionNumber].optionType}
          options={data.questions[questionNumber].options}
          onPressSubmit={getAnswer}
        />
      </div>
      <ProgressBar
        progressTraker={progressBar} />
      <div className="progress-section">
        <button className="progress" onClick={decreaseQuestionNumber}>▲</button>
        <button className="progress" onClick={increaseQuestionNumber}>▼</button>
      </div>
    </article>
  )
}
export default Questions;