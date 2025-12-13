import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import AppLayout from "./AppLayout";
import Topics from "../features/topics/Topics";
import Topic from "../features/topics/Topic";
import Quiz from "../features/quizzes/Quiz";
import Quizzes from "../features/quizzes/Quizzes";
import NewQuizForm from "../components/NewQuizForm";
import NewTopicForm from "../components/NewTopicForm";
import '../css/App.css'
const App = () => {
  return (
    <BrowserRouter className="App">
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route path="topics" element={<Topics />} />
          <Route path="topics/new" element={<NewTopicForm />} />
          <Route path="topics/:topicId" element={<Topic />} />
          <Route path="quizzes" element={<Quizzes />} />
          <Route path="quizzes/new" element={<NewQuizForm />} />
          <Route path="quizzes/:quizId" element={<Quiz />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
