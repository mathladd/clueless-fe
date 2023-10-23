import { ReadyState } from 'react-use-websocket';
import { useEffect, useState } from 'react';
import LobbyList from 'components/LobbyList';
import { RESPONSIVE_PADDING_X } from 'constants/stylings';
import { WS } from 'types/common';
import { Lobby } from 'types/lobby';
import ModalCreateLobby from './ModalCreateLobby';

export default function Home({ ws }: { ws: WS }) {
  const [isOpenModalCreateLobby, setIsOpenModalCreateLobby] = useState<boolean>(false);
  const [lobbies, setLobbies] = useState<Lobby>();

  const onCreateLobby = ({
    lobbyName,
    username,
  }: {
    lobbyName: string;
    username: string | undefined;
  }) => {
    ws.sendJsonMessage({ request: 'createLobby', username, lobby_name: lobbyName });
  };
  const onGetLobbies = () => {
    ws.sendJsonMessage({ request: 'getLobbies' });
  };

  // { "request": "createUser", "username":"a"}
  // { "request": "createLobby", "username":"a", "lobby_name": "1" }

  const onJoinRoom = ({
    lobbyName,
    username,
  }: {
    lobbyName: string;
    username: string | undefined;
  }) => ws.sendJsonMessage({ request: 'joinLobby', username, lobby_name: lobbyName });

  useEffect(() => {
    onGetLobbies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (ws?.lastMessage?.data) {
      const data = JSON.parse(String(ws?.lastMessage?.data)) as Lobby;
      if (!data?.responseFor) {
        setLobbies(data);
      } else {
        console.log(ws?.lastMessage);
      }
    }
  }, [ws.lastMessage]);

  return (
    <>
      <ModalCreateLobby
        isOpen={isOpenModalCreateLobby}
        onClose={() => setIsOpenModalCreateLobby(false)}
        onSubmit={onCreateLobby}
      />
      <div className={`flex flex-col space-y-10 ${RESPONSIVE_PADDING_X} py-10`}>
        <div className="flex space-x-2">
          <button
            type="button"
            className="bg-slate-500 text-white p-2 rounded-lg w-fit hover:bg-slate-600 transition disabled:opacity-50"
            onClick={onGetLobbies}
            disabled={ws.readyState !== ReadyState.OPEN}
          >
            {ws.readyState === ReadyState.OPEN ? 'Get lobbies' : 'Loading...'}
          </button>
          <button
            type="button"
            className="bg-slate-500 text-white p-2 rounded-lg w-fit hover:bg-slate-600 transition disabled:opacity-50"
            onClick={() => setIsOpenModalCreateLobby(true)}
            disabled={ws.readyState !== ReadyState.OPEN}
          >
            Create lobby
          </button>
          {/* <button
            type="button"
            className="bg-slate-500 text-white p-2 rounded-lg w-fit hover:bg-slate-600 transition disabled:opacity-50"
            onClick={onGetUsers}
            disabled={getUsersState !== ReadyState.OPEN}
          >
            Get users
          </button> */}
        </div>
        <LobbyList lobbies={lobbies} onJoinRoom={onJoinRoom} />
        {/* {lastMessage ? <span>Last message: {lastMessage.data}</span> : null} */}
        {/* <ul>
            {lobbies.map((message, idx) => (
              <span key={`${idx + 1}`}>{message ? message?.data : null}</span>
            ))}
          </ul> */}
      </div>
    </>
  );
}
