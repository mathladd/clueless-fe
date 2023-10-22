import { useCallback, useEffect, useState } from 'react';
import useWebsocket from 'react-use-websocket';
import { connectionStatus } from 'constants/webSocket';

export default function useLobby() {
  const [lobbies, setLobbies] = useState<{ data: any }[]>([]);

  const {
    sendMessage: getLobbies,
    lastMessage: lastGetLobbies,
    readyState: getLobbiesState,
  } = useWebsocket('ws://localhost:8765');

  const { sendMessage: createLobby, readyState: createLobbyState } =
    useWebsocket('ws://localhost:8765');

  const {
    sendMessage: getUsers,
    lastMessage: lastGetUsersRes,
    readyState: getUsersState,
  } = useWebsocket('ws://localhost:8765');

  const onGetLobbies = useCallback(() => {
    getLobbies(JSON.stringify({ request: 'getLobbies' }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onCreateLobby = useCallback(
    ({ lobbyName, username }: { lobbyName: string; username: string | undefined }) => {
      createLobby(JSON.stringify({ request: 'createLobby', username, lobby_name: lobbyName }));
      onGetLobbies();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onGetUsers = useCallback(() => getUsers(JSON.stringify({ request: 'getUsers' })), []);

  useEffect(() => {
    if (lastGetLobbies !== null) setLobbies([lastGetLobbies]);
  }, [lastGetLobbies, setLobbies]);

  console.log(
    `The WebSocket is currently ${connectionStatus[getLobbiesState]} & ${connectionStatus[createLobbyState]}`,
  );

  return {
    lobbies,
    getLobbiesState,
    createLobbyState,
    getUsersState,
    onGetLobbies,
    onCreateLobby,
    onGetUsers,
  };
}
