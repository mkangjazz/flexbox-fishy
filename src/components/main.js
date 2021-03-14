// import makeCSSStringFromFlatArray from './utility/makeCSSStringFromFlatArray';
// import getUrlParameter from '../../utility/getUrlParameter';

import levels from '../data/levels';

import {useLocation, useParams, useHistory} from "react-router-dom";

import React, { useEffect, useState } from 'react';

import Logo from './logo';
import CSSObjects from './cssobjects';
import LevelSelector from './levelselector';
import Fish from './fish';
import Scale from './scale';

export default function Main() {
  const history = useHistory();
  const query = new URLSearchParams(useLocation().search);

  const [currentLevel, setCurrentLevel] = useState(
    getLevelFromQueryString()
  );
  const [currentLevelData, setCurrentLevelData] = useState(
    levels[currentLevel]
  );
  const [inputData, setInputData] = useState([]);

  function getLevelFromQueryString() {
    let level = 0;

    if (query.get("level")) {
      level = (Number(query.get("level")) - 1);
    }

    return level;
  }

  if (
    !query.get("level")
    // query.get("level") compare levels against each other?
  ) {
    history.push(`/?level=1`);
  }

  useEffect(() => {
    const level = getLevelFromQueryString();

    setCurrentLevel(
      level
    );

    setCurrentLevelData(levels[level]);
  }, [
    currentLevel
  ]);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const els = Array.prototype.slice.call(e.target.elements)
      .filter(el => el.getAttribute('type') === 'text' ? el : null);
    
    const chunk = 2;

    const styles = [
      // {
      //   selector: '',
      //   styles: []
      // },
    ];

    for (let i = 0; i < els.length; i += chunk) {
      const chunked = els.slice(i, i + chunk);

      const property = chunked[0].value || '';
      const value = chunked[1].value || '';

      if (!property || !value) {
        return;
      }

      const selector = chunked[0].getAttribute('data-selector') || chunked[1].getAttribute('data-selector');

      if (styles.filter(o => o.selector === selector).length < 1) {
        styles.push({
          selector: selector,
          styles: {},
        });
      }

      styles.filter(o => o.selector === selector)[0]
      .styles[property] = value;
    }

    setInputData(styles);
  };

  const renderFish = () => {
    const arr = [];

    for (let i = 0; i < currentLevelData.gamePieces; i += 1) {
      arr.push(
        <li key={i}>
          <div className='gamepiece'>
            <Fish />
          </div>
        </li>
      );
    }

    return arr;
  };

  const renderScales = () => {
    const arr = [];

    for (let i = 0; i < currentLevelData.gamePieces; i += 1) {
      arr.push(
        <li key={i}>
          <div className='gamepiece'>
            <Scale />
          </div>
        </li>
      );
    }
 
    return arr;
  };

  const styleString = () => {
    const scaleStylesObj = currentLevelData.cssObjects
      .filter(obj => obj.selector === '.fishies')[0];

    function makeStyleString(obj) {
      var s = '';

      for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
          s += `${key}:${obj[key]};`;
        }
      }

      return s;
    }

    var str = '';

    if (scaleStylesObj) {
      str += '.scales{';
      str += makeStyleString(scaleStylesObj.styles);
      str += '}';
    }

    for (let i = 0; i < inputData.length; i += 1) {
      str += inputData[i].selector;
      str += '{';
      str += makeStyleString(inputData[i].styles);
      str += '}';
    }

    str = str.replace(/_/ig, '-');

    return str;
  };

  return (
    <main>
      <style>
        {styleString()}
      </style>
      <div className='container'>
        <div className='sidebar'>
          <Logo />
          <LevelSelector
            currentLevel={currentLevel}
            levelCount={levels.length}
            setCurrentLevel={setCurrentLevel}
          />
          <form
            autoComplete="off"
            className='codeinput'
            id='codeinput'
            onSubmit={handleFormSubmit}
          >
            <table className='code-interface'>
              <tbody>
                <CSSObjects 
                  currentLevel={currentLevel}
                  currentLevelData={currentLevelData} 
                />
              </tbody>
            </table>
            <input 
              type='submit'
              value='Submit'
            />
          </form>
        </div>
        <div className='mainbar'>
          <div className={`gameboard`}>
            <ul 
              className='fishies'
            >
              {renderFish()}
            </ul>
            <ul 
              className='scales'
            >
              {renderScales()}
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
};

