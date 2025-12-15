import React from 'react'
import {Link } from 'react-router-dom';
import ROUTES from '../../app/routes';
//import selector topics
import { useSelector } from 'react-redux';
import {  selectTopics } from './topicsSlice';
import '../../css/Topics.css'


const Topics = () => {
  const topics = useSelector(selectTopics);
  return (
    <section className="center">
      <h1>Topics</h1>
      <ul className="topics-list">
        {Object.values(topics).map((topic) => (
          <li className="topic" key={topic.id}>
          <Link to={ROUTES.topicRoute(topic.id)} className="topic-link">
           <div className="topic-container">
             <img src={topic.icon} alt="" />
             <div className="text-content">
               <h2>{topic.name}</h2>
               <p className="topic-quiz-count">{topic.quizIds ? topic.quizIds.length : 0} Quizzes</p>
             </div>
           </div>
         </Link>
          </li>
        ))}
      </ul>
      <Link
        to={ROUTES.newTopicRoute()}
        className="button create-new-topic-button"
      >
        Create New Topic
      </Link>
    </section>
  )
}

export default Topics