import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface SearchState {
  searches: Record<string, { raw: string; debounced: string }>;
  init: (searchId: string) => void;
  setRaw: (searchId: string, value: string) => void;
  setDebounced: (searchId: string, value: string) => void;
}

export const useSearchStore = create<SearchState>()(
  immer((set) => ({
    searches: {},
    init: (searchId) =>
      set((state) => {
        if (!state.searches[searchId])
          state.searches[searchId] = { raw: '', debounced: '' };
      }),
    setRaw: (searchId, value) =>
      set((state) => {
        if (!state.searches[searchId])
          state.searches[searchId] = { raw: '', debounced: '' };
        state.searches[searchId].raw = value;
      }),
    setDebounced: (searchId, value) =>
      set((state) => {
        if (!state.searches[searchId])
          state.searches[searchId] = { raw: '', debounced: '' };
        state.searches[searchId].debounced = value;
      }),
  })),
);
