import { SendJsonMessage } from 'react-use-websocket/dist/lib/types';
import { ReadyState } from 'react-use-websocket';
import { UserReady } from './lobby';
import { Character } from './game';

export interface RegionalCurrencies {
  USD: string;
  VND: string;
}

export interface UserProfile {
  username?: string;
  email?: string;
  bio?: string;
  avatarUrl?: string;
  coverUrl?: string;
}

export type Cursor = number[] | string[];

export interface Pagination {
  offset: number;
  limit: number;
  nextCursor?: Cursor;
  total?: number;
}
export type ResWithPagination<T> = {
  data: T;
  total?: number;
  pagination?: Pagination;
  page?: Pagination;
};

export type Res<T> = {
  result: ResWithPagination<T>;
};

export type WS = {
  sendJsonMessage: SendJsonMessage;
  lastMessage: {
    data: any;
    responseFor: string;
  };
  readyState: ReadyState;
};

export type WSResponse = {
  responseFor?: string;
  success?: string;
  message?: string;

  created_lobby?: string;
  lobby_name?: string;
  lobbies?: string;
  username?: string;
  ready_tracker?: string;
  lobbyReadyStatus?: UserReady;
  gameboard_data?: string;
  currentTurn?: string;
  diceTracker?: { [key: string]: number };
  highest_rolled?: string;
  characters?: Character[];
  characterSelectionPhase?: 'finished';
};
