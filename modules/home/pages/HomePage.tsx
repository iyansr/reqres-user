import React from 'react'
import ListUser from '../components/ListUser'

import User from '../components/User'

const HomePage = () => {
  return (
    <div className="min-h-screen max-w-screen-md mx-auto">
      <User />
      <ListUser />
    </div>
  )
}

export default HomePage
