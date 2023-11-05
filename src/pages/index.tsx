import { useEffect, useState } from 'react';
import GameSession from 'components/GameSession';
import { WS } from 'types/common';
import { Lobby, UserReady } from 'types/lobby';
import LobbyScreen from 'components/LobbyScreen';
import useLobbyScreen from 'hooks/useLobbyScreen';

function HomePage({ ws }: { ws: WS }) {
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [lobbyNameInput, setLobbyNameInput] = useState('');
  const [lobbies, setLobbies] = useState<Lobby>();
  const [room, setRoom] = useState<string>();
  const [user, setUser] = useState('');
  const [isReady, setIsReady] = useState(false);
  const [allUsersStatus, setAllUserStatus] = useState<UserReady>();
  const [userMess, setUserMess] = useState<{
    message: string;
    type: 'SUCCESS' | 'ERROR' | 'INFO';
  }>();
  const [isGameStarted, setIsGameStarted] = useState<boolean>(false);

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
          onToggleReady({ username: user, lobbyName: data.lobby_name ?? '' });
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
        } else {
          setIsGameStarted(false);
          setUserMess({
            message: `Failed to start game because of ${data.message ?? ''}`,
            type: 'ERROR',
          });
        }
      } else if (data?.responseFor === 'cardShuffled') {
        // This ws last message is about the game has been initialized cards being shuffled
        console.log(data);
      }
    }
  }, [ws.lastMessage]);

  return (
    <>
      {true ? (
        <GameSession />
      ) : (
        <LobbyScreen
          ws={ws}
          user={user}
          room={room}
          lobbies={lobbies}
          isReady={isReady}
          onLogin={onLogin}
          usernameInput={usernameInput}
          passwordInput={passwordInput}
          lobbyNameInput={lobbyNameInput}
          userMess={userMess}
          setUsernameInput={setUsernameInput}
          setPasswordInput={setPasswordInput}
          setLobbyNameInput={setLobbyNameInput}
          onGetLobbies={onGetLobbies}
          onJoinRoom={onJoinRoom}
          onCreateLobby={onCreateLobby}
          onToggleReady={onToggleReady}
          allUsersStatus={allUsersStatus}
          onStartGame={onStartGame}
        />
      )}
      <div />
    </>
  );
}

export default HomePage;
