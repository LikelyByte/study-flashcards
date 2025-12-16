import React from 'react'
import { useSelector } from 'react-redux';
import { Link, useParams, Navigate } from 'react-router-dom';
import ROUTES from "../../app/routes";
//import selector quizzes and topics
import { selectQuizzes } from "../quizzes/quizzesSlice"
import { selectTopics } from "./topicsSlice";

const Topic = () => {
  const topics = useSelector(selectTopics);
  const quizzes = useSelector(selectQuizzes);
  const { topicId } = useParams();
  const topic = topics[topicId];

  if (!topic) {
    return <Navigate to={ROUTES.topicsRoute()} replace />;
  }

  const quizzesForTopic = topic.quizIds
    .map((quizId) => quizzes[quizId])
    .filter((quiz) => quiz !== undefined);  // Fixed: Added arrow function

  return (
    <section>
      <img src={topic.icon} alt="" className="topic-icon" />
      <h1>{topic.name}</h1>
      <ul className="quizzes-list">
        {quizzesForTopic.map((quiz) => (
          <li className="quiz" key={quiz.id}>
            <Link to={ROUTES.quizRoute(quiz.id)}>{quiz.name}</Link>
          </li>
        ))}
      </ul>
      <Link to={ROUTES.newQuizRoute()} className="button center">
        Create a New Quiz
      </Link>
    </section>
  )
}

export default Topic;