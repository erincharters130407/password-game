import { useState } from 'react';
import './style.css';


function MyForm() {

  //Temporary password constant
  const password = "password";

  //Page display constants
  const [score, setScore] = useState(0); 
  const [isCorrect, setIsCorrect] = useState("incorrect");

  function handleChange(e) {

    // simple score logic 
    // currently, only rewards password starting in first position

    let newScore = 0;

    for (let i = 0; i < password.length; i++) {
      if (e.target.value.charAt(i) == password.charAt(i)) {
        newScore++;
      }
    }

    //lose points if attempt gets longer than password, until back at 0
    newScore -= Math.max(0, e.target.value.length - password.length);
    newScore = Math.max(0, newScore);
    setScore(newScore);

    //correct checker
    (e.target.value == password) 
    ? setIsCorrect("correct")
    : setIsCorrect("incorrect");
  }

  return (
    <form>
      <label>
        Enter the password:
        <input
          type="text"
          onChange={handleChange}
        />
      </label>
      <p>{isCorrect}</p>
      <p>{score}</p>
    </form>
  );
}

export default MyForm;