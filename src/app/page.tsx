'use client';
import { useState } from 'react';
import styles from './page.module.css';
const directions = [
  [-1, 0], //上
  [0, 1], //右
  [1, 0], //下
  [0, -1], //左
];
const makeWallFunction = (mazeBoard: number[][]) => {
  const countWall: [number, number][] = [];
  const checkWall = new Set<string>();
  const storage: [number, number][] = [];
  for (let y = 1; y < 10; y++) {
    for (let x = 1; x < 12; x++) {
      if (mazeBoard[y][x] === 1) {
        countWall.push([y, x]);
      }
    }
  }
  for (const [ky, kx] of countWall) {
    let putStorage = true;
    while (putStorage) {
      const makeWallDirection = directions[Math.floor(Math.random() * directions.length)];
      if (!checkWall.has(`${ky + makeWallDirection[0]},${kx + makeWallDirection[1]}`)) {
        checkWall.add(`${ky + makeWallDirection[0]},${kx + makeWallDirection[1]}`);
        storage.push([ky + makeWallDirection[0], kx + makeWallDirection[1]]);
        putStorage = false;
      }
    }
  }
  return storage;
};

export default function Home() {
  const [mazeBoard, setMazeBoard] = useState([
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  ]);
  const [positionAI, setPositionAI] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);
  const [angleAI, setAngleAI] = useState(0);
  const clickResetBoard = () => {
    const newMazeBoard = structuredClone(mazeBoard);
    for (let ky = 0; ky < 11; ky++) {
      for (let kx = 0; kx < 13; kx++) {
        newMazeBoard[ky][kx] = 0;
      }
    }
    for (let ky = 0; ky < 6; ky++) {
      for (let kx = 0; kx < 7; kx++) {
        newMazeBoard[ky * 2][kx * 2] = 1;
      }
    }
    for (let ky = 0; ky < 2; ky++) {
      for (let kx = 0; kx < 13; kx++) {
        newMazeBoard[ky * 10][kx] = 1;
      }
    }
    for (let ky = 0; ky < 11; ky++) {
      for (let kx = 0; kx < 2; kx++) {
        newMazeBoard[ky][kx * 12] = 1;
      }
    }

    setMazeBoard(newMazeBoard);
  };
  const clickAIRun = () => {
    const ty = directions[0][0];
    const tx = directions[0][1];
    const ry = directions[1][0];
    const rx = directions[1][1];
    const newPositionAI = structuredClone(positionAI);
    for (let ky = 0; ky < 11; ky++) {
      for (let kx = 0; kx < 13; kx++) {
        if (
          positionAI[ky][kx] === 1 &&
          mazeBoard[ky + ty][kx + tx] === 1 &&
          mazeBoard[ky + ry][kx + rx] === 0
        ) {
          newPositionAI[ky][kx] = 0;
          newPositionAI[ky][kx + 1] = 1;
        }
        if (
          positionAI[ky][kx] === 1 &&
          mazeBoard[ky + ty][kx + tx] === 1 &&
          mazeBoard[ky + ry][kx + rx] === 1
        ) {
          setAngleAI(1);
          newPositionAI[ky][kx] = 0;
          newPositionAI[ky + 1][kx] = 1;
        }
      }
    }
    setPositionAI(newPositionAI);
  };

  const clickMakeMaze = () => {
    if (mazeBoard.flat().filter((i) => i === 1).length === 64) {
      const newPositionAI = structuredClone(positionAI);
      newPositionAI[1][1] = 1;
      setPositionAI(newPositionAI);
      const newMazeBoard = structuredClone(mazeBoard);
      for (const [ky, kx] of makeWallFunction(newMazeBoard)) {
        newMazeBoard[ky][kx] = 1;
      }
      newMazeBoard[9][11] = 3;
      setMazeBoard(newMazeBoard);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.buttonComponent}>
        <div
          className={styles.makeResetButton}
          onClick={(e) => {
            e.preventDefault();
            clickResetBoard();
          }}
        >
          リセット
        </div>
        <div
          className={styles.makeMazeButton}
          onClick={(e) => {
            e.preventDefault();
            clickMakeMaze();
          }}
        >
          生成
        </div>
        <div
          className={styles.makeRunButton}
          onClick={(e) => {
            e.preventDefault();
            clickAIRun();
          }}
        >
          RUN
        </div>
      </div>

      <div className={styles.board}>
        {mazeBoard.map((row, y) =>
          row.map((color, x) => (
            <div
              className={styles.cell}
              key={`${x}-${y}`}
              style={{
                backgroundColor:
                  mazeBoard[y][x] === 0 ? `#fff` : mazeBoard[y][x] === 3 ? `#ea7272` : `#000`,
              }}
            >
              <div
                className={styles.userAI}
                style={{
                  opacity: positionAI[y][x] === 1 ? 1 : 0,
                  transform: `rotate(${angleAI * 90}deg)`,
                }}
              />
            </div>
          )),
        )}
      </div>
    </div>
  );
}
