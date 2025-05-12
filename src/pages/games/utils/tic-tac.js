export function easyMove(square) {
  const emptyS = square
    .map((sq, index) => (sq === 9 ? index : null))
    .filter((val) => val !== null);
  if (emptyS.length == 0) return -1;
  const randomIndex = Math.floor(Math.random() * emptyS.length);
  return emptyS[randomIndex];
}

export function mediumMove(square) {
  for (let i = 0; i < square.length; i++) {
    if (square[i] === 9) {
      square[i] = false;
      if (calculateWinner(square, i) !== -1) {
        square[i] = 9;
        return i;
      }
      square[i] = 9;
    }
  }

  for (let i = 0; i < square.length; i++) {
    if (square[i] === 9) {
      square[i] = true;
      if (calculateWinner(square, i) !== -1) {
        square[i] = 9;
        return i;
      }
      square[i] = 9;
    }
  }

  return easyMove(square);
}

export const calculateWinner = (square, index) => {
  const same = {
    0: [
      [0, 1, 2],
      [0, 3, 6],
      [0, 4, 8],
    ],
    1: [
      [1, 0, 2],
      [1, 4, 7],
    ],
    2: [
      [2, 5, 8],
      [2, 4, 6],
      [2, 1, 0],
    ],
    3: [
      [3, 4, 5],
      [3, 0, 6],
    ],
    4: [
      [4, 3, 5],
      [4, 1, 7],
      [4, 0, 8],
      [4, 2, 6],
    ],
    5: [
      [5, 2, 8],
      [5, 4, 3],
    ],
    6: [
      [6, 3, 0],
      [6, 4, 2],
      [6, 7, 8],
    ],
    7: [
      [7, 6, 8],
      [7, 4, 1],
    ],
    8: [
      [8, 4, 0],
      [8, 7, 6],
      [8, 5, 2],
    ],
  };
  for (const elements of same[index]) {
    if (
      square[elements[0]] === square[elements[1]] &&
      square[elements[0]] === square[elements[2]]
    ) {
      return square[elements[0]];
    }
  }
  return -1;
};

const isBoardFull = (square) =>{
    return !square.includes(9)
}

export function hardMove(squares) {
  let bestScore = -Infinity;
  let bestMove = -1;
  for (let i = 0; i < squares.length; i++) {
    if (squares[i] === 9) {
      squares[i] = false;
      const score = minimax(squares, 0, false, i);
      squares[i] = 9;
      if (score > bestScore) {
        bestScore = score;
        bestMove = i;
      }
    }
  }
  return bestMove;
}


const minimax = (squares, depth, isMaximizing, lastMoveIndex) => {
  const winner = calculateWinner(squares, lastMoveIndex);
  if (winner === false) return 10 - depth;
  if (winner === true) return depth - 10;
  if (isBoardFull(squares)) return 0;
  
  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < squares.length; i++) {
      if (squares[i] === 9) {
        squares[i] = false; 
        const score = minimax(squares, depth + 1, false, i);
        squares[i] = 9;
        bestScore = Math.max(score, bestScore);
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < squares.length; i++) {
      if (squares[i] === 9) {
        squares[i] = true; 
        const score = minimax(squares, depth + 1, true, i);
        squares[i] = 9;
        bestScore = Math.min(score, bestScore);
      }
    }
    return bestScore;
  }
};
