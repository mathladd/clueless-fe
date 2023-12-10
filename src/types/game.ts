export type GameBoardSetup = {
  left_over_cards: string[];
  player_cards: { [key: string]: string[] };
  winning_combo: string[];
};

export const CHARACTERS = [
  'Miss Scarlett',
  'Colonel Mustard',
  'Mrs. White',
  'Mr. Green',
  'Mrs. Peacock',
  'Professor Plum',
] as const;
export const WEAPONS = [
  'Candlestick',
  'Dagger',
  'Lead pipe',
  'Revolver',
  'Rope',
  'Spanner',
] as const;
export const ROOMS = [
  'Kitchen',
  'Ballroom',
  'Conservatory',
  'Dining Room',
  'Library',
  'Billard Room',
  'Lounge',
  'Study',
  'Hall',
] as const;
export type Character = typeof CHARACTERS[number];
export type Weapon = typeof WEAPONS[number];
export type Room = typeof ROOMS[number];
