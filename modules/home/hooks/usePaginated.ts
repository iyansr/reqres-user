import create from 'zustand'

type PageState = {
  page: number
  onNextPage: () => void
  onPreviousPage: () => void
}

export const usePageStore = create<PageState>((set) => ({
  page: 1,
  onNextPage: () => set((state) => ({ page: state.page + 1 })),
  onPreviousPage: () => set((state) => ({ page: state.page > 1 ? state.page - 1 : state.page })),
}))
