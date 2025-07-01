import styles from '../page.module.css';
type MakeResetProps = {
  onClick: () => void;
};

export default function MakeReset({ onClick }: MakeResetProps) {
  return (
    <div
      className={styles.makeResetButton}
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
    >
      生成/リセット
    </div>
  );
}
