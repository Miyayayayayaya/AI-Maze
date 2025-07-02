type SpeedCustomProps = {
  speedCustom: number;
  setSpeedCustom: (speed: number) => void;
};
export default function SpeedCustom({ speedCustom, setSpeedCustom }: SpeedCustomProps) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const s = Number((form.elements.namedItem('speed') as HTMLInputElement).value);
        if (s > 0) {
          setSpeedCustom(s);
        } else {
          alert('正しい値を入力してください');
        }
      }}
    >
      <label>
        速度（秒）
        <input type="number" name="speed" defaultValue={speedCustom} min={1} />
      </label>
      <button type="submit">更新</button>
    </form>
  );
}
