import { Image } from '@chakra-ui/react';
import { cardImgMapping } from 'config/mapping';

export default function Card({ cardName }: { cardName: string }) {
  return (
    <div className="flex justify-center items-center w-24 h-32 border-4 border-slate-700 rounded-lg overflow-hidden">
      <Image src={cardImgMapping[cardName]} alt={cardName} className="w-full h-full flex-grow-0" />
    </div>
  );
}
