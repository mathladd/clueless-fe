import { RESPONSIVE_PADDING_X, RESPONSIVE_PADDING_Y } from 'constants/stylings';

export default function Header() {
  return (
    <div
      className={`sticky flex items-center justify-between h-fit w-full border-b border-gray-300 ${RESPONSIVE_PADDING_Y} ${RESPONSIVE_PADDING_X}`}
    >
      <button type="button" className="text-2xl font-bold text-gray-700">
        Clueless: The game
      </button>
      <div className="flex items-center gap-6 text-base whitespace-nowrap">
        <div className="text-gray-700 transition cursor-pointer hover:brightness-150 hover:text-sky-800">
          Settings
        </div>
        <button
          type="button"
          className="px-4 py-2 transition rounded-lg cursor-pointer bg-slate-300 text-slate-900 hover:text-white hover:bg-slate-400"
        >
          Profile
        </button>
      </div>
    </div>
  );
}
