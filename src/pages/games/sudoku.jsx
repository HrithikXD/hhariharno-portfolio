import { useEffect, useState } from "react";
import {
  setInitialBoard,
  isValidSudoku,
} from "./utils/sudoku-utils";
import "./css/Sudoku.css";
const Sudoku = () => {
  const [difficulty, setDifficulty] = useState(0);
  const [curBoardIndex, setCurBoardIndex] = useState(0);
  const [initialBoard, setInitial] = useState(
    setInitialBoard(difficulty, curBoardIndex)
  );
  const [board, setBoard] = useState(initialBoard);
  const [score, setScore] = useState(0);
  const [error, setError] = useState([false, new Set()]);
  const [isOver, setIsOver] = useState(false);

  useEffect(() => {
    setInitial(setInitialBoard(difficulty, curBoardIndex));
  }, [difficulty, curBoardIndex]);

  useEffect(() => {
    setBoard(initialBoard);
  }, [initialBoard]);

  useEffect(() => {
    if (isEmpty()) {
      setScore((pre) => pre + 100);
      setIsOver(true);
    }
  }, [board]);

  useEffect(() => {}, [error, isOver]);

  const onChange = (e, rIndex, cIndex) => {
    const value = Number(e.target.value) || "";
    if ((value > 0 && value < 10) || value == "") {
      const newBoard = board.map((row, r) =>
        row.map((col, c) => (r === rIndex && c === cIndex ? value : col))
      );
      setBoard(newBoard);
      let res = error[1]
      res = isValidSudoku(newBoard);
      if (res.size > 0) {
        setError([true, res]);
      } else {
        setError([false, res]);
      }
    }
  };

  const reset = () => {
    setError([false, new Set()]);
    setBoard(initialBoard);
    setIsOver(false);
  };

  const nextBoard = () => {
    setError([false, new Set()]);
    if (curBoardIndex + 1 == 5) {
      setCurBoardIndex(0);
    } else {
      setCurBoardIndex((prev) => prev + 1);
    }
    setIsOver(false);
  };

  const isEmpty = () => {
    if (!error[0]) {
      for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
          if (board[r][c] === 0 || board[r][c] == "") return false;
        }
      }
      return true;
    }
    return false;
  };

  return (
    // <h1>Sudoku</h1>
    <div className="mainSudoBox">
      <div className="gameOption">
        <div className="score">
          <div className="yourScore sb">
            <h1>{score}</h1>
            <p>score</p>
          </div>
          <div className="myScore">
            <i className="bx bx-right-arrow-alt" onClick={nextBoard}></i>
            <p>new board</p>
          </div>
        </div>
        <div className="difficulty">
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
        </div>
        <div className="reset" onClick={reset}>
          <i className="bx bx-reset"></i>
          <p>reset</p>
        </div>
      </div>
      <div className="sudoGameBox">
        {board.map((row, rIndex) => (
          <div className="row" key={rIndex}>
            {row.map((col, cIndex) => (
              <div
                className={
                  initialBoard[rIndex][cIndex] !== 0 ? "col col-initial" : "col"
                }
                style={{
                  border:
                    error[0] && error[1].has(`${rIndex},${cIndex}`)
                      ? "3px solid red"
                      : "solid var(--primary-background) 3px",
                }}
                key={cIndex}
              >
                <input
                  type="number"
                  min="1"
                  max="9"
                  key={`${rIndex}-${cIndex}`}
                  value={col === 0 ? "" : col}
                  disabled={
                    initialBoard[rIndex][cIndex] !== 0 ||
                    (error[0] && !error[1].has(`${rIndex},${cIndex}`)) ||
                    isOver
                  }
                  onChange={(e) => onChange(e, rIndex, cIndex)}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
      {isOver && (
        <div className="aftergame">
          <h3>nice job!!</h3>
          <h4>total Score: {score}</h4>
          <div className="score">
            <div className="myScore w">
              <i className="bx bx-right-arrow-alt w" onClick={nextBoard}></i>
              next
            </div>
            <div className="reset w" onClick={reset}>
              <i className="bx bx-reset w"></i>
              reset
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sudoku;
