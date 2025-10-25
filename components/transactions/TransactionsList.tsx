import {
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native'
import TransactionCard from './TransactionCard'
import { useInfiniteTransactionsQuery } from '../../hooks/query/useInfiniteTransactionsQuery'
import { COLOR_MAPPER } from '../../utils/constants'
import { NavigationProp, TransactionFilters } from '../../utils/types'
import { useNavigation } from '@react-navigation/native'

type TransactionsListProps = {
  paginationDisabled?: boolean
  onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void
  filters: TransactionFilters
}

const TransactionsList = (props: TransactionsListProps) => {
  const { paginationDisabled, onScroll, filters } = props

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, error } = useInfiniteTransactionsQuery({
    per_page: 10,
    ...filters,
  })
  const navigation = useNavigation<NavigationProp>()

  const transactions = data?.pages.flatMap((page) => page.data.items) ?? []

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    )
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error?.message ?? 'Something went wrong'}</Text>
      </View>
    )
  }

  if (!transactions?.length) {
    return (
      <View style={styles.container}>
        <Text style={styles.noTransactionsText}>No Transactions!</Text>
      </View>
    )
  }

  const renderListFooter = (): React.ReactElement => {
    if (isFetchingNextPage) {
      return <ActivityIndicator size="small" />
    }

    if (paginationDisabled) {
      return (
        <TouchableOpacity onPress={() => navigation.navigate('Transactions')}>
          <Text style={styles.seeMoreText}>See More</Text>
        </TouchableOpacity>
      )
    }

    return <></>
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.created_at}
        renderItem={({ item }) => <TransactionCard transaction={item} />}
        onEndReached={() => {
          if (hasNextPage && !paginationDisabled) {
            fetchNextPage()
          }
        }}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderListFooter()}
        scrollEventThrottle={16}
        onScroll={onScroll}
      />
    </View>
  )
}

export default TransactionsList

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR_MAPPER.GREY_1000,
    width: '100%',
    borderRadius: 16,
  },

  noTransactionsText: {
    textAlign: 'center',
    color: COLOR_MAPPER.NEUTRAL_100,
    fontSize: 16,
    fontWeight: 500,
    padding: 6,
    paddingBottom: 20,
  },
  errorText: {
    textAlign: 'center',
    color: COLOR_MAPPER.PINK_400,
    fontSize: 16,
    fontWeight: 500,
    padding: 6,
    paddingBottom: 20,
  },
  seeMoreText: {
    textAlign: 'center',
    color: COLOR_MAPPER.NEUTRAL_100,
    fontSize: 16,
    fontWeight: 500,
    padding: 6,
    paddingBottom: 20,
  },
})
