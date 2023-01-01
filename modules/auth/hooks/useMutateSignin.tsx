import { Credentials } from '@modules/shared/types'
import { signIn, type SignInResponse } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useMutation } from 'react-query'

const useMutateSignin = () => {
  const router = useRouter()

  const handleSignin = ({ email, password }: Credentials): Promise<SignInResponse> => {
    return new Promise(async (resolve, reject) => {
      const response = await signIn('credentials', {
        redirect: false,
        email,
        password,
      })

      if (response?.ok) {
        resolve(response)
      }
      reject(response)
    })
  }

  return useMutation<SignInResponse, { error: string }, Credentials>(
    ({ email, password }) => handleSignin({ email, password }),
    {
      onSuccess() {
        router.push('/')
      },
    }
  )
}

export default useMutateSignin
