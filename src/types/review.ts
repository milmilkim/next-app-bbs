import { Timestamp } from 'firebase/firestore';

export interface Review {
  id?: string;
  nickname: string;
  email: string;
  content: string;
  password: string;
  title: string;
  createdAt: Timestamp | Date;
}
