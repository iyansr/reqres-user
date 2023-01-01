import NextAuth, { type NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import Axios, { type AxiosResponse } from 'axios'

import { API_URL } from '@modules/shared/config'
import { AuthResult, Credentials } from '@modules/shared/types'

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      type: 'credentials',
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials as Credentials
        try {
          const response: AxiosResponse<AuthResult, any> = await Axios.request({
            method: 'POST',
            baseURL: API_URL,
            url: 'login',
            data: {
              email,
              password,
            },
          })
          return {
            token: response.data.token,
            email,
            id: Date.now().toString(),
          }
        } catch (error) {
          throw new Error('Invalid Credentials')
        }
      },
    }),
  ],
  pages: {
    signIn: '/signin',
  },

  callbacks: {
    jwt(params) {
      return params.token
    },
  },
}
export default NextAuth(authOptions)
