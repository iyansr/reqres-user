import { AxiosResponse, GenericAbortSignal } from 'axios'
import { useQuery } from '@tanstack/react-query'
import axios from '@modules/shared/lib/Axios'
import { GeneralResponse, User } from '@modules/shared/types'

type Params = {
  page?: string | number
  per_page?: string | number
  signal?: GenericAbortSignal
}

const fetch = async ({ page, per_page, signal }: Params) => {
  const response: AxiosResponse<GeneralResponse<User>> = await axios.request({
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
  return useQuery(['users', page, per_page], ({ signal }) => fetch({ page, per_page, signal }), {
    keepPreviousData: true,
  })
}

export default useQueryUsers
