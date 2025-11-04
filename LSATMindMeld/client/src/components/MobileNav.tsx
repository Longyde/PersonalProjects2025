import { Home, Target, BarChart3, User } from "lucide-react";
import { Link, useLocation } from "wouter";

type NavItem = {
  icon: typeof Home;
  label: string;
  path: string;
};

const navItems: NavItem[] = [
  { icon: Home, label: "Home", path: "/" },
  { icon: Target, label: "Practice", path: "/practice" },
  { icon: BarChart3, label: "Progress", path: "/progress" },
  { icon: User, label: "Profile", path: "/profile" },
];

export function MobileNav() {
  const [location] = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 md:hidden">
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location === item.path;

          return (
            <Link
              key={item.path}
              href={item.path}
              className={`flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-lg transition-colors min-w-[4rem] hover-elevate active-elevate-2 ${
                isActive ? "text-primary" : "text-muted-foreground"
              }`}
              data-testid={`nav-${item.label.toLowerCase()}`}
            >
              <Icon className={`h-5 w-5 ${isActive ? "fill-current" : ""}`} />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
