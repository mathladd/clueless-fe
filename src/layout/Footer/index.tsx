import { useRouter } from 'next/router';
import { PATH } from 'config/paths';
import { RESPONSIVE_PADDING_X, RESPONSIVE_PADDING_Y } from 'constants/stylings';
import useAuthentication from 'hooks/useAuthentication';

export default function Footer() {
  const router = useRouter();
  const onSignupClick = () => router.push(PATH.LOGIN);
  const { user, logout } = useAuthentication({});
  const onLogout = () => logout();

  return (
    <div
      className={`flex items-center justify-between h-24 w-full bg-gray-800 ${RESPONSIVE_PADDING_Y} ${RESPONSIVE_PADDING_X}`}
    >
      {!user ? (
        <div className="flex gap-4 items-center">
          <div className="text-white font-bold">New here?</div>
          <button
            type="button"
            className="border-2 border-white rounded-lg text-white px-4 py-2 font-base cursor-pointer bg-gray-800 hover:bg-gray-700 transition"
            onClick={onSignupClick}
          >
            Sign up!
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={onLogout}
          className="p-3 bg-slate-600 text-white rounded-lg text-sm hover:bg-slate-700 transition"
        >
          Logout
        </button>
      )}
    </div>
  );
}
