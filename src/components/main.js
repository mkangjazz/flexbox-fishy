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
  const [showDescription, setShowDescription] = useState(false);

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

  const handleButtonClick = (e) => {
    setShowDescription(curr => !curr);
  };

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
              <div className='scrollable'>
                <section>
                  <Logo />
                  <p className='lead'>
                    Help Fishy and friends find their missing scales using CSS flexbox properties
                  </p>
                  <div className='level'>
                    <LevelSelector
                      currentLevel={currentLevel}
                      levelCount={levels.length}
                      setCurrentLevel={setCurrentLevel}
                      setShowDescription={setShowDescription}
                    />
                    <button
                      className='button-show-hint'
                      onClick={handleButtonClick}
                      type='button'
                    >
                      {showDescription ? 'Hide Hints' : 'Show Hints' }
                    </button>
                  </div>
                  {showDescription
                    ? <Description
                        content={currentLevelData.description}
                      />
                    : null
                  }
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
                        className='button button-run-code'
                        type='submit'
                        value='Run Code'
                      />
                      {currentLevel < levels.length - 1
                        ? <button
                            className='button button-next-level'
                            onClick={handleNextLevel}
                            disabled = {isSolved ? false : true}
                            type='button'
                          >
                            <span>
                              {'Next Level'}
                            </span>
                          </button>
                        : null
                      }
                    </div>
                  </form>
                  <p className='copyright text-center'>
                    Flexbox Fishy is a clone of <a href='https://flexboxfroggy.com/' rel="noopener noreferrer" target="_blank">Flexbox Froggy</a>
                  </p>
                  <p className='copyright'>
                    <small>
                      &copy;{new Date().getFullYear()} Mike Kang, educational purposes only.
                    </small>
                  </p>
                </section>
              </div>
            </div>
            <div className='mainbar'>
              <div className={`gameboard`}>
                <ul 
                  className='fishies'
                >
                  {currentLevelData.gamePieces.map((str, index) => {
                    return (
                      <li key={index}>
                        <div className='gamepiece'>
                          <Fish className={str} />
                        </div>
                      </li>
                    )
                  })}
                </ul>
                <ul 
                  className='scales'
                >
                  {currentLevelData.gamePieces.map((str, index) => {
                    return (
                      <li key={index}>
                        <div className='gamepiece'>
                          <Scale className={str} />
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

