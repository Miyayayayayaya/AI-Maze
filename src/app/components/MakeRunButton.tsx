import styles from '../page.module.css';
type MakeRunProps = {
  onClick: () => void;
};
export default function MakeRun({ onClick }: MakeRunProps) {
  return (
    <div
      className={styles.makeRunButton}
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
    >
      RUN
    </div>
  );
}
