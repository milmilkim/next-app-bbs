import { atom } from 'jotai';

type MessageFunctions = {
  success: (content?: string) => void;
  error: (content?: string) => void;
  info: (content?: string) => void;
  warning: (content?: string) => void;
};

const messageAtom = atom<MessageFunctions>({
  success: () => console.error('정의되지 않음'),
  error: () => console.error('정의되지 않음'),
  info: () => console.error('정의되지 않음'),
  warning: () => console.error('정의되지 않음'),
});

export default messageAtom;
