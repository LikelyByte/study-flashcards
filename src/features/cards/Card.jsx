import {useMemo} from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
//import selector
import { selectCardById } from "./cardsSlice";
import "../../css/Card.css";

const Card = ({ id }) => {
  const selectCard = useMemo(() => selectCardById(id), [id]);
  const card = useSelector(selectCard);
  
  const [flipped, setFlipped] = useState(false);
  //Handle null/undefined card
  if (!card) {
    return <li>Card not found</li>;
  }

  return (
    <li>
      <button className="card" onClick={(e) => setFlipped(!flipped)}>
        {flipped ? card.back : card.front}
      </button>
    </li>
  );
};

export default Card;