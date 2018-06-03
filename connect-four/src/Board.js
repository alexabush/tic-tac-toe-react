import React, { Component } from 'react';
import Square from './Square';
import styled from 'styled-components';

const Row = styled.div`
  /* flex-direction: row; */
`;

class Board extends Component {
  render() {
    const squares = this.props.board.map((row, rowIndex) => (
      <Row key={rowIndex}>
        {row.map((square, column) => (
          <Square
            key={column}
            position={[rowIndex, column]}
            value={square}
            squareClicked={this.props.squareClicked}
          />
        ))}
      </Row>
    ));

    let winStatus;
    switch (this.props.winStatus) {
    case 0:
      winStatus = 'Keep Playing!';
      break;
    case 1:
      winStatus = 'Player 1 Wins!';
      break;
    case 2:
      winStatus = 'Player 2 Wins!';
      break;
    }

    return (
      <div>
        <div>{squares}</div>
        <p>Ready: {this.props.currentTurn ? 'Player 1' : 'Player 2'}</p>
        <p>{winStatus}</p>
      </div>
    );
  }
}

export default Board;
