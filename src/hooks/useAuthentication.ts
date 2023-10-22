import { signIn, signOut, useSession } from 'next-auth/react';
import useWebsocket, { ReadyState } from 'react-use-websocket';
import { useEffect, useState } from 'react';
import { PATH } from 'config/paths';

export default function useAuthentication() {
  const { data: session } = useSession();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const {
    sendMessage: createUser,
    lastMessage: lastCreateUserRes,
    readyState: createUserState,
  } = useWebsocket('ws://localhost:8765');

  const login = ({
    usernameInput,
    passwordInput,
  }: {
    usernameInput: string;
    passwordInput: string;
  }) => {
    setUsername(usernameInput);
    setPassword(passwordInput);
    createUser(
      JSON.stringify({ request: 'createUser', username: usernameInput, password: passwordInput }),
    );
  };

  const logout = () => {
    signOut();
  };

  useEffect(() => {
    if (lastCreateUserRes !== null) {
      const data = JSON.parse(String(lastCreateUserRes?.data)) as {
        success: string;
        message: string;
      };
      if (
        data?.success === 'true' ||
        (data?.message === 'User already exists' && !!username && !!password)
      ) {
        signIn('credentials', { username, password, redirect: true, callbackUrl: PATH.HOME });
      }
    }
  }, [lastCreateUserRes, username, password]);

  return {
    user: session?.user,
    login,
    logout,
    isLoading: createUserState !== ReadyState.OPEN,
  };
}
