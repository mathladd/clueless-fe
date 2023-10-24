import { atom } from 'jotai';

export const toastAtom = atom<{ message: string; type: 'SUCCESS' | 'FAILED' }>({
  message: '',
  type: 'FAILED',
});
