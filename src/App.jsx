import { useState } from 'react';

function MyForm() {
  const [name, setName] = useState('');

  function handleChange(e) {
    setName(e.target.value);
  }

  // NTS - e is the event object from DOM -> React
  // e.target is the element it came from
  // target.value is target's text

  return (
    <form>
      <label>
        Enter your name:
        <input
          type="text"
          value={name}
          onChange={handleChange}
        />
      </label>
      <p>Current value: {name}</p>
    </form>
  );
}

export default MyForm;