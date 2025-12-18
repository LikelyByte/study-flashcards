import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import ROUTES from "../app/routes";
// import selectors
import { selectTopics } from "../features/topics/topicsSlice";
import { addQuiz } from "../features/quizzes/quizzesSlice";
import { addCard } from "../features/cards/cardsSlice";
import {addQuizIdToTopic} from "../features/topics/topicsSlice"
import "../css/NewQuizForm.css"; // Import CSS

export default function NewQuizForm() {
  const [name, setName] = useState("");
  const [cards, setCards] = useState([]);
  const [topicId, setTopicId] = useState("");
  const navigate = useNavigate();
  const topics = useSelector(selectTopics);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.length === 0 || topicId === "") {
      alert("Please fill in quiz name and select a topic");
      return;
    }

    if (cards.length === 0 || cards.every(card => !card.front.trim() || !card.back.trim())) {
      alert("Please add at least one valid flashcard");
      return;
    }

    // Create the new cards here and add each card's id to cardIds
    const cardIds = [];
    const quizId = uuidv4();

    cards.forEach((card) => {
      if (card.front.trim() && card.back.trim()) {
        const cardId = uuidv4();
        cardIds.push(cardId);
        dispatch(
          addCard({
            id: cardId,
            front: card.front,
            back: card.back,
            quizId: quizId, // ADD THIS: cards need quizId!
          })
        );
      }
    });

    // Create the new quiz
    dispatch(
      addQuiz({
        id: quizId,
        name: name,
        topicId: topicId,
        cardIds: cardIds,
      })
    );
    // Add the quiz Id to the topic's quizId array
    dispatch(
      addQuizIdToTopic({
        topicId: topicId,
        quizId: quizId
      })
    )

    navigate(ROUTES.quizzesRoute());
  };

  const addCardInputs = (e) => {
    e.preventDefault();
    setCards(cards.concat({ front: "", back: "" }));
  };

  const removeCard = (e, index) => {
    e.preventDefault();
    if (cards.length > 1) {
      setCards(cards.filter((card, i) => index !== i));
    } else {
      setCards([]); // Clear last card
    }
  };

  const updateCardState = (index, side, value) => {
    const newCards = [...cards]; // Use spread operator
    newCards[index][side] = value;
    setCards(newCards);
  };

  return (
    <section className="form-container quiz-form-container">
      <h1 className="form-title">Create a New Quiz</h1>
      <form onSubmit={handleSubmit} className="quiz-form">
        <div className="form-group">
          <input
            id="quiz-name"
            className="form-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Quiz Title"
            required
          />
        </div>

        <div className="form-group">
          <select
            id="quiz-topic"
            className="form-select"
            onChange={(e) => setTopicId(e.target.value)}
            value={topicId}
            required
          >
            <option value="">Select a Topic</option>
            {Object.values(topics).map((topic) => (
              <option key={topic.id} value={topic.id}>
                {topic.name}
              </option>
            ))}
          </select>
        </div>

        <div className="cards-section">
          <h3>Flashcards</h3>
          {cards.length === 0 ? (
            <p className="no-cards-message">No cards added yet. Click "Add a Card" below.</p>
          ) : (
            cards.map((card, index) => (
              <div key={index} className="card-input-group">
                <div className="card-input-row">
                  <input
                    id={`card-front-${index}`}
                    className="card-input front-input"
                    value={card.front}
                    onChange={(e) =>
                      updateCardState(index, "front", e.target.value)
                    }
                    placeholder={`Card ${index + 1} Front (Question)`}
                  />
                  <input
                    id={`card-back-${index}`}
                    className="card-input back-input"
                    value={card.back}
                    onChange={(e) =>
                      updateCardState(index, "back", e.target.value)
                    }
                    placeholder={`Card ${index + 1} Back (Answer)`}
                  />
                </div>
                <button
                  type="button"
                  onClick={(e) => removeCard(e, index)}
                  className="remove-card-button"
                >
                  Remove Card
                </button>
              </div>
            ))
          )}
        </div>

        <div className="actions-container">
          <button 
            type="button" 
            onClick={addCardInputs}
            className="add-card-button"
          >
            + Add a Card
          </button>
          <button type="submit" className="submit-button">
            Create Quiz
          </button>
        </div>
      </form>
    </section>
  );
}