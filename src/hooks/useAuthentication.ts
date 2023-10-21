import { signIn, signOut, useSession } from 'next-auth/react';
import { PATH } from 'config/paths';

export default function useAuthentication() {
  const { data: session } = useSession();

  const login = async ({ username, password }: { username: string; password: string }) => {
    await signIn('credentials', { username, password, redirect: true, callbackUrl: PATH.HOME });
  };

  const logout = () => {
    signOut();
  };

  return { user: session?.user, login, logout };
}
