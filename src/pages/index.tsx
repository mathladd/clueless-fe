import { useEffect, useState } from 'react';
import { ReadyState } from 'react-use-websocket';
import BaseLayout from 'layout';
import Wrapper from 'layout/Wrapper';
import Home from 'modules/Home';
import { WS } from 'types/common';
import { Lobby } from 'types/lobby';
import Login from './login';

function HomePage({ ws }: { ws: WS }) {
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [lobbyNameInput, setLobbyNameInput] = useState('');
  const [lobbies, setLobbies] = useState<Lobby>();
  const [room, setRoom] = useState<string>();
  const [user, setUser] = useState('');
  const [isReady, setIsReady] = useState(false);
  const [allUsersStatus, setAllUserStatus] = useState();
  const [userMess, setUserMess] = useState<{
    message: string;
    type: 'SUCCESS' | 'ERROR' | 'INFO';
  }>();

  const typeMapping = { SUCCESS: 'text-emerald-500', ERROR: 'text-red-500', INFO: 'text-blue-500' };

  const onLogin = ({ username, password }: { username: string; password: string }) => {
    ws?.sendJsonMessage({
      request: 'createUser',
      username,
      password,
    });
  };
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

  const onStartGame = ({
    lobbyName,
    username,
  }: {
    lobbyName: string;
    username: string | undefined;
  }) => {
    ws.sendJsonMessage({ request: 'startGame', username, lobby_name: lobbyName });
  };

  const onToggleReady = ({
    lobbyName,
    username,
  }: {
    lobbyName: string;
    username: string | undefined;
  }) => {
    ws.sendJsonMessage({ request: 'toggleReady', username, lobby_name: lobbyName });
  };

  const onJoinRoom = ({
    lobbyName,
    username,
  }: {
    lobbyName: string;
    username: string | undefined;
  }) => ws.sendJsonMessage({ request: 'joinLobby', username, lobby_name: lobbyName });

  useEffect(() => {
    if (ws?.lastMessage?.data) {
      const data = JSON.parse(String(ws?.lastMessage?.data));
      if (!data?.responseFor) {
        setLobbies(data as Lobby);
      } else if (data?.responseFor === 'createUser') {
        setUser(usernameInput);
        setUserMess({
          message: `You have successfully created a user! You are "${usernameInput}"`,
          type: 'SUCCESS',
        });
      } else if (data?.responseFor === 'createLobby') {
        if (data?.success === 'true') {
          setRoom(lobbyNameInput);
          setUserMess({
            message: `A new room named ${data.created_lobby} has been successfully created! ${
              lobbyNameInput ? `You are now in room ${lobbyNameInput}` : ''
            }`,
            type: 'SUCCESS',
          });
          onGetLobbies();
        } else {
          setUserMess({
            message: `Failed to create a new room because of ${data.message}`,
            type: 'ERROR',
          });
        }
        // onGetLobbies();
      } else if (data?.responseFor === 'joinLobby') {
        if (data?.success === 'true') {
          onToggleReady({ username: user, lobbyName: data.lobby_name });
          setRoom(data.lobby_name);
          setUserMess({
            message: `${data.username} has now joined room ${data.lobby_name}`,
            type: 'SUCCESS',
          });
        } else {
          setUserMess({
            message: `Failed to join room because of ${data.message}`,
            type: 'ERROR',
          });
        }
      } else if (data?.responseFor === 'toggleReady') {
        if (data?.success === 'true') {
          const status = JSON.parse(data.ready_tracker)[user];
          setIsReady(status);
          setAllUserStatus(JSON.parse(data.ready_tracker));
          setUserMess({
            message: `The current users are ${Object.keys(
              JSON.parse(data.ready_tracker),
            )}. You are now ${status ? 'READY' : 'NOT READY'}`,
            type: 'INFO',
          });
        } else {
          setUserMess({
            message: `Failed to join room because of ${data.message}`,
            type: 'ERROR',
          });
        }
      } else if (data?.responseFor === 'startGame') {
        if (data?.success === 'true') {
          console.log(data);
          setUserMess({
            message: `The game is now started`,
            type: 'INFO',
          });
        } else {
          setUserMess({
            message: `Failed to start game because of ${data.message}`,
            type: 'ERROR',
          });
        }
      }
    }
  }, [ws.lastMessage]);

  console.log(ws?.lastMessage);

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

        <div className="flex flex-col space-y-2">
          <div className="flex space-x-2 h-fit items-center justify-between text-sm">
            <div className="text-sm text-slate-500">Username</div>
            <input
              className="w-40 border border-slate-600 rounded-md p-2"
              onChange={(e) => setUsernameInput(e.target.value)}
            />
          </div>
          <div className="flex space-x-2 h-fit items-center justify-between text-sm">
            <div className="text-sm text-slate-500">Password</div>
            <input
              type="password"
              className="w-40 border border-slate-600 rounded-md p-2"
              onChange={(e) => setPasswordInput(e.target.value)}
            />
          </div>
        </div>
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
        <div className={typeMapping[userMess?.type]}>{userMess?.message}</div>
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
              onClick={() => onJoinRoom({ lobbyName: lobby[0], username: user })}
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

export default HomePage;
