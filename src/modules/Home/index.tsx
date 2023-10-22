import { ReadyState } from 'react-use-websocket';
import { useEffect, useState } from 'react';
import LobbyList from 'components/LobbyList';
import { RESPONSIVE_PADDING_X } from 'constants/stylings';
import useLobby from 'hooks/useLobby';
import useUsers from 'hooks/useUsers';
import ModalCreateLobby from './ModalCreateLobby';

export default function Home() {
  const [isOpenModalCreateLobby, setIsOpenModalCreateLobby] = useState<boolean>(false);

  const { onCreateLobby, onGetLobbies, getLobbiesState, createLobbyState, lobbies } = useLobby();
  const { getUsersState, onGetUsers } = useUsers();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => onGetLobbies(), []);

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
            disabled={getLobbiesState !== ReadyState.OPEN}
          >
            {getLobbiesState === ReadyState.OPEN ? 'Get lobbies' : 'Loading...'}
          </button>
          <button
            type="button"
            className="bg-slate-500 text-white p-2 rounded-lg w-fit hover:bg-slate-600 transition disabled:opacity-50"
            onClick={() => setIsOpenModalCreateLobby(true)}
            disabled={createLobbyState !== ReadyState.OPEN}
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
        <LobbyList lobbies={lobbies} />
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
