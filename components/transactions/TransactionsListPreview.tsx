import TransactionsList from './TransactionsList'

const TransactionsListPreview = () => {
  return <TransactionsList paginationDisabled filters={{ per_page: 3 }} />
}

export default TransactionsListPreview
