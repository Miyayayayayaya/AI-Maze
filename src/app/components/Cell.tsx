import styles from '../page.module.css';
import UserAI from './UserAI';
type CellProps = {
  x: number;
  y: number;
  mazeBoard: number[][];
  positionAI: number[][];
  angleAI: number;
};

export default function Cell({ x, y, mazeBoard, positionAI, angleAI }: CellProps) {
  return (
    <div
      className={styles.cell}
      key={`${x}-${y}`}
      style={{
        backgroundColor:
          mazeBoard[y][x] === 0
            ? `#fff`
            : mazeBoard[y][x] === 2
              ? `#e0ff93`
              : mazeBoard[y][x] === 3
                ? `#ea7272`
                : mazeBoard[y][x] === 4
                  ? `#715eff`
                  : `#000`,
      }}
    >
      <UserAI positionAI={positionAI} x={x} y={y} angleAI={angleAI} />
    </div>
  );
}
