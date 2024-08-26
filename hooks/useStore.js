import { create } from "zustand";

export const useStore = create((set) => ({
  open: false,
  setOpen: (open) => set({ open }),
  docs: [],
  setDocs: (docs) => set({ docs }),
  searchDocs: [],
  setSearchDocs: (searchDocs) => set({ searchDocs }),
  mode: false,
  setMode: (mode) => set({ mode }),
  isToast: false,
  setIsToast: (isToast) => set({ isToast }),
  AiText: "",
  setAiText: (AiText) => set({ AiText }),
}));
