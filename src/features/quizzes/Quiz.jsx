import React from 'react'
import { useSelector } from "react-redux"
import { Link, useParams, Navigate } from "react-router-dom"  // Fixed import
import Card from "../cards/Card";
import ROUTES from '../../app/routes';
import '../../css/QuizDetail.css';  // Import the new CSS

//Import quiz selector
import { selectQuizzes } from "./quizzesSlice";

const Quiz = () => {
  const quizzes = useSelector(selectQuizzes);
  const { quizId } = useParams();
  const quiz = quizzes[quizId];  // Fixed syntax: should be quizzes[quizId] not quizzes{quizId}

  //Return if quiz is Undefined 
  if (!quiz) {
    return <Navigate to={ROUTES.quizzesRoute()} replace />
  }

  return (
    <section>
      <h1>{quiz.name}</h1>
      <ul className="cards-list">
        {quiz.cardIds?.map((id) => (  // Added optional chaining
          <Card key={id} id={id} />
        ))}
      </ul>
      <Link to={ROUTES.newQuizRoute()} className="button center">
        Create a New Quiz
      </Link>
    </section>
  )
}

export default Quiz