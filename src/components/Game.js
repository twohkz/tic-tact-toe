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

    jumpTo(step) {
        this.setState({
          stepNumber: step,
          xIsNext: (step % 2)===0,
        });
      }

    handleClick(i){
        const history = this.state.history.slice(0, this.state.stepnumber+1);
        const current = history[history.length-1];
        const squares = current.squares.slice();
        const winner = CalculateWinner(squares);
        if (winner || squares[i]) {
            return;
        }

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

        const winner = CalculateWinner(current.squares);
        let status;
        if(winner){
          status = 'Winner: ' + winner;
        }else{
          status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }
          const moves = history.map((step, move) => {
          const desc = move ? 'Move #' + move : 'Game start';
          return (
            <li key={move}>
              <button onClick={() => this.jumpTo(move)}>{desc}</button>
            </li>
          );
        });
        
        


        return (
            <div className="game">
                <div className="game-board">
                    <Board squares={current.squares}   onClick={(i)=>this.handleClick(i)} />
                </div>

                <div className="game-info">
                    <div>{ status }</div>
                    <ul>{ moves }</ul>
                </div>
                
            </div>
        )
    }

    

}

function CalculateWinner(squares){

    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];

      for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
          return squares[a];
        }
      }

    return null;

}