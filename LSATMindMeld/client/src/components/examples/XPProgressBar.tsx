import { XPProgressBar } from "../XPProgressBar";

export default function XPProgressBarExample() {
  return (
    <div className="p-6 space-y-6 max-w-md">
      <XPProgressBar currentXP={350} targetXP={500} level={5} />
      <XPProgressBar currentXP={120} targetXP={200} level={2} />
      <XPProgressBar currentXP={480} targetXP={500} level={8} />
    </div>
  );
}
