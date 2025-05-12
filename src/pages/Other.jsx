import React, { useEffect, useState } from "react";
import TicTacToe from "./games/tic-tac-toe";
import "./games/css/game.css";
import gameDetails from "../details/gameDetails";
import Sudoku from "./games/sudoku";

const Other = () => {
  const [select, setSelect] = useState("");

  useEffect(()=>{
  },[select])

  return (
    <>
      {select === "" && (
        <div className="other-container">
            {gameDetails.map((game, index) => (
              <div className="other-card" key={index} onClick={() => setSelect(index)}>
                <div className="other-title">
                  {game.title}
                  <a target="_blank" rel="noopener noreferrer">
                    <i className=""></i>
                  </a>
                </div>
                <div className="other-content">
                  <p>{game.about}</p>
                </div>
              </div>
            ))}
        </div>
      )}

      {select !== "" && (
        <div className="close" onClick={() => setSelect("")}>
          <i className="bx bx-x"></i>
        </div>
      )}
      {select === 0 && (
        <div className="gameBox">
          {/* hello */}
          <TicTacToe />
        </div>
      )}
      {select === 1 && (
        <div className="gameBox">
          {/* hello */}
          <Sudoku />
        </div>
      )}
    </>
  );
};

export default Other;
