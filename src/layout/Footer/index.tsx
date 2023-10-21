import { useRouter } from 'next/router';
import { PATH } from 'config/paths';
import { RESPONSIVE_PADDING_X, RESPONSIVE_PADDING_Y } from 'constants/stylings';

export default function Footer() {
  const router = useRouter();
  const onSignupClick = () => router.push(PATH.LOGIN);

  return (
    <div
      className={`flex items-center justify-between h-24 w-full bg-gray-800 ${RESPONSIVE_PADDING_Y} ${RESPONSIVE_PADDING_X}`}
    >
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
    </div>
  );
}
