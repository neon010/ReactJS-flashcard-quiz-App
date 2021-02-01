import React, {useState, useRef, useEffect} from "react";


function FlashCard(props){
    //console.log(props);
    const [height, setHeight] = useState("");
    const [toggle, setToggle] = useState(false);
    const {card} = props;

    const frontEl = useRef();
    const backEl= useRef();

    function setMaxHeight(){
        const frontHeight = frontEl.current.getBoundingClientRect().height;
        const backHeight = backEl.current.getBoundingClientRect().height;
        setHeight(Math.max(frontHeight,  backHeight, 250));
    };
    //console.log(height);
    useEffect(setMaxHeight, [card.question, card.answer, card.option]);

    useEffect(() => {
        window.addEventListener('resize', setMaxHeight)
        return () => window.removeEventListener('resize', setMaxHeight)
      }, []);

    return (
        <div className={`card ${toggle ? "flip": ""}`} 
        onClick={()=> setToggle(!toggle)}
        style={{height: height}}>
            <div className="front" ref={frontEl}>
                {card.question}
                <div className="options">
                    {card.options.map(option => {
                        return <div className="option">{option}</div>
                    })}
                </div>
            </div>
            <div className="back" ref={backEl}>
                {card.answer}
            </div>
        </div>
    )
}
export default FlashCard;

