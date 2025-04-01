import React, { useEffect, useState } from "react";
const QuizModal = ({data}) =>{
  const [correct, setCorrect] = useState<'boolean'>(false)
  const isCheck=(value, cor)=>{
    console.log("value", value,cor)
    if(value===cor){
      setCorrect(true)
    }
  }
  return (
    <div>
      {data.map((quiz,i)=>{
        return (
          <div key={i}>
            <h1>{quiz.title}</h1>
            <div>
              {quiz.questions.map((question,j)=>{
                return (
                  <div key={j}>
                    <h2>{question.text}</h2>
                    <div>
                      {question.incorrectAnswers.map((answer,k)=>{
                  
                        return (
                          <div key={k}
                            >
                            <input type="radio" name="answer" value={answer} onClick={(e)=> isCheck(e.target.value, question.correctAnswer)}/>
                            <label>{answer}</label>
                          </div>
                        )
                      })}
                      <div  style={{border: correct ? "0.5px solid green" : "none"}}  >
                        <input type="radio" name="answer" 
                          value={question.correctAnswer} 
                          onClick={(e)=>             isCheck(e.target.value,question.correctAnswer)}/>
                        <label>{question.correctAnswer}</label>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )
      })}
      <div style={{display:"flex",  justifyContent:"center", marginTop:"10px"}}>
        <button>Next</button>
      </div>
    </div>
  )
}

export default QuizModal;