import { Game } from 'types/game';

export default function useListGames() {
  const games: Game[] = [
    {
      gameId: '123',
      userIds: ['13', '20'],
    },
    {
      gameId: '123',
      userIds: ['13', '20'],
    },
  ];
  return { games };
}
