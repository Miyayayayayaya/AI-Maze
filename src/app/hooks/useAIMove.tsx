'use client';
import { useEffect } from 'react';
import { useMaze } from '../hooks/useMazeState';
import { useMemory } from '../hooks/useMemory';
import { handDirection } from '../utils/utils';
export const useAIMove = () => {
  const {
    boardState,
    positionState,
    gameState,
    angleState,
    setAngleAI,
    setMazeBoard,
    setPositionAI,
  } = useMaze();
  const { angleRef, positionRef, mazeRef } = useMemory();
  useEffect(() => {
    if (!gameState) return;
    if (positionState[9][11] === 1) return;
    const interval = setInterval(() => {
      angleRef.current = angleState;
      positionRef.current = positionState;
      mazeRef.current = boardState;
      let newAngleAI = angleState;
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
            positionState[ky][kx] === 1 &&
            boardState[ky + ty][kx + tx] === 1 &&
            boardState[ky + ry][kx + rx] === 0 &&
            boardState[ky + by][kx + bx] === 1
          ) {
            newPositionAI[ky][kx] = 0;
            newPositionAI[ky + ry][kx + rx] = 1;
          }
          if (
            positionState[ky][kx] === 1 &&
            boardState[ky + ty][kx + tx] === 1 &&
            boardState[ky + ry][kx + rx] === 1 &&
            boardState[ky + by][kx + bx] === 1
          ) {
            newPositionAI[ky][kx] = 0;
            newPositionAI[ky + ly][kx + lx] = 1;
            newAngleAI++;
            newAngleAI++;
          }
          if (
            positionState[ky][kx] === 1 &&
            boardState[ky + ty][kx + tx] === 0 &&
            boardState[ky + ry][kx + rx] === 1 &&
            boardState[ky + by][kx + bx] === 1
          ) {
            newPositionAI[ky][kx] = 0;
            newPositionAI[ky + ty][kx + tx] = 1;
            newAngleAI--;
          }
          if (
            positionState[ky][kx] === 1 &&
            boardState[ky + ty][kx + tx] === 1 &&
            boardState[ky + ry][kx + rx] === 1 &&
            boardState[ky + by][kx + bx] === 0
          ) {
            newPositionAI[ky][kx] = 0;
            newPositionAI[ky + by][kx + bx] = 1;
            newAngleAI++;
          }
          if (
            positionState[ky][kx] === 1 &&
            boardState[ky + ty][kx + tx] === 0 &&
            boardState[ky + ry][kx + rx] === 0 &&
            boardState[ky + by][kx + bx] === 1
          ) {
            newPositionAI[ky][kx] = 0;
            newPositionAI[ky + ty][kx + tx] = 1;
            newAngleAI--;
          }
          if (
            positionState[ky][kx] === 1 &&
            boardState[ky + ty][kx + tx] === 0 &&
            boardState[ky + ry][kx + rx] === 1 &&
            boardState[ky + by][kx + bx] === 0
          ) {
            newPositionAI[ky][kx] = 0;
            newPositionAI[ky + ty][kx + tx] = 1;
            newAngleAI--;
          }
          if (
            positionState[ky][kx] === 1 &&
            boardState[ky + ty][kx + tx] === 1 &&
            boardState[ky + ry][kx + rx] === 0 &&
            boardState[ky + by][kx + bx] === 0
          ) {
            newPositionAI[ky][kx] = 0;
            newPositionAI[ky + ry][kx + rx] = 1;
          }
          if (
            positionState[ky][kx] === 1 &&
            boardState[ky + ty][kx + tx] === 0 &&
            boardState[ky + ry][kx + rx] === 0 &&
            boardState[ky + by][kx + bx] === 0
          ) {
            newPositionAI[ky][kx] = 0;
            newPositionAI[ky + ty][kx + tx] = 1;
            newAngleAI--;
          }
          if (positionState[ky][kx] === 1 && boardState[ky + ry][kx + rx] === 3) {
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
  }, [
    angleState,
    positionState,
    boardState,
    gameState,
    angleRef,
    positionRef,
    mazeRef,
    setMazeBoard,
    setAngleAI,
    setPositionAI,
  ]);
};
