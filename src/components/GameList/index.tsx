import { Game } from 'types/game';

export default function GameList({ games }: { games: Game[] }) {
  return (
    <div>
      {games?.map((game) => (
        <div>
          <div className="">{game.gameId}</div>
          <div className="">{game.userIds.length}</div>
        </div>
      ))}
    </div>
  );
}
