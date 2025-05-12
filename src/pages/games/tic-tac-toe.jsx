import { useEffect, useState } from "react";
import "./css/Tick.css";
import {
  easyMove,
  mediumMove,
  calculateWinner,
  hardMove,
} from "./utils/tic-tac";

const TicTacToe = () => {
  const arr = [9, 9, 9, 9, 9, 9, 9, 9, 9];
  const [overmsg, setOverMsg] = useState("draw");
  const [score, setScore] = useState([0, 0]);
  const [qube, setQube] = useState(arr);
  const [turn, setTurn] = useState(true);
  const [qubeCount, setQubeCount] = useState(9);
  const [difficulty, setDifficulty] = useState(0);
  const [st, setSt] = useState(true);
  

  useEffect(() => {
    if (!turn && qubeCount > 1 && overmsg == "draw") {
      const timer = setTimeout(() => {
        let aiMove;
        switch (difficulty) {
          case 0:
            aiMove = easyMove(qube);
            break;
          case 1:
            aiMove = mediumMove(qube);
            break;
          case 2:
            aiMove = hardMove(qube);
            break;
          default:
            aiMove = easyMove(qube);
        }
        if (aiMove !== -1) {
          qubeVal(aiMove);
        }
      }, 1000);
      // return clearTimeout(timer)
    }
  }, [turn, difficulty, qubeCount, overmsg]);

  const qubeVal = (qubeId) => {
    const qubeNew = qube;
    qubeNew[qubeId] = turn;
    setQube(qubeNew);
    checkwin(qubeId);
    setTurn(!turn);
    setQubeCount((prev) => prev - 1);
  };

  const checkwin = (i) => {
    if (calculateWinner(qube, i) !== -1) {
      setQubeCount(0);
      const newScore = score;
      newScore[turn ? 0 : 1] += 100;
      setScore(newScore);
      setOverMsg((turn ? "you" : "I") + " won!!");
      setSt(!st);
    }
  };

  const reset = () => {
    setTurn(st);
    setQube(arr);
    setQubeCount(9);
    setOverMsg("draw");
  };

  return (
    <div className="mainTicBox">
      <div className="gameOption">
        <div className="score">
          <div className={!turn ? "yourScore" : "yourScore sb"}>
            <h1>{score[0]}</h1>
            <p>you</p>
          </div>
          <div className={turn ? "myScore" : "myScore sb"}>
            <h1>{score[1]}</h1>
            <p>Me</p>
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
      <div className="ticGameBox">
        {qube.map((element, index) => (
          <button
            className="inputBox"
            id={index}
            key={index}
            onClick={() => qubeVal(index)}
            disabled={element !== 9 || !turn}
            style={{
              backgroundColor:
                element !== 9 ? "background-color: rgb(137, 176, 152)" : "",
            }}
          >
            {element === 9 ? (
              <div className="inInput"></div>
            ) : (
              <div className="inInput">{element ? "O" : "X"}</div>
            )}
          </button>
        ))}
      </div>
      {qubeCount < 1 && (
        <div className="aftergame">
          <h3>{overmsg}</h3>
          {overmsg === "draw" ? (
            ""
          ) : (
            <h4>total Score: {score[turn ? 1 : 0]}</h4>
          )}
          <div className="reset w" onClick={reset}>
            <i className="bx bx-reset w"></i>
            start
          </div>
        </div>
      )}
    </div>
  );
};

export default TicTacToe;
