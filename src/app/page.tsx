'use client';
import { useEffect, useRef, useState } from 'react';
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
const handDirection = (angleAI: number) => {
  //右向き
  if (angleAI % 4 === 0) {
    return [directions[0], directions[1], directions[2], directions[3]];
  }
  //下向き
  if (angleAI % 4 === 1) {
    return [directions[1], directions[2], directions[3], directions[0]];
  }
  //左向き
  if (angleAI % 4 === 2) {
    return [directions[2], directions[3], directions[0], directions[1]];
  }
  //上向き
  else {
    return [directions[3], directions[0], directions[1], directions[2]];
  }
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
  const [gameStart, setGameStart] = useState(false);
  const angleRef = useRef(angleAI);
  const positionRef = useRef(positionAI);
  const mazeRef = useRef(mazeBoard);
  const clickAIRun = () => {
    const newPositionAI = structuredClone(positionAI);
    if (positionAI.flat().filter((i) => i === 0).length === 143) {
      newPositionAI[1][1] = 1;
    }
    setGameStart(true);
    setPositionAI(newPositionAI);
  };
  useEffect(() => {
    if (!gameStart) return;
    if (positionAI[9][11] === 1) return;
    const interval = setInterval(() => {
      angleRef.current = angleAI;
      positionRef.current = positionAI;
      mazeRef.current = mazeBoard;
      let newAngleAI = angleAI;
      const directionAI = handDirection(angleRef.current);
      const newPositionAI = structuredClone(positionRef.current);
      const newMazeBoard = structuredClone(mazeRef.current);
      const ty = directionAI[0][0];
      const tx = directionAI[0][1];
      const ry = directionAI[1][0];
      const rx = directionAI[1][1];
      const by = directionAI[2][0];
      const bx = directionAI[2][1];
      const ly = directionAI[3][0];
      const lx = directionAI[3][1];
      for (let ky = 0; ky < 11; ky++) {
        for (let kx = 0; kx < 13; kx++) {
          if (
            positionAI[ky][kx] === 1 &&
            mazeBoard[ky + ty][kx + tx] === 1 &&
            mazeBoard[ky + ry][kx + rx] === 0 &&
            mazeBoard[ky + by][kx + bx] === 1
          ) {
            newPositionAI[ky][kx] = 0;
            newPositionAI[ky + ry][kx + rx] = 1;
          }
          if (
            positionAI[ky][kx] === 1 &&
            mazeBoard[ky + ty][kx + tx] === 1 &&
            mazeBoard[ky + ry][kx + rx] === 1 &&
            mazeBoard[ky + by][kx + bx] === 1
          ) {
            newPositionAI[ky][kx] = 0;
            newPositionAI[ky + ly][kx + lx] = 1;
            newAngleAI++;
            newAngleAI++;
          }
          if (
            positionAI[ky][kx] === 1 &&
            mazeBoard[ky + ty][kx + tx] === 0 &&
            mazeBoard[ky + ry][kx + rx] === 1 &&
            mazeBoard[ky + by][kx + bx] === 1
          ) {
            newPositionAI[ky][kx] = 0;
            newPositionAI[ky + ty][kx + tx] = 1;
            newAngleAI--;
          }
          if (
            positionAI[ky][kx] === 1 &&
            mazeBoard[ky + ty][kx + tx] === 1 &&
            mazeBoard[ky + ry][kx + rx] === 1 &&
            mazeBoard[ky + by][kx + bx] === 0
          ) {
            newPositionAI[ky][kx] = 0;
            newPositionAI[ky + by][kx + bx] = 1;
            newAngleAI++;
          }
          if (
            positionAI[ky][kx] === 1 &&
            mazeBoard[ky + ty][kx + tx] === 0 &&
            mazeBoard[ky + ry][kx + rx] === 0 &&
            mazeBoard[ky + by][kx + bx] === 1
          ) {
            newPositionAI[ky][kx] = 0;
            newPositionAI[ky + ty][kx + tx] = 1;
            newAngleAI--;
          }
          if (
            positionAI[ky][kx] === 1 &&
            mazeBoard[ky + ty][kx + tx] === 0 &&
            mazeBoard[ky + ry][kx + rx] === 1 &&
            mazeBoard[ky + by][kx + bx] === 0
          ) {
            newPositionAI[ky][kx] = 0;
            newPositionAI[ky + ty][kx + tx] = 1;
            newAngleAI--;
          }
          if (
            positionAI[ky][kx] === 1 &&
            mazeBoard[ky + ty][kx + tx] === 1 &&
            mazeBoard[ky + ry][kx + rx] === 0 &&
            mazeBoard[ky + by][kx + bx] === 0
          ) {
            newPositionAI[ky][kx] = 0;
            newPositionAI[ky + ry][kx + rx] = 1;
          }
          if (
            positionAI[ky][kx] === 1 &&
            mazeBoard[ky + ty][kx + tx] === 0 &&
            mazeBoard[ky + ry][kx + rx] === 0 &&
            mazeBoard[ky + by][kx + bx] === 0
          ) {
            newPositionAI[ky][kx] = 0;
            newPositionAI[ky + ty][kx + tx] = 1;
            newAngleAI--;
          }
          if (positionAI[ky][kx] === 1 && mazeBoard[ky + ry][kx + rx] === 3) {
            newPositionAI[ky][kx] = 0;
            newPositionAI[ky + ry][kx + rx] = 1;
            newMazeBoard[ky + ry][kx + rx] = 4;
          }
        }
      }
      setMazeBoard(newMazeBoard);
      setAngleAI(newAngleAI);
      setPositionAI(newPositionAI);
    }, 600);

    return () => clearInterval(interval);
  }, [angleAI, positionAI, mazeBoard, gameStart]);

  const clickResetBoard = () => {
    const newMazeBoard = structuredClone(mazeBoard);
    const newPositionAI = structuredClone(positionAI);
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
    for (let ky = 0; ky < 11; ky++) {
      for (let kx = 0; kx < 13; kx++) {
        newPositionAI[ky][kx] = 0;
      }
    }
    setGameStart(false);
    setPositionAI(newPositionAI);
    setMazeBoard(newMazeBoard);
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
                  mazeBoard[y][x] === 0
                    ? `#fff`
                    : mazeBoard[y][x] === 3
                      ? `#ea7272`
                      : mazeBoard[y][x] === 4
                        ? `#715eff`
                        : `#000`,
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
