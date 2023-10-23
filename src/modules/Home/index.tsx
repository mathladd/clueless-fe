import { ReadyState } from 'react-use-websocket';
import { useEffect, useState } from 'react';
import LobbyList from 'components/LobbyList';
import { RESPONSIVE_PADDING_X } from 'constants/stylings';
import useUsers from 'hooks/useUsers';
import { WS } from 'types/common';
import useAuthentication from 'hooks/useAuthentication';
import ModalCreateLobby from './ModalCreateLobby';

export default function Home({ ws }: { ws: WS }) {
  const [isOpenModalCreateLobby, setIsOpenModalCreateLobby] = useState<boolean>(false);
  const { user } = useAuthentication({ ws });
  const [lobbies, setLobbies] = useState();

  const onCreateLobby = ({ lobbyName, username }) => {
    ws.sendJsonMessage({ request: 'createLobby', username: user?.name, lobby_name: 'test' });
  };
  const onGetLobbies = () => {
    ws.sendJsonMessage({ request: 'getLobbies' });
  };
  const getLobbiesState = () => {};
  const createLobbyState = () => {};

  const { getUsersState, onGetUsers } = useUsers();

  useEffect(() => {
    onGetLobbies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log(ws.lastJsonMessage);
  }, [ws.lastJsonMessage]);

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
          <button
            type="button"
            className="bg-slate-500 text-white p-2 rounded-lg w-fit hover:bg-slate-600 transition disabled:opacity-50"
            onClick={onGetUsers}
            disabled={getUsersState !== ReadyState.OPEN}
          >
            Get users
          </button>
        </div>
        <LobbyList lobbies={ws.lastJsonMessage} />
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
