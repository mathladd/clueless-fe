import { signIn, signOut, useSession } from 'next-auth/react';
import { ReadyState } from 'react-use-websocket';
import { useEffect, useState } from 'react';
import { PATH } from 'config/paths';
import { WS } from 'types/common';

export default function useAuthentication({ ws }: { ws?: WS }) {
  const { data: session } = useSession();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const login = ({
    usernameInput,
    passwordInput,
  }: {
    usernameInput: string;
    passwordInput: string;
  }) => {
    setUsername(usernameInput);
    setPassword(passwordInput);
    ws?.sendJsonMessage({
      request: 'createUser',
      username: usernameInput,
      password: passwordInput,
    });
  };

  const logout = () => {
    signOut();
  };

  useEffect(() => {
    if (ws?.lastJsonMessage !== null) {
      const data = ws?.lastJsonMessage;
      if (
        data?.success === 'true' ||
        (data?.message === 'User already exists' && !!username && !!password)
      ) {
        signIn('credentials', { username, password, redirect: true, callbackUrl: PATH.HOME });
      }
    }
  }, [ws?.lastJsonMessage, username, password]);

  return {
    user: session?.user,
    login,
    logout,
    isLoading: ws?.readyState !== ReadyState.OPEN,
  };
}
