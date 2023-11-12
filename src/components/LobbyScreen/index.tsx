import { ReadyState } from 'react-use-websocket';
import { Dispatch, useEffect, useState } from 'react';
import { SetStateAction } from 'jotai';
import LoginInputs from 'components/LoginInputs';
import { WS } from 'types/common';
import { Lobby, UserReady } from 'types/lobby';
import useLobbyScreen from 'hooks/useLobbyScreen';

export default function LobbyScreen({
  ws,
  setIsGameStarted,
  lobbies,
  setLobbies,
  user,
  setUser,
  currentGameLobby,
  setCurrentGameLobby,
}: {
  ws: WS;
  setIsGameStarted: Dispatch<SetStateAction<boolean>>;
  lobbies?: Lobby;
  setLobbies: Dispatch<SetStateAction<Lobby | undefined>>;
  user: string;
  setUser: Dispatch<SetStateAction<string>>;
  currentGameLobby: Lobby | undefined;
  setCurrentGameLobby: Dispatch<SetStateAction<Lobby | undefined>>;
}) {
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [lobbyNameInput, setLobbyNameInput] = useState('');
  const [room, setRoom] = useState<string>();
  const [isReady, setIsReady] = useState(false);
  const [allUsersStatus, setAllUserStatus] = useState<UserReady>();
  const [userMess, setUserMess] = useState<{
    message: string;
    type: 'SUCCESS' | 'ERROR' | 'INFO';
  }>();
  const { onLogin, onCreateLobby, onGetLobbies, onJoinRoom, onToggleReady, onStartGame } =
    useLobbyScreen({ ws });

  useEffect(() => {
    if (ws?.lastMessage?.data) {
      const data = JSON.parse(String(ws?.lastMessage?.data)) as {
        responseFor?: string;
        success?: string;
        message?: string;

        created_lobby?: string;
        lobby_name?: string;
        username?: string;
        ready_tracker?: string;
      };
      if (!data?.responseFor) {
        // This ws last message is about getting the list of Lobbies
        setLobbies(data as Lobby);
      } else if (data?.responseFor === 'createUser') {
        // This ws last message is about a new user has been created
        setUser(usernameInput);
        setUserMess({
          message: `You have successfully created a user! You are "${usernameInput}"`,
          type: 'SUCCESS',
        });
        onGetLobbies();
      } else if (data?.responseFor === 'createLobby') {
        // This ws last message is about a new lobby has been attempted to get created
        if (data?.success === 'true') {
          // This ws last message is about a new lobby has been successfully created
          setRoom(lobbyNameInput);
          setUserMess({
            message: `A new room named ${data.created_lobby ?? ''} has been successfully created! ${
              lobbyNameInput ? `You are now in room ${lobbyNameInput}` : ''
            }`,
            type: 'SUCCESS',
          });
          onGetLobbies();
        } else {
          // This ws last message is about a new lobby has failed to be created
          setUserMess({
            message: `Failed to create a new room because of ${data.message ?? ''}`,
            type: 'ERROR',
          });
        }
        // onGetLobbies();
      } else if (data?.responseFor === 'joinLobby') {
        // This ws last message is about a new player has joined the room
        if (data?.success === 'true') {
          const tracker = JSON.parse(data.ready_tracker ?? '') as UserReady;
          const status = tracker[user] as unknown as boolean;
          setIsReady(status);
          setAllUserStatus(tracker);
          setRoom(data.lobby_name);
          setUserMess({
            message: `${data.username ?? ''} has now joined room ${data.lobby_name ?? ''}`,
            type: 'SUCCESS',
          });
        } else {
          setUserMess({
            message: `Failed to join room because of ${data.message ?? ''}`,
            type: 'ERROR',
          });
        }
      } else if (data?.responseFor === 'toggleReady') {
        // This ws last message is about a new player has toggled ready state
        if (data?.success === 'true') {
          const tracker = JSON.parse(data.ready_tracker ?? '') as UserReady;
          const status = tracker[user] as unknown as boolean;
          setIsReady(status);
          setAllUserStatus(tracker);
          setUserMess({
            message: `The current users are ${String(Object.keys(tracker))}. You are now ${
              status ? 'READY' : 'NOT READY'
            }`,
            type: 'INFO',
          });
        } else {
          setUserMess({
            message: `Failed to join room because of ${data.message ?? ''}`,
            type: 'ERROR',
          });
        }
      } else if (data?.responseFor === 'startGame') {
        // This ws last message is about a new game has been started
        if (data?.success === 'true') {
          setIsGameStarted(true);
          setUserMess({
            message: `The game is now started`,
            type: 'INFO',
          });
          setCurrentGameLobby(lobbies);
        } else {
          setIsGameStarted(false);
          setUserMess({
            message: `Failed to start game because of ${data.message ?? ''}`,
            type: 'ERROR',
          });
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ws?.lastMessage]);

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
