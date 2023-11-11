import { useEffect, useRef } from "react";
import CluelessMap from '../../../public/assets/images/Clueless Game Board.png'
import React from 'react';

const GameBoard = () => {
    const canvasRef = useRef <HTMLCanvasElement | null > (null);
    console.log(CluelessMap);
    useEffect(() => {
        const canvas = canvasRef.current;
        if(!canvas){
            return;
        }
        canvas.width = 860;
        canvas.height = 1000;
        
        const context = canvas.getContext('2d');
        if(!context){
            return;
        }
        //context.fillStyle = 'black';
        //context.fillRect(0, 0, 1100, 920);
        let gameMap = new Image();
        gameMap.src = CluelessMap.src;
        console.log(gameMap);
        gameMap.onload = () =>{
            context.drawImage(gameMap, -120, 0);
        }
    }, []);

    return <canvas ref={canvasRef} />;
    
}

export default GameBoard;