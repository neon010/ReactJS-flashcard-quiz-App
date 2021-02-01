import React from "react";
import FlashCard from "./FlashCard";

function FlashCardList(props){
    const {flashcards} = props;
    return (
        <div 
        id="card-grid" 
        style={{display:"grid", alignItems: "center", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap:"1rem"}}>
            {flashcards.map(card=> {
                return <FlashCard card={card} key={card.id}/>
            })}
        </div>
    )
}
export default FlashCardList;