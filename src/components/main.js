import checkAnswerAgainstSolution from '../utility/checkAnswerAgainstSolution';
import makeStyleStringFromObj from '../utility/makeStyleStringFromObj';
import makeStyleStringFromInputs from '../utility/makeStyleStringFromInputs';

import levels from '../data/levels';

import {useLocation, useHistory} from "react-router-dom";

import React, { useEffect, useState } from 'react';

import CSSObjects from './cssobjects';
import Description from './description';
import Fish from './fish';
import LevelSelector from './levelselector';
import Logo from './logo';
import Scale from './scale';

export default function Main() {
  const history = useHistory();
  const query = new URLSearchParams(useLocation().search);

  if (!query.get("level")) {
    history.push(`/?level=1`);
  } else {
    const level = query.get("level").replace(/[^0-9]/gi,'');
  
    if (level < 1) {
      history.push(`/?level=1`);
    }

    if (level > levels.length) {
      history.push(`/?level=${levels.length}`);
    }
  }

  const [currentLevel, setCurrentLevel] = useState();
  const [currentLevelData, setCurrentLevelData] = useState();
  const [inputData, setInputData] = useState([]);
  const [solutionString, setsolutionString] = useState();
  const [isSolved, setIsSolved] = useState(false);

  useEffect(() => {
    if (query.get("level")) {
      const level = Number(query.get("level")) - 1;

      setCurrentLevel(level);
    }
  }, [
    history,
    query,
  ]);

  useEffect(() => {
    setCurrentLevelData(levels[currentLevel]);
  }, [
    currentLevel
  ]);

  useEffect(() => {
    let styleString = '';

    if (currentLevelData) {
      for (let i = 0; i < currentLevelData.cssObjects.length; i += 1) {
        styleString += makeStyleStringFromObj(
          currentLevelData.cssObjects[i]
        );
      } 
    }

    setsolutionString(styleString);
  }, [
    currentLevelData,
  ]);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const els = Array.prototype.slice.call(e.target.elements)
      .filter(el => el.getAttribute('type') === 'text' ? el : null);

    const input = makeStyleStringFromInputs(els);

    setInputData(input);

    checkAnswerAgainstSolution(input, solutionString);

    // setIsSolved();
  };

  return (
    currentLevelData
      ? <main>
          <style>
            {solutionString}
          </style>
          <style>
            {inputData}
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
      : <div>
          {'No data'}
        </div>
  );
};

