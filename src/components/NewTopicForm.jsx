import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { ALL_ICONS } from "../data/icons";
import ROUTES from "../app/routes"; // Added missing import!
// Import add Topic
import { addTopic } from "../features/topics/topicsSlice";
import "../css/NewTopicForm.css"; // Import CSS

const NewTopicForm = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [icon, setIcon] = useState(""); // Fixed: [icon, setIcon] not { icon, setIcon }
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.length === 0 || icon.length === 0) {
      return;
    }

    // Generate unique topic ID
    const id = uuidv4();

    // Dispatch addTopic action with form data
    dispatch(
      addTopic({
        id: id,
        name: name,
        icon: icon,
      })
    );

    // Navigate back to topic page
    navigate(ROUTES.topicsRoute());
  };
  
  return (
    <section className="form-container">
      <form onSubmit={handleSubmit}>
        <h1 className="form-title">Create a new topic</h1>
        <div className="form-section">
          <input
            id="topic-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.currentTarget.value)}
            placeholder="Topic Name"
            className="form-input"
          />
          <select
            onChange={(e) => setIcon(e.currentTarget.value)}
            required
            defaultValue="default"
            className="form-select"
          >
            <option value="default" disabled hidden>
              Choose an icon
            </option>
            {ALL_ICONS.map(({ name, url }) => (
              <option key={url} value={url}>
                {name}
              </option>
            ))}
          </select>
        </div>
        <button className="form-submit-button" type="submit">
          Add Topic
        </button>
      </form>
    </section>
  );
};

export default NewTopicForm;