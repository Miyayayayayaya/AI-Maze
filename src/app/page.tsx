'use client';
import { useEffect } from 'react';
import Board from '../app/components/Board';
import MakeReset from '../app/components/MakeReset';
import SpeedCustom from '../app/components/SpeedCustom';
import { useMaze } from '../app/hooks/useMazeState';
import { useMemory } from '../app/hooks/useMemory';
import { handDirection } from '../app/utils/utils';
import MakeRun from './components/MakeRunButton';
import styles from './page.module.css';

export default function Home() {
  const {
    boardState,
    positionState,
    gameState,
    angleState,
    speedState,
    setAngleAI,
    setMazeBoard,
    setPositionAI,
    setSpeedCustom,
    clickResetBoard,
    clickAIRun,
  } = useMaze();
  const { angleRef, positionRef, mazeRef } = useMemory();
  useEffect(() => {
    if (!gameState) return;
    if (positionState[13][17] === 1) return;
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
      for (let ky = 0; ky < 15; ky++) {
        for (let kx = 0; kx < 19; kx++) {
          if (
            positionState[ky][kx] === 1 &&
            boardState[ky + ty][kx + tx] === 1 &&
            boardState[ky + ry][kx + rx] === 0 &&
            boardState[ky + by][kx + bx] === 1
          ) {
            newMazeBoard[ky][kx] = 2;
            newPositionAI[ky][kx] = 0;
            newPositionAI[ky + ry][kx + rx] = 1;
            newAngleAI;
          }
          if (
            positionState[ky][kx] === 1 &&
            boardState[ky + ty][kx + tx] === 1 &&
            boardState[ky + ry][kx + rx] === 2 &&
            boardState[ky + by][kx + bx] === 1
          ) {
            newMazeBoard[ky][kx] = 0;
            newPositionAI[ky][kx] = 0;
            newPositionAI[ky + ry][kx + rx] = 1;
            newAngleAI;
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
            newMazeBoard[ky][kx] = 2;
            newPositionAI[ky][kx] = 0;
            newPositionAI[ky + ty][kx + tx] = 1;
            newAngleAI--;
          }
          if (
            positionState[ky][kx] === 1 &&
            boardState[ky + ty][kx + tx] === 2 &&
            boardState[ky + ry][kx + rx] === 1 &&
            boardState[ky + by][kx + bx] === 1
          ) {
            newMazeBoard[ky][kx] = 0;
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
            newMazeBoard[ky][kx] = 2;
            newPositionAI[ky][kx] = 0;
            newPositionAI[ky + by][kx + bx] = 1;
            newAngleAI++;
          }
          if (
            positionState[ky][kx] === 1 &&
            boardState[ky + ty][kx + tx] === 1 &&
            boardState[ky + ry][kx + rx] === 1 &&
            boardState[ky + by][kx + bx] === 2
          ) {
            newMazeBoard[ky][kx] = 0;
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
            newMazeBoard[ky][kx] = 2;
            newPositionAI[ky][kx] = 0;
            newPositionAI[ky + ty][kx + tx] = 1;
            newAngleAI--;
          }
          if (
            positionState[ky][kx] === 1 &&
            boardState[ky + ty][kx + tx] === 2 &&
            boardState[ky + ry][kx + rx] === 0 &&
            boardState[ky + by][kx + bx] === 1
          ) {
            newMazeBoard[ky][kx] = 0;
            newPositionAI[ky][kx] = 0;
            newPositionAI[ky + ty][kx + tx] = 1;
            newAngleAI--;
          }
          if (
            positionState[ky][kx] === 1 &&
            boardState[ky + ty][kx + tx] === 0 &&
            boardState[ky + ry][kx + rx] === 2 &&
            boardState[ky + by][kx + bx] === 1
          ) {
            newMazeBoard[ky][kx] = 2;
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
            newMazeBoard[ky][kx] = 2;
            newPositionAI[ky][kx] = 0;
            newPositionAI[ky + ty][kx + tx] = 1;
            newAngleAI--;
          }
          if (
            positionState[ky][kx] === 1 &&
            boardState[ky + ty][kx + tx] === 2 &&
            boardState[ky + ry][kx + rx] === 1 &&
            boardState[ky + by][kx + bx] === 0
          ) {
            newMazeBoard[ky][kx] = 0;
            newPositionAI[ky][kx] = 0;
            newPositionAI[ky + ty][kx + tx] = 1;
            newAngleAI--;
          }
          if (
            positionState[ky][kx] === 1 &&
            boardState[ky + ty][kx + tx] === 0 &&
            boardState[ky + ry][kx + rx] === 1 &&
            boardState[ky + by][kx + bx] === 2
          ) {
            newMazeBoard[ky][kx] = 2;
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
            newMazeBoard[ky][kx] = 2;
            newPositionAI[ky][kx] = 0;
            newPositionAI[ky + ry][kx + rx] = 1;
          }
          if (
            positionState[ky][kx] === 1 &&
            boardState[ky + ty][kx + tx] === 1 &&
            boardState[ky + ry][kx + rx] === 2 &&
            boardState[ky + by][kx + bx] === 0
          ) {
            newMazeBoard[ky][kx] = 0;
            newPositionAI[ky][kx] = 0;
            newPositionAI[ky + ry][kx + rx] = 1;
          }
          if (
            positionState[ky][kx] === 1 &&
            boardState[ky + ty][kx + tx] === 1 &&
            boardState[ky + ry][kx + rx] === 0 &&
            boardState[ky + by][kx + bx] === 2
          ) {
            newMazeBoard[ky][kx] = 2;
            newPositionAI[ky][kx] = 0;
            newPositionAI[ky + ry][kx + rx] = 1;
          }
          if (
            positionState[ky][kx] === 1 &&
            boardState[ky + ty][kx + tx] === 0 &&
            boardState[ky + ry][kx + rx] === 0 &&
            boardState[ky + by][kx + bx] === 0
          ) {
            newMazeBoard[ky][kx] = 2;
            newPositionAI[ky][kx] = 0;
            newPositionAI[ky + ty][kx + tx] = 1;
            newAngleAI--;
          }
          if (
            positionState[ky][kx] === 1 &&
            boardState[ky + ty][kx + tx] === 2 &&
            boardState[ky + ry][kx + rx] === 0 &&
            boardState[ky + by][kx + bx] === 0
          ) {
            newMazeBoard[ky][kx] = 0;
            newPositionAI[ky][kx] = 0;
            newPositionAI[ky + ty][kx + tx] = 1;
            newAngleAI--;
          }
          if (
            positionState[ky][kx] === 1 &&
            boardState[ky + ty][kx + tx] === 0 &&
            boardState[ky + ry][kx + rx] === 0 &&
            boardState[ky + by][kx + bx] === 2
          ) {
            newMazeBoard[ky][kx] = 2;
            newPositionAI[ky][kx] = 0;
            newPositionAI[ky + ty][kx + tx] = 1;
            newAngleAI--;
          }
          if (
            positionState[ky][kx] === 1 &&
            boardState[ky + ty][kx + tx] === 0 &&
            boardState[ky + ry][kx + rx] === 2 &&
            boardState[ky + by][kx + bx] === 0
          ) {
            newMazeBoard[ky][kx] = 2;
            newPositionAI[ky][kx] = 0;
            newPositionAI[ky + ty][kx + tx] = 1;
            newAngleAI--;
          }
          if (positionState[ky][kx] === 1 && boardState[ky + ry][kx + rx] === 3) {
            newMazeBoard[ky][kx] = 2;
            newPositionAI[ky][kx] = 0;
            newPositionAI[ky + ry][kx + rx] = 1;
            newMazeBoard[ky + ry][kx + rx] = 4;
          }
        }
      }
      console.log(angleRef);
      setMazeBoard(newMazeBoard);
      setAngleAI(newAngleAI);
      setPositionAI(newPositionAI);
    }, speedState * 1000);
    return () => clearInterval(interval);
  }, [
    angleState,
    positionState,
    boardState,
    gameState,
    angleRef,
    positionRef,
    mazeRef,
    speedState,
    setMazeBoard,
    setAngleAI,
    setPositionAI,
  ]);
  return (
    <div className={styles.container}>
      <div className={styles.buttonComponent}>
        <MakeReset onClick={clickResetBoard} />
        <MakeRun onClick={clickAIRun} />
      </div>
      <Board mazeBoard={boardState} positionAI={positionState} angleAI={angleState} />
      <SpeedCustom speedCustom={speedState} setSpeedCustom={setSpeedCustom} />
    </div>
  );
}
