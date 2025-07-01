'use client';
import { useState } from 'react';
import { makeWallFunction } from '../utils/utils';
const initialMazeBoard = [
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
];
const initialPositionAI = [
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
];
export const useMaze = () => {
  const [mazeBoard, setMazeBoard] = useState<number[][]>(initialMazeBoard);
  const [positionAI, setPositionAI] = useState<number[][]>(initialPositionAI);
  const [gameStart, setGameStart] = useState(false);
  const [angleAI, setAngleAI] = useState(40);
  const clickAIRun = () => {
    console.log('AIRun押される');
    const newPositionAI = structuredClone(positionAI);
    if (positionAI.flat().filter((i) => i === 0).length === 143) {
      newPositionAI[1][1] = 1;
    }
    setGameStart(true);
    setPositionAI(newPositionAI);
  };
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
    if (newMazeBoard.flat().filter((i) => i === 1).length === 64) {
      newPositionAI[1][1] = 1;
      for (const [ky, kx] of makeWallFunction(newMazeBoard)) {
        newMazeBoard[ky][kx] = 1;
      }
      newMazeBoard[9][11] = 3;
    }
    setGameStart(false);
    setPositionAI(newPositionAI);
    setMazeBoard(newMazeBoard);
  };
  return {
    clickResetBoard,
    clickAIRun,
    gameState: gameStart,
    boardState: mazeBoard,
    positionState: positionAI,
    angleState: angleAI,
    setAngleAI,
    setMazeBoard,
    setPositionAI,
  };
};
