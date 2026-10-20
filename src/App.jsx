import { useState } from 'react';
import './style.css';


function MyForm() {

  //Temporary password constant
  const password = "elephant";

  //Page display constants
  const [score, setScore] = useState(0); 
  const [isCorrect, setIsCorrect] = useState("incorrect");

  function calculateScore(guess, password) {
    let score = 0;

    // correct letters, regardless of position
    const remaining = password.split("");
    const matchedGuess = new Array(guess.length).fill(false);

    for (let i = 0; i < guess.length; i++) {
      const index = remaining.indexOf(guess[i]);

      if (index !== -1) {
        score += 1;
        remaining[index] = null;
        matchedGuess[i] = true;
      }
    }

    // exact position bonus
    for (let i = 0; i < Math.min(guess.length, password.length); i++) {
      if (guess[i] === password[i]) {
        score += 2;
      }
    }

    // longest common substring bonus
    let longest = 0;
    let currentRow = new Array(password.length + 1).fill(0);

    for (let i = 1; i <= guess.length; i++) {
      const nextRow = new Array(password.length + 1).fill(0);

      for (let j = 1; j <= password.length; j++) {
        if (guess[i - 1] === password[j - 1]) {
          nextRow[j] = currentRow[j - 1] + 1;
          longest = Math.max(longest, nextRow[j]);
        }
      }

      currentRow = nextRow;
    }

    score += longest * longest;

    // relative order bonus (longest common subsequence)
    const dp = Array.from(
      { length: guess.length + 1 },
      () => new Array(password.length + 1).fill(0)
    );

    for (let i = 1; i <= guess.length; i++) {
      for (let j = 1; j <= password.length; j++) {
        if (guess[i - 1] === password[j - 1]) {
          dp[i][j] = dp[i - 1][j - 1] + 1;
        } else {
          dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
        }
      }
    }

    score += dp[guess.length][password.length];

    // penalise excess characters
    score -= Math.max(0, guess.length - password.length);

    return Math.max(0, score);
  }

  function handleChange(e) {
    let guess = e.target.value;
    const score = calculateScore(guess, password);
    const maxScore = calculateScore(password, password);

    const percentage = Math.min(
      100,
      Math.round((score / maxScore) * 100)
    );

    setScore(percentage);

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