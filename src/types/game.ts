export type GameBoardSetup = {
  left_over_cards: string[];
  player_cards: { [key: string]: string[] };
  winning_combo: string[];
};

export type Character =
  | 'Miss Scarlett'
  | 'Colonel Mustard'
  | 'Mrs. White'
  | 'Mr. Green'
  | 'Mrs. Peacock'
  | 'Professor Plum';
export type Weapon = 'Candlestick' | 'Dagger' | 'Lead pipe' | 'Revolver' | 'Rope' | 'Spanner';
export type Room =
  | 'Kitchen'
  | 'Ballroom'
  | 'Conservatory'
  | 'Dining Room'
  | 'Library'
  | 'Billard Room'
  | 'Lounge'
  | 'Study'
  | 'Hall';
