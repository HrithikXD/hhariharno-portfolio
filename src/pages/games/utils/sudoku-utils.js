// 15 Sudoku Boards: 5 Easy, 5 Medium, 5 Hard

// ======== EASY SUDOKU BOARDS ========
// const easySudoku1 = [
//   [5, 3, 4, 6, 7, 8, 9, 1, 2],
//   [6, 7, 2, 1, 9, 5, 3, 4, 8],
//   [1, 9, 8, 3, 4, 2, 5, 6, 7],
//   [8, 5, 9, 7, 6, 1, 4, 2, 3],
//   [4, 2, 6, 8, 5, 3, 7, 9, 1],
//   [7, 1, 3, 9, 2, 4, 8, 5, 6],
//   [9, 6, 1, 5, 3, 7, 2, 8, 4],
//   [2, 8, 7, 4, 1, 9, 6, 3, 5],
//   [3, 4, 5, 2, 8, 6, 1, 7, 0],
// ];

const easySudoku1 =[
  [5, 3, 0, 0, 7, 0, 0, 0, 0],
  [6, 0, 0, 1, 9, 5, 0, 0, 0],
  [0, 9, 8, 0, 0, 0, 0, 6, 0],
  [8, 0, 0, 0, 6, 0, 0, 0, 3],
  [4, 0, 0, 8, 0, 3, 0, 0, 1],
  [7, 0, 0, 0, 2, 0, 0, 0, 6],
  [0, 6, 0, 0, 0, 0, 2, 8, 0],
  [0, 0, 0, 4, 1, 9, 0, 0, 5],
  [0, 0, 0, 0, 8, 0, 0, 7, 9],
];

const easySudoku2 = [
  [0, 0, 0, 2, 6, 0, 7, 0, 1],
  [6, 8, 0, 0, 7, 0, 0, 9, 0],
  [1, 9, 0, 0, 0, 4, 5, 0, 0],
  [8, 2, 0, 1, 0, 0, 0, 4, 0],
  [0, 0, 4, 6, 0, 2, 9, 0, 0],
  [0, 5, 0, 0, 0, 3, 0, 2, 8],
  [0, 0, 9, 3, 0, 0, 0, 7, 4],
  [0, 4, 0, 0, 5, 0, 0, 3, 6],
  [7, 0, 3, 0, 1, 8, 0, 0, 0],
];

const easySudoku3 = [
  [0, 2, 0, 6, 0, 8, 0, 0, 0],
  [5, 8, 0, 0, 0, 9, 7, 0, 0],
  [0, 0, 0, 0, 4, 0, 0, 0, 0],
  [3, 7, 0, 0, 0, 0, 5, 0, 0],
  [6, 0, 0, 0, 0, 0, 0, 0, 4],
  [0, 0, 8, 0, 0, 0, 0, 1, 3],
  [0, 0, 0, 0, 2, 0, 0, 0, 0],
  [0, 0, 9, 8, 0, 0, 0, 3, 6],
  [0, 0, 0, 3, 0, 6, 0, 9, 0],
];

const easySudoku4 = [
  [0, 0, 0, 0, 0, 0, 6, 8, 0],
  [0, 0, 0, 0, 7, 3, 0, 0, 9],
  [3, 0, 9, 0, 0, 0, 0, 4, 5],
  [4, 9, 0, 0, 0, 0, 0, 0, 0],
  [8, 0, 3, 0, 5, 0, 9, 0, 2],
  [0, 0, 0, 0, 0, 0, 0, 3, 6],
  [9, 6, 0, 0, 0, 0, 3, 0, 8],
  [7, 0, 0, 6, 8, 0, 0, 0, 0],
  [0, 2, 8, 0, 0, 0, 0, 0, 0],
];

const easySudoku5 = [
  [0, 0, 0, 0, 0, 7, 0, 0, 0],
  [1, 0, 0, 0, 0, 0, 0, 4, 3],
  [0, 2, 0, 0, 0, 0, 7, 0, 0],
  [0, 9, 0, 6, 0, 0, 1, 0, 0],
  [0, 0, 7, 0, 4, 0, 8, 0, 0],
  [0, 0, 8, 0, 0, 2, 0, 9, 0],
  [0, 0, 3, 0, 0, 0, 0, 7, 0],
  [5, 6, 0, 0, 0, 0, 0, 0, 8],
  [0, 0, 0, 5, 0, 0, 0, 0, 0],
];

// ======== MEDIUM SUDOKU BOARDS ========
const mediumSudoku1 = [
  [0, 2, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 6, 0, 0, 0, 0, 3],
  [0, 7, 4, 0, 8, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 3, 0, 0, 2],
  [0, 8, 0, 0, 4, 0, 0, 1, 0],
  [6, 0, 0, 5, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 0, 7, 8, 0],
  [5, 0, 0, 0, 0, 9, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 4, 0],
];

const mediumSudoku2 = [
  [0, 0, 0, 9, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 6, 3],
  [0, 7, 5, 0, 0, 6, 0, 0, 0],
  [0, 0, 0, 0, 0, 8, 0, 5, 0],
  [8, 9, 0, 0, 7, 0, 0, 1, 4],
  [0, 1, 0, 6, 0, 0, 0, 0, 0],
  [0, 0, 0, 7, 0, 0, 8, 2, 0],
  [6, 3, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 4, 0, 0, 0],
];

const mediumSudoku3 = [
  [4, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 9, 0, 0, 0],
  [0, 0, 0, 0, 8, 0, 1, 5, 0],
  [0, 0, 0, 6, 0, 0, 0, 0, 2],
  [0, 0, 3, 0, 4, 0, 7, 0, 0],
  [7, 0, 0, 0, 0, 8, 0, 0, 0],
  [0, 6, 2, 0, 5, 0, 0, 0, 0],
  [0, 0, 0, 9, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 5],
];

const mediumSudoku4 = [
  [0, 0, 0, 5, 0, 0, 0, 9, 0],
  [0, 0, 0, 0, 0, 0, 0, 7, 0],
  [0, 0, 2, 0, 0, 6, 5, 0, 0],
  [8, 7, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 9, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 6, 1],
  [0, 0, 9, 4, 0, 0, 3, 0, 0],
  [0, 3, 0, 0, 0, 0, 0, 0, 0],
  [0, 4, 0, 0, 0, 7, 0, 0, 0],
];

const mediumSudoku5 = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [3, 0, 0, 0, 0, 8, 0, 0, 5],
  [0, 0, 6, 0, 0, 0, 2, 3, 0],
  [0, 0, 0, 7, 0, 0, 5, 0, 0],
  [0, 1, 0, 0, 0, 0, 0, 8, 0],
  [0, 0, 9, 0, 0, 6, 0, 0, 0],
  [0, 9, 7, 0, 0, 0, 4, 0, 0],
  [6, 0, 0, 5, 0, 0, 0, 0, 2],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
];

// ======== HARD SUDOKU BOARDS ========
const hardSudoku1 = [
  [0, 0, 0, 0, 0, 0, 0, 8, 0],
  [0, 0, 6, 0, 0, 0, 0, 0, 0],
  [9, 0, 0, 0, 0, 0, 0, 5, 0],
  [0, 0, 0, 0, 4, 0, 8, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 2, 0],
  [0, 7, 0, 0, 0, 0, 0, 0, 0],
  [0, 5, 0, 0, 3, 0, 0, 0, 0],
  [0, 0, 0, 8, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 6, 0, 7],
];

const hardSudoku2 = [
  [8, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 3, 6, 0, 0, 0, 0, 0],
  [0, 7, 0, 0, 9, 0, 2, 0, 0],
  [0, 5, 0, 0, 0, 7, 0, 0, 0],
  [0, 0, 0, 0, 4, 5, 7, 0, 0],
  [0, 0, 0, 1, 0, 0, 0, 3, 0],
  [0, 0, 1, 0, 0, 0, 0, 6, 8],
  [0, 0, 8, 5, 0, 0, 0, 1, 0],
  [0, 9, 0, 0, 0, 0, 4, 0, 0],
];

const hardSudoku3 = [
  [0, 2, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 8],
  [0, 0, 0, 0, 0, 5, 0, 0, 0],
  [0, 0, 3, 0, 0, 0, 0, 9, 0],
  [7, 0, 0, 0, 0, 0, 2, 0, 0],
  [0, 9, 0, 0, 0, 4, 0, 0, 0],
  [0, 8, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 6, 0, 0],
  [0, 0, 0, 0, 0, 1, 0, 0, 0],
];

const hardSudoku4 = [
  [0, 0, 0, 0, 0, 0, 0, 1, 2],
  [0, 0, 0, 0, 0, 0, 0, 0, 3],
  [0, 0, 2, 3, 0, 0, 4, 0, 0],
  [0, 0, 1, 8, 0, 0, 0, 0, 5],
  [0, 6, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 8, 5, 0, 0, 0, 0, 0],
  [9, 0, 0, 0, 0, 0, 3, 0, 0],
  [4, 7, 0, 0, 0, 0, 0, 0, 0],
];

const hardSudoku5 = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 3, 0, 8, 5],
  [0, 0, 1, 0, 2, 0, 0, 0, 0],
  [0, 0, 0, 5, 0, 7, 0, 0, 0],
  [0, 0, 4, 0, 0, 0, 1, 0, 0],
  [0, 9, 0, 0, 0, 0, 0, 0, 0],
  [5, 0, 0, 0, 0, 0, 0, 7, 3],
  [0, 0, 2, 0, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 4, 0, 0, 0, 9],
];

// Export all boards
export const sudokuBoards = {
  0: [easySudoku1, easySudoku2, easySudoku3, easySudoku4, easySudoku5],
  1: [
    mediumSudoku1,
    mediumSudoku2,
    mediumSudoku3,
    mediumSudoku4,
    mediumSudoku5,
  ],
  2: [hardSudoku1, hardSudoku2, hardSudoku3, hardSudoku4, hardSudoku5],
};

export const setInitialBoard = (diff, index) => {
  return sudokuBoards[diff][index];
};

export const validMap = (diff, index) => {
  const board = sudokuBoards[diff][index];
  const rows = Array.from({ length: 9 }, () => new Map());
  const cols = Array.from({ length: 9 }, () => new Map());
  const boxes = Array.from({ length: 9 }, () => new Map());

  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      const val = board[r][c];
      if (val === 0) continue;
      const boxIndex = Math.floor(r / 3) * 3 + Math.floor(c / 3);
      rows[r].set(val, [r, c]);
      cols[c].set(val, [r, c]);
      boxes[boxIndex].set(val, [r, c]);
    }
  }
  return [rows, cols, boxes];
};

export function isValidSudoku(board) {
  const rows = Array.from({ length: 9 }, () => new Map());
  const cols = Array.from({ length: 9 }, () => new Map());
  const boxes = Array.from({ length: 9 }, () => new Map());
  const res = new Set();
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      const val = board[r][c];
      if (val === 0 || val === "") continue; // Skip empty cells

      const boxIndex = Math.floor(r / 3) * 3 + Math.floor(c / 3);

      if (rows[r].has(val)) {
        const [i, j] = rows[r].get(val);
        res.add(`${i},${j}`);
        res.add(`${r},${c}`);
      }
      if (cols[c].has(val)) {
        const [i, j] = cols[c].get(val);
        res.add(`${i},${j}`);
        res.add(`${r},${c}`);
      }
      if (boxes[boxIndex].has(val)) {
        const [i, j] = boxes[boxIndex].get(val);
        res.add(`${i},${j}`);
        res.add(`${r},${c}`);
      }

      rows[r].set(val, [r, c]);
      cols[c].set(val, [r, c]);
      boxes[boxIndex].set(val, [r, c]);
    }
  }

  return res;
}

export const instantCheck = (val, r, c, board) => {
  const res = new Set()
  for (let i = 0; i < 9; i++) {
    const boxRow = Math.floor(r / 3) * 3 + Math.floor(i / 3);
    const boxCol = Math.floor(c / 3) * 3 + (i % 3);
    if(board[r][i] == val && i!==c){
      res.add(`${r},${i}`)
    }
    if(board[i][c] == val && i !== r){
      res.add(`${i},${c}`)
    }
    if(board[boxRow][boxCol] == val && boxRow!==r && boxCol !==c){
      res.add(`${boxRow},${boxCol}`)
    }
  }
  return res
};
