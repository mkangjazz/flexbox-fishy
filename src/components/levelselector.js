import React from 'react';

import {useHistory} from "react-router-dom";

export default function LevelSelector(props) {
  const history = useHistory();

  function handlePrevious() {
    if (props.currentLevel - 1>= 0) {
      history.push(`/?level=${String(props.currentLevel)}`);

      props.setCurrentLevel(props.currentLevel - 1);
    }
  }

  function handleNext() {
    if (props.currentLevel + 1 <= props.levelCount - 1) {
      history.push(`/?level=${String(props.currentLevel + 2)}`);

      props.setCurrentLevel(props.currentLevel + 1);
    }
  }

  function handleChange(e) {
    history.push(`/?level=${String(Number(e.target.value) + 1)}`);

    props.setCurrentLevel(Number(e.target.value));
  }

  const levelOptions = (() => {
    const jsx = [];

    for (let i = 0; i < props.levelCount; i += 1) {
      jsx.push(
        <option 
          key={i}
          value={i}
        >
          {i + 1}
        </option>
      );
    }

    return jsx;
  })();

  return (
    <div>
      <button
        onClick={handlePrevious}
        type="button"
      >
        <span className='sr-only'>Previous</span>
      </button>
      Level: 
      <select
        className='level-selector'
        onChange={handleChange}
        value={props.currentLevel}
      >
        {levelOptions}
      </select>
      <button
        onClick={handleNext}
        type="button"
      >
        <span className='sr-only'>Next</span>
      </button>
    </div>
  );
}
