import { Board } from '@/types/board';
import { atom } from 'jotai';

export const categoryAtom = atom<Board[]>([]);
