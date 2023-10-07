import IMoon from 'components/icons/IMoon';
import { RESPONSIVE_PADDING_X, RESPONSIVE_PADDING_Y } from 'constants/stylings';

export default function Header() {
  return (
    <div
      className={`sticky flex items-center justify-between h-fit w-full border-b border-gray-300 ${RESPONSIVE_PADDING_Y} ${RESPONSIVE_PADDING_X}`}
    >
      <button type="button" className="text-2xl font-bold text-gray-700">
        WallOfText
      </button>
      <div className="flex gap-6 items-center text-base whitespace-nowrap">
        <IMoon custClass="w-8 h-8 stroke-gray-800" />
        <div className="cursor-pointer hover:brightness-150 hover:text-sky-800 text-gray-700 transition">
          City Hall
        </div>
        <div className="cursor-pointer hover:brightness-150 hover:text-sky-800 text-gray-700 transition">
          Hubs
        </div>
        <button
          type="button"
          className="rounded-lg py-2 px-4 bg-slate-300 text-slate-900 transition hover:text-white hover:bg-slate-400 cursor-pointer"
        >
          My WoT
        </button>
      </div>
    </div>
  );
}
