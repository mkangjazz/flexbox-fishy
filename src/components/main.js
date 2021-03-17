// import makeCSSStringFromFlatArray from './utility/makeCSSStringFromFlatArray';
// import getUrlParameter from '../../utility/getUrlParameter';

import levels from '../data/levels';

import {useLocation, useParams, useHistory} from "react-router-dom";

import React, { useEffect, useState } from 'react';

import Logo from './logo';
import CSSObjects from './cssobjects';
import Description from './description';
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
    if (query.get("level")) {
      const queryLevel = query.get("level")
        .replace(/[^0-9]/gi,'');

      const regex = new RegExp('[^0-9]', 'ig');

      if (queryLevel < 1) {
        history.push(`/?level=1`);

        return 0;
      }

      if (queryLevel > levels.length) {
        history.push(`/?level=${levels.length}`);

        return levels.length - 1;
      }

      if (queryLevel) {
        return (Number(queryLevel) - 1);
      }
    } else {
      history.push(`/?level=1`);

      return 0;      
    }
  }

  useEffect(() => {
    const level = getLevelFromQueryString();

    setCurrentLevel(level);
    setCurrentLevelData(levels[level]);
  }, [
    currentLevel,
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
          <p className='copyright'>
            <small>A <a href='https://flexboxfroggy.com/' target="_blank">Flexbox Froggy</a> clone</small>
          </p>
          <p>
            Help Fishy and friends find their missing scales using CSS flexbox properties.
          </p>
          <LevelSelector
            currentLevel={currentLevel}
            levelCount={levels.length}
            setCurrentLevel={setCurrentLevel}
          />
          <Description 
            content={currentLevelData.description}
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
              value='Try It Out!'
            />
          </form>
          <p className='copyright'>
            <small>
              &copy;{new Date().getFullYear()} Mike Kang.
            </small>
          </p>
        </div>
        <div className='mainbar'>
          <div className={`gameboard`}>
            <ul 
              className='fishies'
            >
              {currentLevelData.gamePieces.map((obj, index) => {
                return (
                  <li key={index}>
                    <div className='gamepiece'>
                      <Fish className={obj.className} />
                    </div>
                  </li>
                )
              })}
            </ul>
            <ul 
              className='scales'
            >
              {currentLevelData.gamePieces.map((obj, index) => {
                return (
                  <li key={index}>
                    <div className='gamepiece'>
                      <Scale className={obj.className} />
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
};

