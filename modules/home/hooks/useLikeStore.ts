import create from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

type LikeState = {
  userIds: number[]
  toggleLike: (id: number, cb: (isLiked: boolean) => void) => void
  restore: () => void
}

const useLikeStore = create<LikeState>()(
  persist(
    (set) => ({
      userIds: [],
      toggleLike: (id, cb) =>
        set((state) => {
          if (!state.userIds.includes(id)) {
            cb?.(true)
            return {
              userIds: [...state.userIds, id],
            }
          }

          const temp = [...state.userIds]
          const result = temp.filter((currentId) => currentId !== id)
          cb?.(false)
          return {
            userIds: result,
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
