import React, { Component } from 'react';
import Board from './Board';

export default class Game extends Component {
        constructor(props){
        super(props);
        this.state={
                        xsheet:true,
                        stepnumber:0,
                        history:[ { squares: Array(9).fill(null) } ],
                     }
        
    }

    handleClick(i){
        const history = this.state.history.slice(0, this.state.stepnumber+1);
        const current = history[history.length-1];
        const squares = current.squares.slice();
        squares[i]=this.state.xsheet?'X':'O';
        this.setState({
            history:history.concat([{
                                        squares:squares
                                    }]),
            xsheet: !this.state.xsheet,
            stepnumber:history.length,
        });
        
    }

    render() {
        const history=this.state.history;
        const current=history[this.state.stepnumber];
        
        


        return (
            <div className="game">
                <div className="game-board">
                    <Board squares={current.squares}   onClick={(i)=>this.handleClick(i)} />
                </div>
                
            </div>
        )
    }
}
