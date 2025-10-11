import { Toast } from 'primereact/toast';
import { RefObject } from 'react';
import { create } from 'zustand';

interface AppState {
  toastRef: RefObject<Toast | null> | null;
  setToastRef: (ref: RefObject<Toast | null>) => void;
}

export const useAppStore = create<AppState>()((set) => ({
  toastRef: null,
  setToastRef: (ref) => set({ toastRef: ref }),
}));
