import create from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

type LikeState = {
  page: number
  per_page: number
  onNextPage: () => void
  onPreviousPage: () => void
}

export const usePageStore = create<LikeState>((set) => ({
  page: 1,
  per_page: 4,
  onNextPage: () => set((state) => ({ page: state.page + 1 })),
  onPreviousPage: () => set((state) => ({ page: state.page > 1 ? state.page - 1 : state.page })),
}))
