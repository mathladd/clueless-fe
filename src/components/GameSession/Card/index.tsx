import { Image } from '@chakra-ui/react';
import { Character, Room, Weapon } from 'types/game';

export const cardImgMapping: { [key: Character | Weapon | Room | string]: string } = {
  'Miss Scarlett': 'assets/images/Scarlett.png',
  'Colonel Mustard': 'assets/images/Mustard.png',
  'Mrs. White': 'assets/images/White.png',
  'Mr. Green': 'assets/images/Green.png',
  'Mrs. Peacock': 'assets/images/Peacock.png',
  'Professor Plum': 'assets/images/Plum.png',

  Candlestick: 'assets/images/Candlestick.png',
  Dagger: 'assets/images/Dagger.png',
  'Lead pipe': 'assets/images/LeadPipe.png',
  Revolver: 'assets/images/Revolver.png',
  Rope: 'assets/images/Rope.png',
  Spanner: 'assets/images/Spanner.png',

  Kitchen: 'assets/images/Kitchen.png',
  Ballroom: 'assets/images/Ballroom.png',
  Conservatory: 'assets/images/Conservatory.png',
  'Dining Room': 'assets/images/Dining.png',
  Library: 'assets/images/Library.png',
  'Billard Room': 'assets/images/Billiard.png',
  Lounge: 'assets/images/Lounge.png',
  Study: 'assets/images/Study.png',
  Hall: 'assets/images/Hall.png',
};

export default function Card({ cardName }: { cardName: string }) {
  return (
    <div className="flex justify-center items-center w-24 h-32 border-4 border-slate-700 rounded-lg overflow-hidden">
      <Image src={cardImgMapping[cardName]} alt={cardName} className="w-full h-full flex-grow-0" />
    </div>
  );
}
