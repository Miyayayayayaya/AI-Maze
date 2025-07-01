'use client';
import { useRef } from 'react';
import { useMaze } from '../hooks/useMazeState';
export const useMemory = () => {
  const { boardState, positionState, angleState } = useMaze();
  const angleRef = useRef(angleState);
  const positionRef = useRef(positionState);
  const mazeRef = useRef(boardState);
  angleRef.current = angleState;
  positionRef.current = positionState;
  mazeRef.current = boardState;
  return { angleRef, positionRef, mazeRef };
};
