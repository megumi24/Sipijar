import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface SelectState<T = string> {
  selects: Record<string, { value?: T }>;
  init: (selectId: string) => void;
  setValue: (selectId: string, value: string) => void;
}

export const useSelectStore = create<SelectState>()(
  immer((set) => ({
    selects: {},
    init: (selectId) =>
      set((state) => {
        if (!state.selects[selectId])
          state.selects[selectId] = { value: undefined };
      }),
    setValue: (selectId, value) =>
      set((state) => {
        if (!state.selects[selectId])
          state.selects[selectId] = { value: undefined };
        state.selects[selectId].value = value;
      }),
  })),
);
