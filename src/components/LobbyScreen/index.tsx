import { ReadyState } from 'react-use-websocket';
import { Dispatch, SetStateAction } from 'react';
import LoginInputs from 'components/LoginInputs';
import { WS } from 'types/common';
import { Lobby, UserReady } from 'types/lobby';

export default function LobbyScreen({
  ws,
  user,
  room,
  lobbies,
  isReady,
  onLogin,
  usernameInput,
  passwordInput,
  lobbyNameInput,
  userMess,
  setUsernameInput,
  setPasswordInput,
  setLobbyNameInput,
  onGetLobbies,
  onJoinRoom,
  onCreateLobby,
  onToggleReady,
  allUsersStatus,
  onStartGame,
}: {
  ws: WS;
  user: string;
  room: string | undefined;
  lobbies: Lobby | undefined;
  isReady: boolean;
  onLogin: ({ username, password }: { username: string; password: string }) => void;
  usernameInput: string;
  passwordInput: string;
  lobbyNameInput: string;
  userMess:
    | {
        message: string;
        type: 'SUCCESS' | 'ERROR' | 'INFO';
      }
    | undefined;
  allUsersStatus: UserReady | undefined;
  setUsernameInput: Dispatch<SetStateAction<string>>;
  setPasswordInput: Dispatch<SetStateAction<string>>;
  setLobbyNameInput: Dispatch<SetStateAction<string>>;
  onGetLobbies: () => void;
  onJoinRoom: ({ username, lobbyName }: { username: string; lobbyName: string }) => void;
  onCreateLobby: ({ username, lobbyName }: { username: string; lobbyName: string }) => void;
  onToggleReady: ({ username, lobbyName }: { username: string; lobbyName: string }) => void;
  onStartGame: ({ username, lobbyName }: { username: string; lobbyName: string }) => void;
}) {
  const typeMapping = { SUCCESS: 'text-emerald-500', ERROR: 'text-red-500', INFO: 'text-blue-500' };

  return (
    <div className="flex flex-col space-y-8 p-2">
      <div className="flex space-x-2">
        <button
          type="button"
          className="bg-slate-500 text-white p-2 rounded-lg w-fit hover:bg-slate-600 transition disabled:opacity-50"
          onClick={() => onLogin({ username: usernameInput, password: passwordInput })}
          disabled={ws.readyState !== ReadyState.OPEN}
        >
          Login
        </button>
        <button
          type="button"
          className="bg-slate-500 text-white p-2 rounded-lg w-fit hover:bg-slate-600 transition disabled:opacity-50"
          onClick={onGetLobbies}
          disabled={ws.readyState !== ReadyState.OPEN}
        >
          {ws.readyState === ReadyState.OPEN ? 'Get lobbies' : 'Loading...'}
        </button>

        <LoginInputs setUsernameInput={setUsernameInput} setPasswordInput={setPasswordInput} />
        {/* <button
            type="button"
            className="bg-slate-500 text-white p-2 rounded-lg w-fit hover:bg-slate-600 transition disabled:opacity-50"
            onClick={onGetUsers}
            disabled={getUsersState !== ReadyState.OPEN}
          >
            Get users
          </button> */}
      </div>
      <div className="flex flex-col">
        <div className="flex space-x-3 font-bold">
          <div>Current user: </div>
          <div>{user}</div>
        </div>
        {!!user && (
          <>
            <div className="flex space-x-3 font-bold">
              <div>Current room: </div>
              <div>{room ?? ''}</div>
            </div>
            {!!room && (
              <div className="flex flex-col space-y-2">
                <div className="flex space-x-3 font-bold items-center">
                  <div>Current state: </div>
                  <div className={isReady ? 'text-emerald-500' : 'text-slate-700'}>
                    {isReady ? 'READY' : 'NOT READY'}
                  </div>
                  <button
                    type="button"
                    className="bg-slate-500 text-white p-2 rounded-lg w-fit hover:bg-slate-600 transition disabled:opacity-50"
                    onClick={() => onToggleReady({ username: user, lobbyName: room })}
                    disabled={ws.readyState !== ReadyState.OPEN}
                  >
                    Toggle ready
                  </button>
                </div>
                <div className="flex flex-col space-y-2">
                  <div>All users status:</div>
                  <div>
                    {!!allUsersStatus &&
                      Object.entries(allUsersStatus).map((item) => (
                        <div className="flex space-x-2">
                          <div>{item[0]}</div>
                          <div>{item[1] ? 'READY' : 'NOT READY'}</div>
                        </div>
                      ))}
                  </div>
                  <button
                    type="button"
                    className="bg-slate-500 text-white p-2 rounded-lg w-fit hover:bg-slate-600 transition disabled:opacity-50"
                    onClick={() => onStartGame({ username: user, lobbyName: room })}
                    disabled={ws.readyState !== ReadyState.OPEN}
                  >
                    Start game
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
      <div className="flex flex-col space-y-2">
        <div className={typeMapping[userMess?.type ?? 'INFO']}>{userMess?.message}</div>
        <div>{!!ws?.lastMessage && JSON.parse(JSON.stringify(ws?.lastMessage.data))}</div>
      </div>
      <div className="flex items-center space-x-2">
        <div>New lobby name</div>
        <input
          className="w-40 border border-slate-600 rounded-md p-2"
          onChange={(e) => setLobbyNameInput(e.target.value)}
        />
        <button
          type="button"
          className="bg-slate-500 text-white p-2 rounded-lg w-fit hover:bg-slate-600 transition disabled:opacity-50"
          onClick={() => onCreateLobby({ username: user, lobbyName: lobbyNameInput })}
          disabled={ws.readyState !== ReadyState.OPEN}
        >
          Create lobby
        </button>
      </div>
      {!lobbies || Object.keys(lobbies).length <= 0 ? null : (
        <div className="flex flex-col space-y-5">
          {Object.entries(lobbies).map((lobby, index) => (
            <button
              type="button"
              key={`${index + 1}`}
              className="bg-slate-900 text-white rounded-lg flex flex-col justify-between overflow-hidden min-h-32 w-80 cursor-pointer hover:brightness-125 transition text-start"
              onClick={() => onJoinRoom({ username: user, lobbyName: lobby[0] })}
            >
              <div className="text-3xl p-4 w-full font-bold">
                {index + 1}. {String(lobby[0] ?? '')}
              </div>
              <div className="bg-slate-600 flex-1 p-4 w-full">
                <div className="text-lg text-slate-300 font-bold">Players</div>
                <div className="text-sm text-slate-100">{String(lobby[1] ?? '')}</div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
