import React, { useState } from 'react'

import { useSession, signIn, signOut } from 'next-auth/react'

const Home = () => {
  const { data, status } = useSession()
  const [user, _] = useState<{ email: string; password: string }>({
    email: 'eve.holt@reqres.in',
    password: '',
  })

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (status === 'unauthenticated') {
    return (
      <div>
        <button
          onClick={async () => {
            const res = await signIn('credentials', {
              redirect: false,
              email: user.email,
              password: user.password,
            })
          }}
        >
          Login
        </button>
      </div>
    )
  }
  return (
    <div>
      <div>{JSON.stringify(data)}</div>
      <button
        onClick={async () => {
          await signOut({ redirect: false })
        }}
      >
        logOut
      </button>
    </div>
  )
}

export default Home
