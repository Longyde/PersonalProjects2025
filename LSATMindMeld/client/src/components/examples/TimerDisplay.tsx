import { TimerDisplay } from "../TimerDisplay";

export default function TimerDisplayExample() {
  return (
    <div className="p-6 space-y-6">
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">Normal state (2 minutes)</p>
        <TimerDisplay
          initialSeconds={120}
          onTick={(s) => console.log("Time remaining:", s)}
        />
      </div>
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">Warning state (25 seconds)</p>
        <TimerDisplay initialSeconds={25} />
      </div>
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">Critical state (8 seconds)</p>
        <TimerDisplay initialSeconds={8} onTimeUp={() => console.log("Time's up!")} />
      </div>
    </div>
  );
}
