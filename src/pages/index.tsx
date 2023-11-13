import { useEffect, useState } from 'react';
import GameSession from 'components/GameSession';
import { WS } from 'types/common';
import LobbyScreen from 'components/LobbyScreen';
import 'bootstrap/dist/css/bootstrap.css';
import { GameBoardSetup } from 'types/game';

function HomePage({ ws }: { ws: WS }) {
  const [isGameStarted, setIsGameStarted] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState(false);
  const [currentGameLobbyName, setCurrentGameLobbyName] = useState<string>();
  const [user, setUser] = useState<string>();
  const [gameboard, setGameboard] = useState<GameBoardSetup>();

  useEffect(() => setIsMounted(true), []);
  if (!isMounted) return null;
  return (
    <>
      {isGameStarted ? (
        <GameSession ws={ws} username={user} lobby={currentGameLobbyName} gameBoard={gameboard} />
      ) : (
        <LobbyScreen
          ws={ws}
          setIsGameStarted={setIsGameStarted}
          user={user}
          setUser={setUser}
          setCurrentGameLobbyName={setCurrentGameLobbyName}
          setGameboard={setGameboard}
        />
      )}
      <div />
    </>
  );
}

export default HomePage;
