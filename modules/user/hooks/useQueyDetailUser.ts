import axios from '@modules/shared/lib/Axios'
import { DetailResponse, User } from '@modules/shared/types'
import { useQuery } from '@tanstack/react-query'
import { AxiosResponse, GenericAbortSignal } from 'axios'

type Params = {
  id?: string | number
  signal?: GenericAbortSignal
}

export const fetchUser = async ({ id, signal }: Params) => {
  const response: AxiosResponse<DetailResponse<User>> = await axios.request({
    method: 'GET',
    url: `/users/${id}`,
    signal,
  })

  return response.data
}

const useQueyDetailUser = (id: number | string) => {
  return useQuery(['user', id], ({ signal }) => fetchUser({ id, signal }), {
    keepPreviousData: true,
  })
}

export default useQueyDetailUser
