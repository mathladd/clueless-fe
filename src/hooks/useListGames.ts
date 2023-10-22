import useSWR from 'swr';
import { fetcher } from 'helper/fetch';
import { Game } from 'types/game';

export default function useListGames() {
  const { data, error, isLoading } = useSWR<unknown>('/api/user/123', fetcher);

  console.log(data);

  return {
    user: data,
    isLoading,
    isError: error as boolean,
  };

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
