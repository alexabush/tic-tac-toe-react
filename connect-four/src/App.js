import React, { Component } from 'react';
import Board from './Board';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPlayer1Turn: true,
      board: Array.from({ length: 3 }, val => {
        return Array.from({ length: 3 }, val => 0);
      })
    };
  }

  squareClicked = position => {
    console.log('position: ', position);
    const [targetRow, targetColumn] = position;
    this.setState(prevState => {
      const { isPlayer1Turn: updatedIsPlayer1Turn, board: newBoard } = {
        ...prevState
      };
      const updatedIsPlayer1Turn = null;
      if (newBoard[targetRow][targetColumn] === 0) {
        newBoard[targetRow][targetColumn] = 1;
      }
      return newBoard;
    });
  };

  render() {
    return (
      <div className="App">
        <h1>Connect Four</h1>
        <Board board={this.state.board} squareClicked={this.squareClicked} />
      </div>
    );
  }
}

export default App;
