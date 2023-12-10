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

  Study: 'assets/images/Study.png',
  Hall: 'assets/images/Hall.png',
  Lounge: 'assets/images/Lounge.png',
  Library: 'assets/images/Library.png',
  'Billard Room': 'assets/images/Billiard.png',
  'Dining Room': 'assets/images/Dining.png',
  Conservatory: 'assets/images/Conservatory.png',
  Ballroom: 'assets/images/Ballroom.png',
  Kitchen: 'assets/images/Kitchen.png',
};

export const roomCoordMapping = {
  Study: '0,0',
  Hall: '0,2',
  Lounge: '0,4',
  Library: '2,0',
  'Billard Room': '2,2',
  'Dining Room': '2,4',
  Conservatory: '4,0',
  Ballroom: '4,2',
  Kitchen: '4,4',
};
