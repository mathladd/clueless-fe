import useAuthentication from 'hooks/useAuthentication';
import { Lobby } from 'types/lobby';

export default function LobbyList({
  lobbies,
  onJoinRoom,
}: {
  lobbies: Lobby | undefined;
  onJoinRoom: ({ lobbyName, username }: { lobbyName: string; username: string }) => void;
}) {
  const { user } = useAuthentication({});
  if (!lobbies || Object.keys(lobbies).length <= 0) return null;
  return (
    <div className="flex flex-col space-y-5">
      {Object.entries(lobbies).map((lobby, index) => (
        <button
          type="button"
          key={`${index + 1}`}
          className="bg-slate-900 text-white rounded-lg flex flex-col justify-between overflow-hidden min-h-32 w-80 cursor-pointer hover:brightness-125 transition text-start"
          onClick={() => onJoinRoom({ lobbyName: lobby[0], username: user?.name ?? '' })}
        >
          <div className="text-3xl p-4 w-full font-bold">
            {index + 1}. {String(lobby[0] ?? '')}
          </div>
          <div className="bg-slate-600 flex-1 p-4 w-full">
            <div className="text-lg text-slate-300 font-bold">Players</div>
            <div className="text-sm text-slate-100">{String(lobby[1] ?? '')}</div>
          </div>
        </button>
      ))}
    </div>
  );
}
