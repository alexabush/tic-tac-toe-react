import React, { Component } from 'react';
import Board from './Board';
import './App.css';

const DEFAULT_STATE = {
  winStatus: 0,
  isPlayer1Turn: true,
  board: Array.from({ length: 3 }, val => {
    return Array.from({ length: 3 }, val => 0);
  })
};

class App extends Component {
  constructor(props) {
    super(props);
    //deep clone
    this.state = JSON.parse(JSON.stringify(DEFAULT_STATE));
  }

  squareClicked = position => {
    console.log('position: ', position);
    const [targetRow, targetColumn] = position;
    this.setState(prevState => {
      if (prevState.winStatus !== 0) return prevState;
      const newState = { ...prevState };
      if (newState.board[targetRow][targetColumn] === 0) {
        if (newState.isPlayer1Turn) {
          newState.board[targetRow][targetColumn] = 1;
        } else {
          newState.board[targetRow][targetColumn] = 2;
        }
        newState.isPlayer1Turn = !newState.isPlayer1Turn;
      }
      return newState;
    });
    this.checkWin();
    this.checkStalemate();
  };

  checkStalemate = () => {
    this.setState(prevState => {
      const newState = { ...prevState };
      const currentBoard = newState.board;
      let stalemate = true;
      currentBoard.forEach((row, rowIndex) => {
        debugger;
        if (row.some(value => value === 0)) stalemate = false;
      });
      if (stalemate) newState.winStatus = 3;
      return newState;
    });
  };

  checkWin = () => {
    this.setState(prevState => {
      if (prevState.winStatus !== 0) return prevState;
      const newState = { ...prevState };
      const currentBoard = newState.board;
      let p1Wins,
        p2Wins = false;
      const columns = Array.from({ length: currentBoard.length }, val => []);
      currentBoard.forEach((row, rowIndex) => {
        if (row.every(square => square === 1)) p1Wins = true;
        if (row.every(square => square === 2)) p2Wins = true;
        row.forEach((value, column) => {
          columns[column].push(value);
        });
      });
      columns.forEach(column => {
        if (column.every(val => val === 1)) p1Wins = true;
        if (column.every(val => val === 2)) p2Wins = true;
      });

      if (p1Wins) newState.winStatus = 1;
      if (p2Wins) newState.winStatus = 2;
      return newState;
    });
  };

  playAgain = () => this.setState(DEFAULT_STATE);

  render() {
    return (
      <div className="App">
        <h1>Connect Four</h1>
        <Board
          board={this.state.board}
          squareClicked={this.squareClicked}
          currentTurn={this.state.isPlayer1Turn}
          winStatus={this.state.winStatus}
          playAgain={this.playAgain}
        />
      </div>
    );
  }
}

export default App;
