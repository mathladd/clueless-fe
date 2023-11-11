import { useEffect, useState } from 'react';
import { SetStateAction } from 'jotai';
import GameSession from 'components/GameSession';
import { WS } from 'types/common';
import LobbyScreen from 'components/LobbyScreen';
import { Lobby } from 'types/lobby';

function HomePage({ ws }: { ws: WS }) {
  const [isGameStarted, setIsGameStarted] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState(false);
  const [lobbies, setLobbies] = useState<Lobby>();
  const [currentGameLobby, setCurrentGameLobby] = useState<Lobby>();
  const [user, setUser] = useState('');

  useEffect(() => setIsMounted(true), []);
  if (!isMounted) return null;
  return (
    <>
      {isGameStarted || true ? (
        <GameSession />
      ) : (
        <LobbyScreen
          ws={ws}
          setIsGameStarted={setIsGameStarted}
          lobbies={lobbies}
          setLobbies={setLobbies}
          user={user}
          setUser={setUser}
        />
      )}
      <div />
    </>
  );
}

export default HomePage;
