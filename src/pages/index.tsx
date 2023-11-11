import { useEffect, useState } from 'react';
import GameSession from 'components/GameSession';
import { WS } from 'types/common';
import LobbyScreen from 'components/LobbyScreen';

function HomePage({ ws }: { ws: WS }) {
  const [isGameStarted, setIsGameStarted] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);
  if (!isMounted) return null;
  return (
    <>
      {isGameStarted || true ? (
        <GameSession ws = {ws}
                    lobby = {"example lobby"}/>
      ) : (
        <LobbyScreen ws={ws} setIsGameStarted={setIsGameStarted} />
      )}
      <div />
    </>
  );
}

export default HomePage;
