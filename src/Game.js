import React, { Component } from 'react';
import './Game.css';

function Square(props) {
    return (
      <button className="square" onClick={props.onClick}>
        {props.value}
      </button>
    );
}

class Board extends Component {

  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      
      </div>
    );
  }
}


class Game extends Component {

  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null)
      }],
      isXNext: true,
      currentMove: 0
    }
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.currentMove + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if (calculateWinner(squares) || squares[i]) {
      return null;
    } else {
      squares[i] = this.state.isXNext ? "X" : "O";
    }

    this.setState({ 
      history: history.concat([{
        squares: squares
      }]),
      isXNext: !this.state.isXNext, 
      currentMove: history.length
    });            
  }

  jumpTo(move) {
    this.setState({
      currentMove: move,
      isXNext: move % 2 === 0,

    })
  }



  render() {
    const history = this.state.history;
    const current = history[this.state.currentMove];
    const winner = calculateWinner(current.squares);
    const moves = history.map((move, number)=> {
      const prev = number ? 
        `Go to move #${number}` :
        'Go to start'
      return(
        <li key={number}>
          <button onClick={() => this.jumpTo(number)}>{prev}</button>
        </li>
        
      )
    })

    let status = null;

    if (winner) {
      status = `Good game no rematch, ${winner} wins!`;
    } else {
      status = this.state.isXNext ? "X's Turn" : "Os Turn"
    }

    return (
      <div>
        <div>{`This is move #${this.state.currentMove}`}</div>
        <div>{status}</div>
        <Board
          onClick={(i) => this.handleClick(i)}
          squares={current.squares}
        />
        <div>{moves}</div>
      </div>
    );
  }
}

function calculateWinner(squares) {
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

    if (squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}


export default Game;