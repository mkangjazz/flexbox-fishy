import React from 'react';
import Fish from './fish';
import Scale from './scale';

export default function GameBoard(props) {
  // render a style string

  return (
    <div className='gameboard'>
      <ul 
        className='fish-list'
      >
        <li>
          <Fish />
        </li>
      </ul>
      <ul 
        className='scale-list'
      >
        <li>
          <Scale />
        </li>
      </ul>
    </div>
  );
}
