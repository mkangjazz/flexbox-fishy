import './gameboard.css';

import levels from '../../data/levels';
import getUrlParameter from '../../utility/getUrlParameter';

import React, {Component} from 'react';
import GamePieces from '../gamepieces/gamepieces';

export default class GameBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            levelData: {
                count: 0,
                css: null,
            },
        };
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

    // did i beat the level?
    // SOLVED / UNSOLVED function
    // should check whether arrays and objects match (not strings?)

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

        // for (let i = 0; i < this.state.userData.length; i++) {
        //     userCSS += this.changeStylesObjToString(this.state.netData[i]);
        // }

        return {
            __html: levelCSS + userCSS
        };
    }

    render () {
        return (
            <div className='gameboard'>
                <GamePieces count={ this.state.levelData.count } type='fish' />
                <GamePieces count={ this.state.levelData.count } type='scale' />
                <style id='codeinput-style-tag' dangerouslySetInnerHTML={ this.setStyleTagContents()} />
            </div>
        );
    };
}
