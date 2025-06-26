'use client';
import { useState } from 'react';
import styles from './page.module.css';
const direction = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];
const makeWallFunction = (mazeBoard: number[][]) => {
  const countWall: [number, number][] = [];
  const checkWall = new Set<string>();
  const storage: [number, number][] = [];
  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 11; x++) {
      if (mazeBoard[y][x] === 1) {
        countWall.push([y, x]);
      }
    }
  }
  for (const [ky, kx] of countWall) {
    let putStorage = true;
    while (putStorage) {
      const makeWallDirection = direction[Math.floor(Math.random() * direction.length)];
      if (!checkWall.has(`${ky + makeWallDirection[0]},${kx + makeWallDirection[1]}`)) {
        checkWall.add(`${ky + makeWallDirection[0]},${kx + makeWallDirection[1]}`);
        storage.push([ky + makeWallDirection[0], kx + makeWallDirection[1]]);
        putStorage = false;
      }
    }
  }

  console.log(countWall);
  console.log(storage);
  return storage;
};

export default function Home() {
  const [mazeBoard, setMazeBoard] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);
  const clickMakeMaze = () => {
    if (mazeBoard.flat().filter((i) => i === 1).length === 20) {
      const newMazeBoard = structuredClone(mazeBoard);
      for (const [ky, kx] of makeWallFunction(newMazeBoard)) {
        newMazeBoard[ky][kx] = 1;
      }
      setMazeBoard(newMazeBoard);
      console.log(mazeBoard);
    }
  };

  return (
    <div className={styles.container}>
      <div
        className={styles.makeMazeButton}
        onClick={(e) => {
          e.preventDefault();
          clickMakeMaze();
        }}
      >
        生成
      </div>
      <div className={styles.board}>
        {mazeBoard.map((row, y) =>
          row.map((color, x) => (
            <div
              className={styles.cell}
              key={`${x}-${y}`}
              style={{ backgroundColor: mazeBoard[y][x] === 0 ? `#fff` : `#000` }}
            />
          )),
        )}
      </div>
    </div>
  );
}
