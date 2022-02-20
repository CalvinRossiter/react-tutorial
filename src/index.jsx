import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

/*
 function that returns a "square" on the game board which is a button
 */
function Square(props) {
  return (
    <button
      className="square"
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}

/*
  class that creates the Board component
 */
class Board extends React.Component {
  // the renderSquare function of the Board class
  renderSquare(id, row, column) {
    return (
      <Square
        value={this.props.squares[id]}
        row={row}
        column={column}
        onClick={() => this.props.onClick(id)}
      />
    );
  }

  // the render function of the Board class
  // returns the tic tac toe board created from calling the renderSquare method from above which renders a 'square'/button
  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0, 1, 1)}
          {this.renderSquare(1, 1, 2)}
          {this.renderSquare(2, 1, 3)}
        </div>
        <div className="board-row">
          {this.renderSquare(3, 2, 1)}
          {this.renderSquare(4, 2, 2)}
          {this.renderSquare(5, 2, 3)}
        </div>
        <div className="board-row">
          {this.renderSquare(6, 3, 1)}
          {this.renderSquare(7, 3, 2)}
          {this.renderSquare(8, 3, 3)}
        </div>
      </div>
    );
  }
}

/*
  class that creates the entire game. contains all of the other things
 */
class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // this keeps track of what is in each square. fills all squares with null to begin with
      history: [{
        squares: Array(9).fill(null),
      }],
      // this determines which player's turn it is
      xIsNext: true,
      // this determines how many plays have been made
      stepNumber: 0,
    };
  }

  // function that either puts in a X or an O in the square, adds the next step of the games history,
  // and checks if there is a winner
  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    // this checks to see if there is a winner. if there is, then no more moves can be made
    if (calculateWinner(squares) || squares[i]){
      return;
    }
    // this sets a certain value in the squares array to X or O
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
          squares: squares,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  // function that jumps to the step/play button that is selected
  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  // the render function of the Game class
  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    const noMovesLeft = calculateMoves(this.state.stepNumber);

    // calculates what to display in the move list buttons
    const moves = history.map((step, move) => {
      const desc = move ? 'Go to move #' + move : 'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    // calculates the location of the move to display next to the move list
    const moveLocations = history.map((step, move) => {
      const desc = move ? 'Go to move #' + move : 'Go to game start';
      return (
        <div>{desc}</div>
      );
    });

    // Calculates the status of the game to display (whose turn, is there a winner, or a draw
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else if (noMovesLeft) {
      status = "It's a draw!";
    } else {
      status = 'Next Player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <h1 className="title">TIC TAC TOE</h1>
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
        <div className="move-location">
          <div>Location</div>
          <ol>{moveLocations}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

// part of the React app that starts the whole thing. Renders the page
ReactDOM.render(
  <Game/>,
  document.getElementById('root')
);


// these should be put into a utils file
// function used to calculate if there is a winner
function calculateWinner(squares){
  // this has all of the combinations that you can win

  console.log('squares');
  console.log(squares);
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
  for (let i = 0; i < lines.length; i++){
    const [a, b, c] = lines[i];
    // this is checking if a, b, and c are all X's or all O's. if they are, then whoever it is gets returned and wins
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
      return squares[a];
    }
  }
  return null;
}

// function used to see if there are no more moves left
function calculateMoves(stepNumber){
  if (stepNumber === 9){
    return true;
  }
  return false;
}

// function used to calculate the location of each move to display
function calculateLocation(squares){
  // figure out the row/col of the square that was clicked
  // maybe get the previous squares and compare it to the current squares, whichever spot is different
  //    is the spot that was changed
}