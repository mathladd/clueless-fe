import { ReadyState } from 'react-use-websocket';
import { Dispatch, useCallback, useEffect, useState } from 'react';
import { SetStateAction } from 'jotai';
import LoginInputs from 'components/LoginInputs';
import { WS, WSResponse } from 'types/common';
import { Lobby, UserReady } from 'types/lobby';
import useLobbyScreen from 'hooks/useLobbyScreen';

export default function LobbyScreen({
  ws,
  setIsGameStarted,
  user,
  setUser,
  setCurrentGameLobbyName,
  setGameboard,
}: {
  ws: WS;
  setIsGameStarted: Dispatch<SetStateAction<boolean>>;
  user: string | undefined;
  setUser: Dispatch<SetStateAction<string | undefined>>;
  setCurrentGameLobbyName: Dispatch<SetStateAction<string | undefined>>;
  setGameboard: Dispatch<SetStateAction<any>>;
}) {
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [lobbyNameInput, setLobbyNameInput] = useState('');
  const [lobbies, setLobbies] = useState<Lobby>();
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
      const data = JSON.parse(String(ws?.lastMessage?.data)) as WSResponse;
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
          // This ws last message is about a new lobby has been successfully created by some
          // other users. The creator will not receive this message
          lobbyNameInput && setRoom(lobbyNameInput);
          setUserMess({
            message: `A new room named ${data.created_lobby ?? ''} has been successfully created!`,
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
          const tracker = data.lobbyReadyStatus as UserReady;
          const readyStatus = user ? (tracker[user] as unknown as boolean) : false;
          setIsReady(readyStatus);
          setAllUserStatus(tracker);
          setRoom(data.lobby_name);
          setUserMess({
            message: `${data.username ?? ''} has joined room ${data.lobby_name ?? ''}!`,
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
          const readyStatus = user ? (tracker[user] as unknown as boolean) : false;
          setIsReady(readyStatus);
          setAllUserStatus(tracker);
          setUserMess({
            message: `The current users are ${String(
              Object.keys(tracker).join(', '),
            )}. You are currently ${readyStatus ? 'READY' : 'NOT READY'}! ${
              ((arr) => arr.every((v) => v === true))(Object.values(tracker))
                ? 'The game can now be started!'
                : ''
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
          setCurrentGameLobbyName(room);
          setGameboard(data.gameboard_data);
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

  const onClickCreateLobby = useCallback(() => {
    onCreateLobby({ username: user, lobbyName: lobbyNameInput });
    setRoom(lobbyNameInput);
    setAllUserStatus({ user: false } as { [key: string]: boolean });
    setUserMess({
      message: `A new room named ${lobbyNameInput} has been successfully created! You are now in room ${lobbyNameInput}.`,
      type: 'SUCCESS',
    });
  }, [lobbyNameInput, onCreateLobby, user]);

  console.log(room);

  return (
    <div className="flex flex-col p-2 space-y-8">
      {!user ? (
        <div className="flex space-x-2">
          <button
            type="button"
            className="p-2 text-white transition rounded-lg bg-slate-500 w-fit hover:bg-slate-600 disabled:opacity-50"
            onClick={() => onLogin({ username: usernameInput, password: passwordInput })}
            disabled={ws.readyState !== ReadyState.OPEN}
          >
            Login
          </button>
          <button
            type="button"
            className="p-2 text-white transition rounded-lg bg-slate-500 w-fit hover:bg-slate-600 disabled:opacity-50"
            onClick={onGetLobbies}
            disabled={ws.readyState !== ReadyState.OPEN}
          >
            {ws.readyState === ReadyState.OPEN ? 'Get lobbies' : 'Loading...'}
          </button>

          <LoginInputs setUsernameInput={setUsernameInput} setPasswordInput={setPasswordInput} />
          {/* <button
            type="button"
            className="p-2 text-white transition rounded-lg bg-slate-500 w-fit hover:bg-slate-600 disabled:opacity-50"
            onClick={onGetUsers}
            disabled={getUsersState !== ReadyState.OPEN}
          >
            Get users
          </button> */}
        </div>
      ) : (
        <>
          <div className="flex flex-col">
            <div className="flex space-x-3 font-bold">
              <div>Current user: </div>
              <div>{user}</div>
            </div>
            <div className="flex space-x-3 font-bold">
              <div>Current room: </div>
              <div>{room ?? ''}</div>
            </div>
            {!!room && (
              <div className="flex flex-col space-y-2">
                <div className="flex items-center space-x-3 font-bold">
                  <div>Current state: </div>
                  <div className={isReady ? 'text-emerald-500' : 'text-slate-700'}>
                    {isReady ? 'READY' : 'NOT READY'}
                  </div>
                  <button
                    type="button"
                    className="p-2 text-white transition rounded-lg bg-slate-500 w-fit hover:bg-slate-600 disabled:opacity-50"
                    onClick={() => onToggleReady({ username: user, lobbyName: room })}
                    disabled={ws.readyState !== ReadyState.OPEN}
                  >
                    Toggle ready
                  </button>
                </div>
                <div className="flex flex-col space-y-2">
                  <div>All users status:</div>
                  <div className="flex space-x-3">
                    {!!allUsersStatus &&
                      Object.entries(allUsersStatus).map((item, index) => (
                        <div
                          className="flex flex-col items-center justify-center w-48 h-24 p-2 space-y-2 rounded-lg border-3 border-slate-700"
                          key={`${index + 1}`}
                        >
                          <div>Player: {item[0]}</div>
                          <div
                            className={`${
                              item[1] ? 'text-emerald-500' : 'text-red-500'
                            } whitespace-nowrap`}
                          >
                            Status: {item[1] ? 'READY' : 'NOT READY'}
                          </div>
                        </div>
                      ))}
                  </div>
                  <button
                    type="button"
                    className="p-2 text-white transition rounded-lg bg-slate-500 w-fit hover:bg-slate-600 disabled:opacity-50"
                    onClick={() => onStartGame({ username: user, lobbyName: room })}
                    disabled={ws.readyState !== ReadyState.OPEN}
                  >
                    Start game
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="flex flex-col space-y-2">
            <div className={typeMapping[userMess?.type ?? 'INFO']}>{userMess?.message}</div>
          </div>
          {!room && (
            <div className="flex items-center space-x-2">
              <div>New lobby name</div>
              <input
                className="w-40 p-2 border rounded-md border-slate-600"
                onChange={(e) => setLobbyNameInput(e.target.value)}
              />
              <button
                type="button"
                className="p-2 text-white transition rounded-lg bg-slate-500 w-fit hover:bg-slate-600 disabled:opacity-50"
                onClick={onClickCreateLobby}
                disabled={ws.readyState !== ReadyState.OPEN}
              >
                Create lobby
              </button>
            </div>
          )}
          {!lobbies || Object.keys(lobbies).length <= 0 || !!room ? null : (
            <div className="flex flex-col space-y-5">
              {Object.entries(lobbies).map((lobby, index) => (
                <button
                  type="button"
                  key={`${index + 1}`}
                  className="flex flex-col justify-between overflow-hidden text-white transition rounded-lg cursor-pointer bg-slate-900 min-h-32 w-80 hover:brightness-125 text-start"
                  onClick={() => onJoinRoom({ username: user, lobbyName: lobby[0] })}
                >
                  <div className="w-full p-4 text-3xl font-bold">
                    {index + 1}. {String(lobby[0] ?? '')}
                  </div>
                  <div className="flex-1 w-full p-4 bg-slate-600">
                    <div className="text-lg font-bold text-slate-300">Players</div>
                    <div className="text-sm text-slate-100">{String(lobby[1] ?? '')}</div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
