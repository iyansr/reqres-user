import { fetchUser } from '@modules/user/hooks/useQueyDetailUser'
import DetailUserPage from '@modules/user/pages/DetailUserPage'
import { dehydrate, QueryClient } from '@tanstack/react-query'
import { GetServerSideProps } from 'next'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const id = ctx.params?.userId as string
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['user', id],
    queryFn: ({ signal }) => fetchUser({ id, signal }),
  })

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

export default DetailUserPage
