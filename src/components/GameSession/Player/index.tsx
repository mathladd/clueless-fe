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
    <div className="flex flex-col justify-center items-center relative">
      <div className="flex justify-center items-center w-32 h-48 border-4 border-slate-700 rounded-lg overflow-hidden">
        <img
          src={
            character
              ? cardImgMapping[character]
              : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmV_GMmai8gMADcJbWJgdA7VNIEN1Bx1strQ&usqp=CAU'
          }
          alt={character}
          className="w-full h-full flex-grow-0"
        />
      </div>
      <div>{username}</div>

      {isCurrent && (
        <SkeletonCircle size="10" sx={{ position: 'absolute', alignSelf: 'center', top: '40%' }} />
      )}
      {!!diceRolled && (
        <div className="absolute font-bold text-6xl algin-self-center text-slate-900 bg-blue-300 rounded-lg">
          {diceRolled}
        </div>
      )}
    </div>
  );
}
