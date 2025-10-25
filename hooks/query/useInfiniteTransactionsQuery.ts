import { useInfiniteQuery } from '@tanstack/react-query'
import api from '../../utils/api'
import queryKeys from '../../utils/query-keys'
import { GetTransactionsResponse, TransactionFilters } from '../../utils/types'

export const useInfiniteTransactionsQuery = (filters?: TransactionFilters) => {
  return useInfiniteQuery<GetTransactionsResponse>({
    queryKey: queryKeys.getTransactions(filters),
    queryFn: async ({ pageParam = 1 }) => {
      const page = typeof pageParam === 'number' ? pageParam : 1

      return api.getTransactions({ page, ...filters })
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.data?.has_more) {
        return lastPage.data?.current_page + 1
      }

      return
    },
    initialPageParam: 1,
    refetchOnMount: true,
  })
}
