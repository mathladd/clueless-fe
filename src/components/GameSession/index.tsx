import React, { useEffect, useState } from 'react';
import { ReadyState } from 'react-use-websocket';
import { WS } from 'types/common';
import { Lobby } from 'types/lobby';
import GameBoard from '../GameBoard/GameBoard';
import GameCards from '../GameCards/GameCards';
import ClueSheet from '../ClueSheet/ClueSheet';
import Styles from './GameSession.module.css';

// API Request to get session users

function GameSession({ ws, lobby }: { ws: WS; lobby: any }) {
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
      console.log('example', data);
    }
  }, [ws.lastMessage]);

  const onButton1Click = () => {
    ws?.sendJsonMessage({
      request: 'createUser',
      username: 'Duy',
      password: 'asfasdfa',
    });
  };

  const onButton2Click = () => {
    ws.sendJsonMessage({ request: 'getUsers' });
  };

  return (
    <div>
      <button
        type="button"
        className="p-3 bg-orange-500 text-white rounded-lg"
        onClick={onButton1Click}
      >
        Login
      </button>
      <button
        type="button"
        className="p-3 bg-orange-500 text-white rounded-lg"
        onClick={onButton2Click}
      >
        Testing
      </button>
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
