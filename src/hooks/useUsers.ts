import { useCallback } from 'react';
import useWebsocket from 'react-use-websocket';

export default function useUsers() {
  const { sendMessage: getUsers, readyState: getUsersState } = useWebsocket('ws://localhost:8765');

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onGetUsers = useCallback(() => getUsers(JSON.stringify({ request: 'getUsers' })), []);

  return {
    getUsersState,
    onGetUsers,
  };
}
