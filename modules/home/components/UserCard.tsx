import { User } from '@modules/shared/types'
import Image from 'next/image'
import React from 'react'

type Props = {
  user: User
}

const UserCard = ({ user }: Props) => {
  return (
    <div>
      <a href={`/${user.id}`} className="group transition-all">
        <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
          <Image
            src={user.avatar}
            alt={user.email}
            className="h-full w-full object-cover object-center group-hover:opacity-75 transition-opacity duration-100 aspect-w-1 aspect-h-1"
            width={300}
            height={300}
          />
        </div>
      </a>
      <h3 className="mt-4 text-base text-gray-700">{user.email}</h3>
      <p className="mt-1 text-lg font-medium text-gray-900">
        {user.first_name} {user.last_name}
      </p>
    </div>
  )
}

export default UserCard
