import './nav.css';

import React from 'react';
import LevelSelector from '../levelselector/levelselector';

export default function Nav() {
    return (
      <nav>
        <ul>
          <li className='level'>
            <LevelSelector />
          </li>
          <li className='social'>
            <a
              href='https://github.com/paulkangdev/react-game'
              rel="noopener noreferrer"
              target='_blank'
            >
              GitHub
            </a>
          </li>
          <li className='legal'>
            <a href='/legal'>Legal</a>
          </li>
        </ul>
      </nav>
    )
}
