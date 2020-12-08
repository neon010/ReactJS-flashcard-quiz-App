import React from "react";
import FlashCard from "./FlashCard";

function FlashCardList(props){
    const {flashcards} = props;
    return (
        <div className="card-grid">
            {flashcards.map(card=> {
                return <FlashCard card={card} key={card.id}/>
            })}
        </div>
    )
}
export default FlashCardList;