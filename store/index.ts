import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { PAGINATION } from '@/config/constants'
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
      perPage: PAGINATION.PER_PAGE_DEFAULT,
      setPerPage: (page: number) => set({ perPage: page }),
      openSidebar: false,
      setOpenSidebar: (value: boolean) => set({ openSidebar: value }),
      sortOrder: '',
      setSortOrder: (order: string) => set({ sortOrder: order }),
    }),
    {
      name: 'user-preferences',
      partialize: (state) => ({
        isGridView: state.isGridView,
        perPage: state.perPage,
        sortOrder: state.sortOrder,
      }),
    }
  )
)
