import { create } from 'zustand'
import { StoreProps } from '@/interfaces/ui'

export const useStore = create<StoreProps>((set) => ({
  currentPage: 1,
  setCurrentPage: (page: number) => set({ currentPage: page }),
  totalPages: 1,
  setTotalPages: (page: number) => set({ totalPages: page }),
  tagProducts: 0,
  setTagProducts: (products: number) => set({ tagProducts: products }),
  isGridView: false,
  setIsGridView: (value: boolean) => set({ isGridView: value }),
}))
