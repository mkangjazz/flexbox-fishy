import './main.css';

import CodeInput from '../codeinput/codeinput';
import React, {Component} from 'react';

import levels from '../../data/levels';
import getUrlParameter from '../../utility/getUrlParameter';

import GameBoard from '../gameboard/gameboard';

export default class Mainbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            levelData: {
                count: 0,
                css: null,
            },
        };
        this.debounce = this.debounce.bind(this);
        this.saveInput = this.saveInput.bind(this);
    }

    getLevelData() {
        const level = `_${getUrlParameter('level')}`;
        return levels[level];
    }
   componentDidMount() {
        this.setState({
            levelData: this.getLevelData()
        });

    }

   changeStylesObjToString(obj) {
        let str = obj.selector;

        str += '{';
// . fish-pieces {display:flex;justify-content:flex-end;}
        const keys = Object.keys(obj.styles);

        for (let i = 0; i < keys.length; i++) {
            str += keys[i].replace('_', '-');
            str += ':';
            str += obj.styles[keys[i]];
            str += ';';
        }

        str += '}';

        return str;
    }

    setStyleTagContents() {
            let levelCSS = '';

            const levelArray = this.state.levelData.css;

            if (!levelArray) {
                return;
            }

            for (let i = 0; i < levelArray.length; i++) {
                levelCSS += this.changeStylesObjToString(levelArray[i]);
            }

            let userCSS = '';

        return {
            __html: levelCSS + userCSS
        };
    }

    debounce(func, wait, immediate) {
        console.log(func);
        let timeout;
        return function() {
            let context = this, args = arguments;
            let later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            let callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    };

    saveInput(inputFieldsObject) {
        console.log("Lololoolo");
    }

    render() {
        return (
            <main className='main-bar'>
              <div className='container'>
                <CodeInput saveInput={this.saveInput} debounce={this.debounce}/>
                <GameBoard />
              </div>
            </main>
        );
    }

}
