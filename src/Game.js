import React, { Component } from 'react';
import './Game.css';

function Square(props) {
    return (
      <button className="square" onClick={props.handleClick}>
        {props.value}
      </button>
    );
}

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      isXNext: true
    };    
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    squares[i] = this.state.isXNext ? "X" : "O";
    this.setState({squares: squares,
                   isXNext: !this.state.isXNext});
  }


  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        handleClick={() => this.handleClick(i)}
      />
    );
  }

  render() {

    const status = "Next Player is X"

    return (
      <div>
        <div>{status}</div>
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
  render() {
    return (
      <div>
        <Board />
      </div>
    );
  }
}

export default Game;