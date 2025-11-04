import React, { useRef, useEffect, useCallback } from 'react';
import { useTowerDefense } from '../lib/stores/useTowerDefense';
import { updateGameLogic } from '../lib/gameLogic';

export default function Game2D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const lastTimeRef = useRef<number>(0);
  
  const { 
    enemies, 
    towers, 
    projectiles, 
    phase,
    updateGame,
    placeTower,
    selectedTowerType
  } = useTowerDefense();

  const draw = useCallback((ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    // Clear canvas
    ctx.fillStyle = '#87CEEB';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw ground
    ctx.fillStyle = '#228B22';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw path
    const pathWidth = 60;
    const pathX = (canvas.width - pathWidth) / 2;
    ctx.fillStyle = '#8B4513';
    ctx.fillRect(pathX, 0, pathWidth, canvas.height);
    
    // Draw start point
    ctx.fillStyle = '#00FF00';
    ctx.fillRect(pathX + 15, 10, 30, 30);
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('START', pathX + 30, 30);
    
    // Draw end point
    ctx.fillStyle = '#FF0000';
    ctx.fillRect(pathX + 15, canvas.height - 40, 30, 30);
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText('END', pathX + 30, canvas.height - 20);
    
    // Draw enemies
    enemies.forEach(enemy => {
      const x = pathX + 30 + (enemy.position.x * 10);
      const y = 50 + (enemy.position.z + 9) * (canvas.height - 100) / 18;
      
      // Enemy body
      const size = enemy.type === 'boss' ? 20 : enemy.type === 'tank' ? 15 : 10;
      ctx.fillStyle = enemy.type === 'basic' ? '#FF6B6B' : 
                     enemy.type === 'fast' ? '#4ECDC4' : 
                     enemy.type === 'tank' ? '#45B7D1' : '#96CEB4';
      ctx.fillRect(x - size/2, y - size/2, size, size);
      
      // Health bar
      const barWidth = size + 5;
      const barHeight = 3;
      ctx.fillStyle = '#333333';
      ctx.fillRect(x - barWidth/2, y - size/2 - 8, barWidth, barHeight);
      ctx.fillStyle = enemy.health / enemy.maxHealth > 0.5 ? '#00FF00' : '#FF0000';
      ctx.fillRect(x - barWidth/2, y - size/2 - 8, barWidth * (enemy.health / enemy.maxHealth), barHeight);
    });
    
    // Draw towers
    towers.forEach(tower => {
      const x = 100 + (tower.position.x + 10) * (canvas.width - 200) / 20;
      const y = 50 + (tower.position.z + 10) * (canvas.height - 100) / 20;
      
      // Tower base
      ctx.fillStyle = '#654321';
      ctx.beginPath();
      ctx.arc(x, y, 15, 0, 2 * Math.PI);
      ctx.fill();
      
      // Tower body
      ctx.fillStyle = tower.type === 'archer' ? '#8B4513' : 
                     tower.type === 'cannon' ? '#696969' : '#9370DB';
      ctx.fillRect(x - 8, y - 12, 16, 20);
      
      // Tower weapon
      if (tower.type === 'cannon') {
        ctx.fillStyle = '#2F2F2F';
        ctx.fillRect(x - 2, y - 15, 4, 10);
      } else if (tower.type === 'wizard') {
        ctx.fillStyle = '#FFD700';
        ctx.beginPath();
        ctx.moveTo(x, y - 15);
        ctx.lineTo(x - 5, y - 5);
        ctx.lineTo(x + 5, y - 5);
        ctx.closePath();
        ctx.fill();
      }
      
      // Range indicator (when selected)
      if (selectedTowerType) {
        ctx.strokeStyle = '#FFFFFF';
        ctx.globalAlpha = 0.3;
        ctx.beginPath();
        ctx.arc(x, y, tower.range * 10, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.globalAlpha = 1;
      }
    });
    
    // Draw projectiles
    projectiles.forEach(projectile => {
      const x = 100 + (projectile.position.x + 10) * (canvas.width - 200) / 20;
      const y = 50 + (projectile.position.z + 10) * (canvas.height - 100) / 20;
      
      ctx.fillStyle = projectile.type === 'arrow' ? '#8B4513' : 
                     projectile.type === 'cannonball' ? '#2F2F2F' : '#FF4500';
      
      if (projectile.type === 'arrow') {
        ctx.fillRect(x - 1, y - 3, 2, 6);
      } else {
        ctx.beginPath();
        ctx.arc(x, y, projectile.type === 'cannonball' ? 3 : 2, 0, 2 * Math.PI);
        ctx.fill();
      }
    });
  }, [enemies, towers, projectiles, selectedTowerType]);

  const handleCanvasClick = useCallback((event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!selectedTowerType || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    // Convert screen coordinates to game coordinates
    const gameX = (x - 100) * 20 / (canvas.width - 200) - 10;
    const gameZ = (y - 50) * 20 / (canvas.height - 100) - 10;
    
    // Check if click is on valid placement area (not on path)
    const pathCenter = 0;
    const pathWidth = 2;
    if (Math.abs(gameX - pathCenter) > pathWidth / 2) {
      placeTower(selectedTowerType, { x: gameX, y: 0.5, z: gameZ });
    }
  }, [selectedTowerType, placeTower]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const animate = (currentTime: number) => {
      const deltaTime = (currentTime - lastTimeRef.current) / 1000;
      lastTimeRef.current = currentTime;
      
      if (phase === "playing") {
        updateGameLogic(deltaTime);
        updateGame();
      }
      
      draw(ctx, canvas);
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [phase, draw, updateGame]);

  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      const container = canvas.parentElement;
      if (!container) return;
      
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      onClick={handleCanvasClick}
      style={{
        width: '100%',
        height: '100%',
        cursor: selectedTowerType ? 'crosshair' : 'default'
      }}
    />
  );
}