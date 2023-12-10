import { SkeletonCircle } from '@chakra-ui/react';
import { Character } from 'types/game';
import { cardImgMapping } from '../Card';

export default function Player({
  username,
  diceRolled,
  character,
  isCurrent,
}: {
  username: string;
  diceRolled: number | undefined;
  character: Character | string;
  isCurrent: boolean;
}) {
  return (
    <div className="relative flex flex-col items-center justify-center">
      <div className="flex items-center justify-center w-24 h-32 overflow-hidden border-4 rounded-lg border-slate-700">
        <img
          src={
            character
              ? cardImgMapping[character]
              : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmV_GMmai8gMADcJbWJgdA7VNIEN1Bx1strQ&usqp=CAU'
          }
          alt={character}
          className="flex-grow-0 w-full h-full"
        />
      </div>
      <div>{username}</div>

      {isCurrent && (
        <SkeletonCircle size="10" sx={{ position: 'absolute', alignSelf: 'center', top: '40%' }} />
      )}
      {!!diceRolled && (
        <div className="absolute text-6xl font-bold bg-blue-300 rounded-lg algin-self-center text-slate-900">
          {diceRolled}
        </div>
      )}
    </div>
  );
}
