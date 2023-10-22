import useWebsocket, { ReadyState } from 'react-use-websocket';
import { useCallback, useEffect, useState } from 'react';
import GameList from 'components/GameList';
import { RESPONSIVE_PADDING_X } from 'constants/stylings';

export default function Home() {
  const [socketUrl, setSocketUrl] = useState('wss://socketsbay.com/wss/v2/1/demo/');
  const [messageHistory, setMessageHistory] = useState<unknown[]>([]);
  const { sendMessage, lastMessage, readyState } = useWebsocket(socketUrl);

  const onSendData = useCallback(() => {
    sendMessage('testing');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (lastMessage !== null) {
      setMessageHistory((prev) => prev.concat(lastMessage as unknown));
    }
  }, [lastMessage, setMessageHistory]);

  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];

  return (
    <div className={`flex flex-col space-y-2 ${RESPONSIVE_PADDING_X} py-10`}>
      <GameList games={[]} />
      <button
        type="button"
        className="bg-slate-500 text-white p-2 rounded-lg w-fit"
        onClick={onSendData}
        disabled={readyState !== ReadyState.OPEN}
      >
        Send data
      </button>
      <span>The WebSocket is currently {connectionStatus}</span>
      {lastMessage ? <span>Last message: {lastMessage.data}</span> : null}
      <ul>
        {messageHistory.map((message, idx) => (
          <span key={idx}>{message ? message.data : null}</span>
        ))}
      </ul>
    </div>
  );
}
