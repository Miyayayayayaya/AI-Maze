import styles from '../page.module.css';
type UserAIProps = {
  positionAI: number[][];
  x: number;
  y: number;
  angleAI: number;
};
export default function UserAI({ positionAI, x, y, angleAI }: UserAIProps) {
  return (
    <div
      className={styles.userAI}
      style={{ opacity: positionAI[y][x] === 1 ? 1 : 0, transform: `rotate(${angleAI * 90}deg)` }}
    />
  );
}
