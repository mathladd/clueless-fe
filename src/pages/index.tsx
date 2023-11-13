import { useEffect, useState } from 'react';
import GameSession from 'components/GameSession';
import { WS } from 'types/common';
import LobbyScreen from 'components/LobbyScreen';
import { Lobby } from 'types/lobby';
import 'bootstrap/dist/css/bootstrap.css';

function HomePage({ ws }: { ws: WS }) {
  const [isGameStarted, setIsGameStarted] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState(false);
  const [lobbies, setLobbies] = useState<Lobby>();
  const [currentGameLobbyName, setCurrentGameLobbyName] = useState<string>();
  const [user, setUser] = useState<string>('');

  useEffect(() => setIsMounted(true), []);
  if (!isMounted) return null;
  return (
    <>
      {isGameStarted || true ? (
        <GameSession ws={ws} user={user} lobby={currentGameLobbyName} />
      ) : (
        <LobbyScreen
          ws={ws}
          setIsGameStarted={setIsGameStarted}
          lobbies={lobbies}
          setLobbies={setLobbies}
          user={user}
          setUser={setUser}
          setCurrentGameLobbyName={setCurrentGameLobbyName}
        />
      )}
      <div />
    </>
  );
}

export default HomePage;
