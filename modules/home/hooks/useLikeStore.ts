import create from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

type LikeState = {
  userIds: number[]
  like: (id: number) => void
  unLike: (id: number) => void
  restore: () => void
}

const useLikeStore = create<LikeState>()(
  persist(
    (set) => ({
      userIds: [],
      like: (id) =>
        set((state) => {
          if (!state.userIds.includes(id)) {
            return {
              userIds: [...state.userIds, id],
            }
          }
          return {
            userIds: state.userIds,
          }
        }),
      unLike: (id) =>
        set((state) => {
          if (state.userIds.includes(id)) {
            const temp = [...state.userIds]
            const result = temp.filter((currentId) => currentId !== id)
            return {
              userIds: result,
            }
          }
          return {
            userIds: state.userIds,
          }
        }),
      restore: () => set(() => ({ userIds: [] })),
    }),
    {
      name: 'liked-users',
      storage: createJSONStorage(() => localStorage),
    }
  )
)

export default useLikeStore
