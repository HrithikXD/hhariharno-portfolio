import { useEffect, useState } from "react";
import {
  initialChessBoard,
  initialPositions,
  onClick,
} from "./utils/chess-utils";
import "./css/Chess.css";
import Draggable from "react-draggable";

const Chess = () => {
  const [board, setBoard] = useState(initialChessBoard);
  const pieces = {
    pawn: ["♙", "♟"],
    king: ["♔", "♚"],
    knight: ["♘", "♞"],
    queen: ["♕", "♛"],
    bishop: ["♗", "♝"],
    rook: ["♖", "♜"],
    "": ["", ""],
  };
  const [positions, setPositions] = useState(initialPositions);
  const [moveAble, setMoveAble] = useState("");
  const [pick, setPick] = useState([false, ""]);

  useEffect(() => {
  }, [pick, moveAble]);

  useEffect(() => {
  }, [positions]);

  const isPiece = (r, c) => {
    const index = `${r},${c}`;
    let res = ["", ""];
    let player = null;
    if (positions.true.has(index)) {
      res = positions.true.get(index);
      player = true;
    } else if (positions.false.has(index)) {
      res = positions.false.get(index);
      player = false;
    }
    return [res, player];
  };

  const select = (r, c) => {
    const pos = isPiece(r, c);
    if (pos[1] !== null) {
      setPick(true);
      setMoveAble([pos, [r, c]]);
    } else {
      if (pick) {
        const index = `${moveAble[1][0]},${moveAble[1][1]}`;
        positions[moveAble[0][1]].delete(index);
        positions[moveAble[0][1]].set(`${r},${c}`, moveAble[0][0]);
        setPick(false);
        setMoveAble("");
      }
    }
  };

  const render = (r, c) => {
    const pos = isPiece(r, c);
    return pieces[pos[0][0]][pos[1] ? 0 : 1];
  };

  return (
    <div className="mainChessBox">
      <div className="chessGameBox">
        {board.map((row, rIndex) => (
          <div className="chessRow" key={rIndex}>
            {row.map((col, cIndex) => (
              <div
                className={
                  pick &&
                  moveAble[1] &&
                  `${moveAble[1][0]},${moveAble[1][1]}` === `${rIndex},${cIndex}`
                    ? "chessCol piece-active"
                    : "chessCol"
                }
                key={cIndex}
                onClick={() => select(rIndex, cIndex)}
              >
                <div className="piece">{render(rIndex, cIndex)}</div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chess;
