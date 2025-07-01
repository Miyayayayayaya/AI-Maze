import styles from '../page.module.css';
import Cell from './Cell';
type BoardProps = {
  mazeBoard: number[][];
  positionAI: number[][];
  angleAI: number;
};
export default function Board({ mazeBoard, positionAI, angleAI }: BoardProps) {
  return (
    <div className={styles.board}>
      {mazeBoard.map((row, y) =>
        row.map((color, x) => (
          <Cell
            key={`${x}-${y}`}
            x={x}
            y={y}
            mazeBoard={mazeBoard}
            positionAI={positionAI}
            angleAI={angleAI}
          />
        )),
      )}
    </div>
  );
}
