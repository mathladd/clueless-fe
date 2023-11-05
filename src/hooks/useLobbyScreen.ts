import { WS } from 'types/common';

export default function useLobbyScreen({ ws }: { ws: WS }) {
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

  return {
    onLogin,
    onCreateLobby,
    onGetLobbies,
    onStartGame,
    onToggleReady,
    onJoinRoom,
  };
}
