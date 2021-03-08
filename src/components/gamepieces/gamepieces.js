import './gamepieces.css';

import React from 'react';
import GamePiece from './gamepiece';

export default function GamePieceStyleWrapper(props) {

  const renderGamePieces = () => {
    let html = [];

    for (let i = 0; i < props.count; i++) {
      html.push(
        <GamePiece
          index= { i }
          type={ props.type }
          key={ i.toString() }
        />
      );
    }

    return html;
  }

  return (
    <ul id={`${props.type}-pieces`} className={`game-pieces ${props.type}-pieces` }>
      { renderGamePieces() }
    </ul>
  );
}
