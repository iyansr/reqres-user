import { fetchUsers } from '@modules/home/hooks/useQueryUsers'
import HomePage from '@modules/home/pages/HomePage'
import { dehydrate, QueryClient } from '@tanstack/react-query'
import { GetServerSideProps } from 'next'

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery(['users'], () => fetchUsers({ page: 1, per_page: 4 }))

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

export default HomePage
