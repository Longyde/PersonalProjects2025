import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { XPProgressBar } from "@/components/XPProgressBar";
import { StreakDisplay } from "@/components/StreakDisplay";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ArrowLeft, Settings, LogOut, Bell, HelpCircle } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function Profile() {
  const [, setLocation] = useLocation();
  const [userName] = useState("LSAT Learner");
  const [userLevel] = useState(5);
  const [userXP] = useState(350);
  const [streak] = useState(7);

  return (
    <div className="min-h-screen pb-20 md:pb-8">
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="container flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setLocation("/")}
              data-testid="button-back"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-display font-bold">Profile</h1>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <div className="container px-4 py-8 max-w-2xl mx-auto space-y-6">
        <Card className="p-6 md:p-8">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <Avatar className="h-24 w-24">
              <AvatarFallback className="text-2xl font-display font-bold bg-gradient-to-br from-primary to-primary/50">
                {userName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 text-center sm:text-left space-y-3">
              <div>
                <h2 className="text-2xl font-display font-bold">{userName}</h2>
                <p className="text-muted-foreground">Member since January 2024</p>
              </div>
              <XPProgressBar currentXP={userXP} targetXP={500} level={userLevel} />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <StreakDisplay streak={streak} />
        </Card>

        <div className="space-y-2">
          <h3 className="text-lg font-display font-semibold px-2">Settings</h3>
          <Card className="divide-y">
            <button
              className="w-full flex items-center gap-4 p-4 hover-elevate active-elevate-2 transition-all"
              onClick={() => console.log("Notifications settings")}
              data-testid="button-notifications"
            >
              <Bell className="h-5 w-5 text-muted-foreground" />
              <span className="flex-1 text-left">Notifications</span>
            </button>
            <button
              className="w-full flex items-center gap-4 p-4 hover-elevate active-elevate-2 transition-all"
              onClick={() => console.log("Settings")}
              data-testid="button-settings"
            >
              <Settings className="h-5 w-5 text-muted-foreground" />
              <span className="flex-1 text-left">Preferences</span>
            </button>
            <button
              className="w-full flex items-center gap-4 p-4 hover-elevate active-elevate-2 transition-all"
              onClick={() => console.log("Help")}
              data-testid="button-help"
            >
              <HelpCircle className="h-5 w-5 text-muted-foreground" />
              <span className="flex-1 text-left">Help & Support</span>
            </button>
          </Card>
        </div>

        <Button
          variant="outline"
          className="w-full"
          onClick={() => console.log("Logout")}
          data-testid="button-logout"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Log Out
        </Button>
      </div>
    </div>
  );
}
