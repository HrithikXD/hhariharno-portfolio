import { useEffect, useState } from "react";
import {
  initialChessBoard,
  copyInitialPositions,
  onClick,
  genLeagalMoves,
} from "./utils/chess-utils";
import "./css/Chess.css";
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
  const [positions, setPositions] = useState(copyInitialPositions);
  const [moveAble, setMoveAble] = useState("");
  const [pick, setPick] = useState(false);
  const [score, setScore] = useState([0, 0]);
  const [turn, setTurn] = useState(true);
  const [difficulty, setDifficulty] = useState(0);
  const [canMoveTo, setCanMoveTo] = useState(null);
  const [check, setCheck] = useState([false, ""]);
  const [isOver, setIsOver] = useState(false);
  const [cpuFrom, setCpuFrom] = useState(null);
  const [cpuTo, setCpuTo] = useState(null);

  useEffect(() => {
    if (pick) {
      const move = onClick(moveAble, positions);
      setCanMoveTo(move);
    }
  }, [pick, moveAble]);

  useEffect(() => {}, [positions]);

  useEffect(() => {
    if (canMoveTo) {
      for (const key of canMoveTo) {
        if (key[1] == "king") {
          setCheck([true, key[0]]);
          break;
        }
      }
    }
    if (!turn && cpuTo && cpuFrom) {
      setTimeout(() => {
        select(cpuTo[0], cpuTo[1]);
        setCpuTo(null);
        setCpuFrom(null);
      }, 1000);
    }
  }, [canMoveTo]);

  useEffect(() => {}, [check]);

  useEffect(() => {}, [score, isOver]);

  useEffect(() => {
    if (!turn && !isOver) {
      const cpuMoves = genLeagalMoves(positions);
      if (cpuMoves && cpuMoves.from && cpuMoves.to) {
        const [r1, c1] = cpuMoves.from.split(",").map(Number);
        const [r2, c2] = cpuMoves.to.split(",").map(Number);
        setCpuFrom([r1, c1]);
        setCpuTo([r2, c2]);
      }
    }
  }, [turn]);

  useEffect(() => {
    if (!turn && cpuFrom) {
      select(cpuFrom[0], cpuFrom[1]);
    }
  }, [cpuFrom]);

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
    const cur = `${r},${c}`;
    if (pick && canMoveTo && canMoveTo.has(cur)) {
      const index = `${moveAble[1][0]},${moveAble[1][1]}`;
      positions[moveAble[0][1]].delete(index);
      if (positions[!moveAble[0][1]].has(cur)) {
        if (positions[!moveAble[0][1]].get(cur)[0] === "king") {
          const newScore = score;
          newScore[turn ? 0 : 1] += 100;
          setScore(newScore);
          setIsOver(true);
        }
        positions[!moveAble[0][1]].delete(cur);
      }
      setCheck([false, ""]);
      positions[moveAble[0][1]].set(cur, moveAble[0][0]);
      setPick(false);
      setCanMoveTo(null);
      setMoveAble("");
      setTurn(!turn);
    } else {
      if (positions[turn].has(cur)) {
        setPick(true);
        setMoveAble([pos, [r, c]]);
      }
    }
  };

  const render = (r, c) => {
    const pos = isPiece(r, c);
    return pieces[pos[0][0]][pos[1] ? 0 : 1];
  };

  const reset = () => {
    setPositions(copyInitialPositions);
    setMoveAble("");
    setPick(false);
    setCanMoveTo(null);
    setMoveAble("");
    setIsOver(false);
  };

  return (
    <div className="mainChessBox">
      <div className="gameOption">
        <div className="score">
          <div className={!turn ? "yourScore" : "yourScore sb"}>
            <p>{score[0]}</p>
            <p>you</p>
          </div>
          <div className={turn ? "myScore" : "myScore sb"}>
            <p>{score[1]}</p>
            <p>Me</p>
          </div>
        </div>
        {/* <div className="difficulty">
          <div
            onClick={() => setDifficulty(0)}
            className={difficulty === 0 ? "easy ele active" : "easy ele"}
          >
            <p>easy</p>
          </div>
          <div
            onClick={() => setDifficulty(1)}
            className={difficulty === 1 ? "medium ele active" : "medium ele"}
          >
            <p>medium</p>
          </div>
          <div
            onClick={() => setDifficulty(2)}
            className={difficulty === 2 ? "hard ele active" : "hard ele"}
          >
            <p>hard</p>
          </div>
        </div> */}
        <div className="reset" onClick={reset}>
          <i className="bx bx-reset"></i>
          <p>reset</p>
        </div>
      </div>
      <div className="chessGameBox">
        {board.map((row, rIndex) => (
          <div className="chessRow" key={rIndex}>
            {row.map((col, cIndex) => (
              <div
                className={`${
                  pick &&
                  moveAble[1] &&
                  `${moveAble[1][0]},${moveAble[1][1]}` ===
                    `${rIndex},${cIndex}`
                    ? "chessCol piece-active "
                    : "chessCol "
                }${(rIndex + cIndex) % 2 !== 0 ? "chessCol-bg" : ""}`}
                key={cIndex}
                onClick={() => select(rIndex, cIndex)}
              >
                <div
                  className={
                    check[0] && check[1] === `${rIndex},${cIndex}`
                      ? "piece chess-check"
                      : "piece"
                  }
                >
                  {render(rIndex, cIndex)}
                  {canMoveTo && canMoveTo.has(`${rIndex},${cIndex}`) && (
                    <div className="piece-canMove"></div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      {isOver && (
        <div className="aftergame">
          <h3>{turn ? "i won!!" : "you won!!"}</h3>
          <h4>total Score: {score[!turn ? 0 : 1]}</h4>
          <div className="reset w" onClick={reset}>
            <i className="bx bx-reset w"></i>
            reset
          </div>
        </div>
      )}
    </div>
  );
};

export default Chess;
