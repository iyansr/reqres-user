import { fetchUsers } from '@modules/home/hooks/useQueryUsers'
import HomePage from '@modules/home/pages/HomePage'
import { dehydrate, QueryClient } from '@tanstack/react-query'
import { GetServerSideProps } from 'next'

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient()
  const page = 1
  const per_page = 4

  try {
    await queryClient.prefetchQuery({
      queryKey: ['users', page, per_page],
      queryFn: ({ signal }) => fetchUsers({ page, per_page, signal }),
    })

    return {
      props: {
        dehydratedState: dehydrate(queryClient),
      },
    }
  } catch (error) {
    return {
      notFound: true,
    }
  }
}

export default HomePage
