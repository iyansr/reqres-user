import Button from '@modules/shared/components/Button'
import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-screen-md py-16 px-4 sm:py-24 sm:px-6 lg:px-8">{children}</div>
    </div>
  )
}

const User = () => {
  const { data, status } = useSession()

  if (status === 'loading') {
    return (
      <Wrapper>
        <div className="text-center">
          <h2 className="text-lg font-semibold text-indigo-600">Loading...</h2>
        </div>
      </Wrapper>
    )
  }

  if (status === 'unauthenticated') {
    return (
      <Wrapper>
        <div className="text-center">
          <h2 className="text-lg font-semibold text-indigo-600">Hello {`👋`}</h2>
          <p className="mt-1 text-2xl font-bold tracking-tight text-gray-900 ">Please Sign In to get more access</p>
          <Link href="/signin" className="mx-auto">
            <Button className="w-40 mx-auto mt-6">Sign in</Button>
          </Link>
        </div>
      </Wrapper>
    )
  }

  return (
    <Wrapper>
      <div className="text-center">
        <h2 className="text-lg font-semibold text-indigo-600">Hello {`👋`}</h2>
        <p className="mt-1 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl ">{data?.user?.email}</p>
        <Button onClick={() => signOut({ redirect: false })} className="w-40 mx-auto mt-6">
          Sign Out
        </Button>
      </div>
    </Wrapper>
  )
}

export default User
