export type Post = {
  id: string;
  title: string;
  hub: string;
  author: string;
  point: number;
  userStat?: {
    mark?: MarkingState;
    replied?: boolean;
  };
  description?: string;
  imgSrc?: string;
};

export type MarkingState = 'Blank' | 'Graffitized' | 'Endorsed';
