import { useEffect, useState } from 'react';
import GameSession from 'components/GameSession';
import { WS } from 'types/common';
import LobbyScreen from 'components/LobbyScreen';
import { Lobby } from 'types/lobby';
import 'bootstrap/dist/css/bootstrap.css';

function HomePage({ ws }: { ws: WS }) {
  const [isGameStarted, setIsGameStarted] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState(false);
  const [currentGameLobbyName, setCurrentGameLobbyName] = useState<string>();
  const [user, setUser] = useState<string>('');
  const [gameboardObj, setGameboardObj] = useState<any>();

  useEffect(() => setIsMounted(true), []);
  if (!isMounted) return null;
  return (
    <>
      {isGameStarted || true ? (
        <GameSession ws={ws} user={user} lobby={currentGameLobbyName} gameboardObj={gameboardObj} />
      ) : (
        <LobbyScreen
          ws={ws}
          setIsGameStarted={setIsGameStarted}
          user={user}
          setUser={setUser}
          setCurrentGameLobbyName={setCurrentGameLobbyName}
          setGameboardObj={setGameboardObj}
        />
      )}
      <div />
    </>
  );
}

export default HomePage;
