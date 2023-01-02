import HeartIcon from '@modules/shared/components/HeartIcon'
import { User } from '@modules/shared/types'
import classNames from 'classnames'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { toast } from 'react-hot-toast'
import useLikeStore from '../hooks/useLikeStore'

type Props = {
  user: User
}

const UserCard = ({ user }: Props) => {
  const { userIds, toggleLike } = useLikeStore()
  const { status } = useSession()

  const liked = userIds.includes(user.id)
  const fullName = `${user.first_name} ${user.last_name}`

  const handleClick = () => {
    if (status === 'unauthenticated' || status === 'loading') {
      toast.error('You need to signin to do that')
      return
    }

    toggleLike(user.id, (isLiked) => {
      if (isLiked) {
        toast.success(`You Liked ${fullName}`)
        return
      }
      toast.success(`You Disliked ${fullName}`)
    })
  }

  return (
    <div>
      <Link href={`/${user.id}`} className="group transition-all">
        <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
          <Image
            src={user.avatar}
            alt={user.email}
            className="h-full w-full object-cover object-center group-hover:opacity-75 transition-opacity duration-100 aspect-w-1 aspect-h-1"
            width={300}
            height={300}
          />
        </div>
      </Link>

      <div className="flex items-center">
        <div className="flex-1">
          <h3 className="mt-4 text-base text-indigo-700">{user.email}</h3>
          <p className="mt-1 text-lg font-medium text-gray-900">{fullName}</p>
        </div>
        <div>
          <button
            onClick={handleClick}
            className="rounded-full h-8 w-8 border border-gray-400 bg-gray-100 flex items-center justify-center"
          >
            <HeartIcon
              className={classNames('h-4 w-4', {
                'text-red-500': liked,
                'text-gray-400': !liked,
              })}
            />
          </button>
        </div>
      </div>
    </div>
  )
}

export default UserCard
