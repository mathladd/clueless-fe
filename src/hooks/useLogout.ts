import { useCallback } from 'react';
import { useRouter } from 'next/router';
import { clearLocalStorage } from 'helper/localStorage';

export const useLogout = () => {
  const router = useRouter();

  const logout = useCallback(() => {
    clearLocalStorage();
    router.reload();
  }, [router]);

  return logout;
};
