import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { StoreProps } from '@/interfaces/ui'

export const useStore = create<StoreProps>()(
  persist(
    (set) => ({
      currentPage: 1,
      setCurrentPage: (page: number) => set({ currentPage: page }),
      totalPages: 1,
      setTotalPages: (page: number) => set({ totalPages: page }),
      tagProducts: 0,
      setTagProducts: (products: number) => set({ tagProducts: products }),
      isGridView: false,
      setIsGridView: (value: boolean) => set({ isGridView: value }),
    }),
    {
      name: 'view-mode-storage',
      partialize: (state) => ({ isGridView: state.isGridView }),
    }
  )
)
