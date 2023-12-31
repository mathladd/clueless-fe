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
