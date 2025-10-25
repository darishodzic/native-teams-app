import { useQuery } from '@tanstack/react-query'
import api from '../../utils/api'
import queryKeys from '../../utils/query-keys'
import { GetBalancesResponse } from '../../utils/types'

export const useBalancesQuery = (onSuccess?: (data: GetBalancesResponse) => void) =>
  useQuery({
    queryFn: async () => {
      const data = await api.getBalances()

      onSuccess?.(data)

      return data
    },
    queryKey: queryKeys.getBalances(),
  })
