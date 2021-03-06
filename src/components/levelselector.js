import React from 'react';

import {useHistory} from "react-router-dom";

export default function LevelSelector(props) {
  const history = useHistory();

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
          {i === props.currentLevel ? `Level ${i + 1}` : i + 1}
        </option>
      );
    }

    return jsx;
  })();

  return (
    <label className='levelselector'>
      <select
        onChange={handleChange}
        value={props.currentLevel}
      >
        {levelOptions}
      </select>
    </label>
  );
}
