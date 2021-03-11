import React from 'react';

export default function LevelSelector(props) {
  function handleChange(e) {
    props.setLevelCount(e.target.value);
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
      Level: 
      <select
        className='level-selector'
        onChange={handleChange}
      >
        {levelOptions}
      </select>
    </div>
  );
}
