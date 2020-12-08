import React, {useState} from "react";


function FlashCard(props){
    const [toggle, setToggle] = useState(false);
    const {card} = props;
    return (
        <div className={`card ${toggle ? "toggle": ""}`} onClick={()=> setToggle(!toggle)}>
            <div className="front">
                {card.question}
                <div className="options">
                    {card.options.map(option => {
                        return <div className="option">{option}</div>
                    })}
                </div>
            </div>
            <div className="back">
                {card.answer}
            </div>
        </div>
    )
}
export default FlashCard;

