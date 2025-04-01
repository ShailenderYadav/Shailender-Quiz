import React, { useEffect, useState } from "react";
import { getQuizzes } from './data/quizzes';
import './App.css'
import QuizModal from "./component/quizModal";

export default function App() {
  const [data, setData] = useState<'array'>([]);
  async function fetchQuizz() {
    try {
      const response = await getQuizzes();
      if (response) {
        setData(response);
      }
    }
    catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchQuizz()
  }, [])

  return (
    <main>
      <QuizModal data={data} />
    </main>
  )
}