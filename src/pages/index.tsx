import { useState } from 'react';
import GameSession from 'components/GameSession';
import { WS } from 'types/common';
import LobbyScreen from 'components/LobbyScreen';

function HomePage({ ws }: { ws: WS }) {
  const [isGameStarted, setIsGameStarted] = useState<boolean>(false);

  return (
    <>
      {isGameStarted || true ? (
        <GameSession />
      ) : (
        <LobbyScreen ws={ws} setIsGameStarted={setIsGameStarted} />
      )}
      <div />
    </>
  );
}

export default HomePage;
