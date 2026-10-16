import { useState } from 'react';



function MyForm() {

  // NTS - TEMPORARY HERE!!!!!!!!!!!!!!!!!!!!!
  const password = "password"

  const [name, setName] = useState("");
  const [correct, setCorrect] = useState("incorrect")

  function handleChange(e) {
    setName(e.target.value);
    (e.target.value == password) 
    ? setCorrect("correct") 
    : setCorrect("incorrect");
  }

  // NTS - e is the event object from DOM -> React
  // e.target is the element it came from
  // target.value is target's text

  return (
    <form>
      <label>
        Enter the password:
        <input
          type="text"
          value={name}
          onChange={handleChange}
        />
      </label>
      <p>{correct}</p>
    </form>
  );
}

export default MyForm;