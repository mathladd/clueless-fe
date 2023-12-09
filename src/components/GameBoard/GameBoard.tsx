import React, { useEffect, useRef } from 'react';
import CluelessMap from '../../../public/assets/images/Clueless Game Board Small Version.png';

function GameBoard() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }
    canvas.width = 660;
    canvas.height = 510;

    const context = canvas.getContext('2d');
    if (!context) {
      return;
    }
    // context.fillStyle = 'black';
    // context.fillRect(0, 0, 1100, 920);
    const gameMap = new Image();
    gameMap.src = CluelessMap.src;
    gameMap.onload = () => {
      context.drawImage(gameMap, -120, 0);
    };
  }, []);

  return <canvas ref={canvasRef} />;
}

export default GameBoard;
