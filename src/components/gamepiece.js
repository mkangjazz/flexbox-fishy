import React from 'react';
import Fish from './fish';
import Scale from './scale';

export default function GamePiece(props) {
  return (
    <li className='game-piece'>
      { props.type === 'fish' ? <Fish /> : <Scale /> }
    </li>
  );
}
