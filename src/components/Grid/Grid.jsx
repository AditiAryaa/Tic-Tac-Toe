import { useState } from "react";
import Card from "../cards/card.jsx";
import isWinner from "../../helpers/checkWinner.js";
import "./Grid.css";

function Grid({ numberOfCards }) {
  const [board, setBoard] = useState(Array(numberOfCards).fill(""));
  const [turn, setTurn] = useState(false); //true = O false = X
  const [winner, setWinner] = useState(null);
  function play(index) {
    if (turn == true) {
      board[index] = "O";
    } else {
      board[index] = "X";
    }
    const win = isWinner(board, turn ? "O" : "X");
    if (win) {
      setWinner(win);
    }
    setBoard([...board]);
    setTurn(!turn);
  }
  function reset() {
    setTurn(true);
    setWinner(null);
    setBoard(Array(numberOfCards).fill(""));
  }
  return (
    <div className="grid-wrapper">
      <h1>Tic Tac Toe</h1>
      {winner && (
        <>
          <h2 className="turn-highlight1">Winner is {winner} </h2>
          <button className="reset" onClick={reset}>
            Reset Game
          </button>
        </>
      )}
      <h3 className="turn-highlight2">Current Turn : {turn ? "O" : "X"}</h3>
      <div className="grid">
        {board.map((el, idx) => (
          <Card
            gameEnd={winner ? true : false}
            key={idx}
            onPlay={play}
            player={el}
            index={idx}
          />
        ))}
      </div>
    </div>
  );
}

export default Grid;
