import React from 'react';
import GameBoard from '../GameBoard/GameBoard';
import GameCards from '../GameCards/GameCards';
import ClueSheet from '../ClueSheet/ClueSheet';
import Styles from './GameSession.module.css';
import { useEffect, useState } from 'react';
import { ReadyState } from 'react-use-websocket';
import { WS } from 'types/common';
import { Lobby } from 'types/lobby';

// API Request to get session users

function GameSession({ws, lobby}:{ws:WS, lobby: any}) {

  useEffect(() => {
    if (ws?.lastMessage?.data) {
      const data = JSON.parse(String(ws?.lastMessage?.data)) as {
        responseFor?: string;
        success?: string;
        message?: string;

        created_lobby?: string;
        lobby_name?: string;
        username?: string;
        ready_tracker?: string;
      };
      console.log("example", data)
    }
  }, [ws.lastMessage]);




  return (
    <div>
      <div style={{ alignItems: 'center' }}>
        <div className={Styles.flexgroup}>
          <div style={{ width: '25%' }}>
            <ClueSheet />
          </div>
          <div style={{ width: '75%' }}>
            <GameBoard />
          </div>
          <div style={{ width: '25%' }}>
            <GameCards />
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameSession;

///
