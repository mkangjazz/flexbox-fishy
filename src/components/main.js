import checkAnswerAgainstSolution from '../utility/checkAnswerAgainstSolution';
import focusFirstEnabledInput from '../utility/focusFirstEnabledInput';
import makeStyleStringFromObj from '../utility/makeStyleStringFromObj';
import makeStyleStringFromInputs from '../utility/makeStyleStringFromInputs';

import levels from '../data/levels';

import {useLocation, useHistory} from "react-router-dom";

import React, {useRef, useEffect, useState} from 'react';

import CSSObjects from './cssobjects';
import Description from './description';
import Fish from './fish';
import LevelSelector from './levelselector';
import Logo from './logo';
import Scale from './scale';

export default function Main() {
  const formRef = useRef();
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
    if (formRef.current) {
      formRef.current.reset();
    }

    setCurrentLevelData(levels[currentLevel]);
    setInputData('');
    setIsSolved(false);
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

    if (formRef.current) {
      focusFirstEnabledInput(formRef.current);

      const els = Array.prototype.slice.call(formRef.current.elements)
        .filter(el => el.getAttribute('type') === 'text' ? el : null);

      const input = makeStyleStringFromInputs(els);

      setInputData(input);
    }
  }, [
    currentLevelData,
  ]);

  const handleNextLevel = (e) => {
    history.push(`/?level=${String(Number(currentLevel) + 2)}`);
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const els = Array.prototype.slice.call(e.target.elements)
      .filter(el => el.getAttribute('type') === 'text' ? el : null);

    const input = makeStyleStringFromInputs(els);

    setInputData(input);

    const isCorrect = checkAnswerAgainstSolution(input, solutionString);

    if (!isCorrect) {
      if (formRef.current) {
        formRef.current.classList.add('shake-me');

        setTimeout(
          () => {
            formRef.current.classList.remove('shake-me');
          }, 
          750
        );
      }

      focusFirstEnabledInput(formRef.current);
    }

    setIsSolved(isCorrect);
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
                onSubmit={handleFormSubmit}
                ref={formRef}
              >
                <table className='code-interface'>
                  <tbody>
                    <CSSObjects 
                      currentLevel={currentLevel}
                      currentLevelData={currentLevelData} 
                    />
                  </tbody>
                </table>
                <div className='actions'>
                  <input
                    type='submit'
                    value='Run Code'
                  />
                  <input
                    onClick={handleNextLevel}
                    disabled = {isSolved ? false : true}
                    type='button'
                    value='Go to Next Level'
                  />
                </div>
              </form>
              <p className='copyright'>
                <small>
                  &copy;{new Date().getFullYear()} Mike Kang
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

