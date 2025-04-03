// import React, { useEffect, useState } from "react";
// const QuizModal = ({data}) =>{
//   const [correct, setCorrect] = useState<'boolean'>(false)
//   const isCheck=(value, cor)=>{
//     console.log("value", value,cor)
//     if(value===cor){
//       setCorrect(true)
//     }
//   }
//   return (
//     <div>
//       {data.map((quiz,i)=>{
//         return (
//           <div key={i}>
//             <h1>{quiz.title}</h1>
//             <div>
//               {quiz.questions.map((question,j)=>{
//                 return (
//                   <div key={j}>
//                     <h2>{question.text}</h2>
//                     <div>
//                       {question.incorrectAnswers.map((answer,k)=>{
                  
//                         return (
//                           <div key={k}
//                             >
//                             <input type="radio" name="answer" value={answer} onClick={(e)=> isCheck(e.target.value, question.correctAnswer)}/>
//                             <label>{answer}</label>
//                           </div>
//                         )
//                       })}
//                       <div  style={{border: correct ? "0.5px solid green" : "none"}}  >
//                         <input type="radio" name="answer" 
//                           value={question.correctAnswer} 
//                           onClick={(e)=>             isCheck(e.target.value,question.correctAnswer)}/>
//                         <label>{question.correctAnswer}</label>
//                       </div>
//                     </div>
//                   </div>
//                 )
//               })}
//             </div>
//           </div>
//         )
//       })}
//       <div style={{display:"flex",  justifyContent:"center", marginTop:"10px"}}>
//         <button>Next</button>
//       </div>
//     </div>
//   )
// }

// export default QuizModal;

import React, { useEffect, useState } from "react";
import { getMessage } from "../data/messages";

const QuizModal = ({ data }) => {
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [shuffledAnswers, setShuffledAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [showSummary, setShowSummary] = useState(false);

  
  const quiz = data?.[currentQuizIndex] || null;
  const question = quiz?.questions?.[currentQuestionIndex] || null;

  useEffect(() => {
    if (!question) {
      setShuffledAnswers([]); 
      return;
    }

    const answers = [question.correctAnswer, ...question.incorrectAnswers];
    setShuffledAnswers([...answers].sort(() => Math.random() - 0.5));
  }, [question]);

  
  if (!data || data.length === 0) {
    return <p>Loading quiz...</p>;
  }

  if (showSummary) {
    return (
      <div>
        <h1>Quiz Summary</h1>
        <p>Total Questions: {quiz?.questions?.length || 0}</p>
        <p>Correct Answers: {correctAnswersCount}</p>
        <p>{getMessage()}</p>
        <button onClick={() => window.location.reload()}>Restart Quiz</button>
      </div>
    );
  }

  const handleNext = () => {
    setCurrentQuestionIndex((prev) => prev+1); 
    setSelectedAnswer(null);
    if(currentQuestionIndex === quiz?.questions?.length - 1){
      setCurrentQuizIndex((prev)=> prev+1);
      setCurrentQuestionIndex(0); 
    }
  }

  if (!quiz || !question) {
    return <p>Loading question...</p>;
  }  


  return (
    <div >
       <div style={{alignItems:'center'}}>
       <h4>{quiz.title}</h4>
       <h4>{question.text}</h4>
       </div>

        <div>
            {shuffledAnswers.map((answer, index)=> (
              <div  key={index} style={{border: selectedAnswer ? answer === question.correctAnswer ? "2px solid green" : answer === selectedAnswer ? "2px solid red"
                  : "none" : "none" }}>
              <input type="radio" name="answer" value={answer} onClick={()=>setSelectedAnswer(answer)}/>
              <label>{answer}</label>
              </div>
            ))}
        </div>

        <div style={{display:"flex", justifyContent:"center"}}>
        <button onClick={() => handleNext()}>Next</button>
        </div>
    </div>
  );
};

export default QuizModal;
