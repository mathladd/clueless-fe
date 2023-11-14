import { Character, Room, Weapon } from 'types/game';

export const cardImgMapping: { [key: Character | Weapon | Room | string]: string } = {
  'Miss Scarlett': '../../../../public/assets/images/Scarlett.png',
  'Colonel Mustard': '../../../../public/assets/images/Mustard.png',
  'Mrs. White': '../../../../public/assets/images/White.png',
  'Mr. Green': '../../../../public/assets/images/Green.png',
  'Mrs. Peacock': '../../../../public/assets/images/Peacock.png',
  'Professor Plum': '../../../../public/assets/images/Plum.png',

  Candlestick: '../../../../public/assets/images/Candlestick.png',
  Dagger: '../../../../public/assets/images/Dagger.png',
  'Lead pipe': '../../../../public/assets/images/LeadPipe.png',
  Revolver: '../../../../public/assets/images/Revolver.png',
  Rope: '../../../../public/assets/images/Rope.png',
  Spanner: '../../../../public/assets/images/Spanner.png',

  Kitchen: '../../../../public/assets/images/Kitchen.png',
  Ballroom: '../../../../public/assets/images/Ballroom.png',
  Conservatory: '../../../../public/assets/images/Conservatory.png',
  'Dining Room': '../../../../public/assets/images/Dining.png',
  Library: '../../../../public/assets/images/Library.png',
  'Billard Room': '../../../../public/assets/images/Billiard.png',
  Lounge: '../../../../public/assets/images/Lounge.png',
  Study: '../../../../public/assets/images/Study.png',
  Hall: '../../../../public/assets/images/Hall.png',
};

export default function Card({ cardName }: { cardName: string }) {
  return (
    <div className="flex justify-center items-center w-32 h-48 border-4 border-slate-700 rounded-lg overflow-hidden">
      <img src={cardImgMapping[cardName]} alt={cardName} className="w-full h-full flex-grow-0" />
    </div>
  );
}
