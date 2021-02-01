import React, {useState, useEffect, useRef} from "react"
import './App.css';
import FlashCardList from "./components/FlashCardList";


function App() {
  const [flashcards, setFlashcards] = useState([]);
  const [categories, setCategories] = useState([]);

  const categoryEl = useRef();
  const amountEl = useRef();

  useEffect(() => {
    fetch('https://opentdb.com/api_category.php')
      .then(res => res.json())
      .then(data => {
        //console.log(data.trivia_categories);
        setCategories(data.trivia_categories)
      })
  }, [])


  function decodeString(str) {
    const textArea = document.createElement('textarea')
    textArea.innerHTML= str
    return textArea.value
  }
  function randomNumber(){
    return Math.random()*100
  }

  function handleSubmit(e) {
    e.preventDefault();
    let params = {
      amount: amountEl.current.value,
      category: categoryEl.current.value
    };

    let query = Object.keys(params)
             .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
             .join('&');
    const url = "https://opentdb.com/api.php"+"?"+query;
    console.log(url);
    fetch(url).then(res => res.json())
              .then(res => setFlashcards(res.results.map(obj=>{
                const answer = decodeString(obj.correct_answer);
                const options = [
                  ...obj.incorrect_answers.map(a => decodeString(a)),
                  answer
                ]
                return {
                  id: `${randomNumber()}-${Date.now()}`,
                  question: decodeString(obj.question),
                  answer: answer,
                  options: options.sort(() => Math.random() - .5)
                }
              })));
  };

  //console.log(flashcards);

  return (
    <>
      <form className="header" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select id="category" ref={categoryEl}>
            {categories.map(category => {
              return <option value={category.id} key={category.id}>{category.name}</option>
            })}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="amount">Number of Questions</label>
          <input type="number" id="amount" min="1" step="1" defaultValue={10} ref={amountEl} />
        </div>
        <div className="form-group">
          <button className="btn">Generate</button>
        </div>
      </form>
      <div className="container">
        <FlashCardList flashcards={flashcards} />
      </div>
    </>
  );
}

export default App;
