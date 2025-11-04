import { useTowerDefense } from "../lib/stores/useTowerDefense";
import { useAudio } from "../lib/stores/useAudio";
import { useIsMobile } from "../hooks/use-is-mobile";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";
import { TOWER_TYPES } from "../lib/gameTypes";

export default function GameUI() {
  const { 
    phase, 
    elixir, 
    maxElixir,
    score, 
    currentWave, 
    lives,
    chaosEvent,
    placeTower,
    startGame,
    restartGame
  } = useTowerDefense();
  
  const { toggleMute, isMuted } = useAudio();
  const isMobile = useIsMobile();

  const handleTowerSelect = (towerType: string) => {
    placeTower(towerType, { x: 0, y: 0, z: 0 }); // Position will be set by click/touch
  };

  if (phase === "ready") {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
        <Card className="w-80 bg-white text-black">
          <CardHeader>
            <CardTitle className="text-center text-2xl">Tower Defense</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-center text-gray-600">
              Defend your base from waves of enemies!
            </p>
            <p className="text-center text-sm text-gray-500">
              Place towers to stop enemies from reaching the end.
              Earn elixir to build more defenses.
            </p>
            <Button 
              onClick={startGame}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white"
            >
              Start Game
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (phase === "ended") {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
        <Card className="w-80 bg-white text-black">
          <CardHeader>
            <CardTitle className="text-center text-2xl">Game Over</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <p className="text-lg font-semibold">Final Score: {score}</p>
              <p className="text-gray-600">Wave Reached: {currentWave}</p>
            </div>
            <Button 
              onClick={restartGame}
              className="w-full bg-green-500 hover:bg-green-600 text-white"
            >
              Play Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 pointer-events-none z-10">
      {/* Top HUD */}
      <div className="absolute top-4 left-4 right-4 flex justify-between pointer-events-auto">
        <Card className="bg-black bg-opacity-80 text-white border-gray-600">
          <CardContent className="p-3">
            <div className="flex items-center space-x-4 text-sm">
              <div>Lives: {lives}</div>
              <div>Wave: {currentWave}</div>
              <div>Score: {score}</div>
            </div>
          </CardContent>
        </Card>
        
        <Button
          onClick={toggleMute}
          variant="outline"
          size="sm"
          className="bg-black bg-opacity-80 text-white border-gray-600 hover:bg-gray-800"
        >
          {isMuted ? "🔇" : "🔊"}
        </Button>
      </div>

      {/* Elixir Bar */}
      <div className="absolute top-16 left-4 right-4 pointer-events-auto">
        <Card className="bg-black bg-opacity-80 text-white border-gray-600">
          <CardContent className="p-2">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-semibold">Elixir:</span>
              <Progress 
                value={(elixir / maxElixir) * 100} 
                className="flex-1 h-2"
              />
              <span className="text-sm">{Math.floor(elixir)}/{maxElixir}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Chaos Event Display */}
      {chaosEvent && (
        <div className="absolute top-24 left-1/2 transform -translate-x-1/2 pointer-events-auto">
          <Card className="bg-red-600 bg-opacity-90 text-white border-red-400">
            <CardContent className="p-3">
              <div className="text-center">
                <div className="font-bold">{chaosEvent.name}</div>
                <div className="text-sm">{chaosEvent.description}</div>
                <div className="text-xs">Duration: {Math.ceil(chaosEvent.duration)}s</div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Tower Selection - Bottom */}
      <div className="absolute bottom-4 left-4 right-4 pointer-events-auto">
        <Card className="bg-black bg-opacity-80 text-white border-gray-600">
          <CardContent className="p-3">
            <div className="grid grid-cols-3 gap-2">
              {Object.entries(TOWER_TYPES).map(([type, config]) => (
                <Button
                  key={type}
                  onClick={() => handleTowerSelect(type)}
                  disabled={elixir < config.cost}
                  variant="outline"
                  className={`h-16 flex flex-col bg-gray-800 border-gray-600 text-white hover:bg-gray-700 disabled:opacity-50 ${
                    elixir < config.cost ? 'cursor-not-allowed' : ''
                  }`}
                >
                  <div className="text-xs font-semibold">{config.name}</div>
                  <div className="text-xs">💰{config.cost}</div>
                  <div className="text-xs text-gray-300">DMG: {config.damage}</div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
