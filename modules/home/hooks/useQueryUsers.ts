import Axios, { GenericAbortSignal } from 'axios'
import { useQuery } from '@tanstack/react-query'

type Params = {
  page?: string | number
  per_page?: string | number
  signal?: GenericAbortSignal
}

const fetch = async ({ page, per_page, signal }: Params) => {
  const response = await Axios.request({
    method: 'GET',
    url: '/users',
    params: {
      page,
      per_page,
    },
    signal,
  })

  return response.data
}

const useQueryUsers = ({ page = 1, per_page = 4 }: Params) => {
  return useQuery(['users', page, per_page], ({ signal }) => fetch({ page, per_page, signal }))
}

export default useQueryUsers
