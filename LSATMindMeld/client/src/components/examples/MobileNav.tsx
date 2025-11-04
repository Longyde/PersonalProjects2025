import { MobileNav } from "../MobileNav";

export default function MobileNavExample() {
  return (
    <div className="relative h-screen pb-16 bg-background">
      <div className="p-6">
        <h2 className="text-xl font-display font-bold mb-4">Mobile Navigation Example</h2>
        <p className="text-muted-foreground">The navigation bar is fixed at the bottom (resize to mobile view)</p>
      </div>
      <MobileNav />
    </div>
  );
}
