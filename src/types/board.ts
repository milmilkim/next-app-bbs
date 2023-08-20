import { Timestamp } from 'firebase/firestore';

interface Board {
  title: string;
  url: string;
  type: BoardType;
  id: string;
  isPublic: boolean;
  order: number;
}

type BoardType = 'DEFAULT' | 'GALLERY';

export type { Board, BoardType };

export interface Post {
  category: string;
  title: string;
  createdAt: Timestamp | Date;
  content: string;
  thumbnailUrl: string;
  id?: string
  heart?: number;
  isSecret: boolean;
  writer: string;
}
