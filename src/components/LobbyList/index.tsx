import { Lobby } from 'types/lobby';

export default function LobbyList({ lobbies }: { lobbies: { data: string }[] }) {
  if (lobbies?.length <= 0) return null;
  return (
    <div className="flex flex-col space-y-5">
      {Object.entries(JSON.parse(lobbies[0]?.data) as Lobby).map((lobby, index) => (
        <div
          key={`${index + 1}`}
          className="bg-slate-900 text-white rounded-lg flex flex-col justify-between overflow-hidden min-h-32 w-80 cursor-pointer hover:brightness-125 transition"
        >
          <div className="text-3xl p-4 w-1/2 font-bold">
            {index + 1}. {lobby[0] ?? ''}
          </div>
          <div className="bg-slate-600 flex-1 p-4">
            <div className="text-lg text-slate-300 font-bold">Players</div>
            <div className="text-sm text-slate-100">{lobby[1] ?? ''}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
