import useLikeStore from '@modules/home/hooks/useLikeStore'
import Button from '@modules/shared/components/Button'
import HeartIcon from '@modules/shared/components/HeartIcon'
import classNames from 'classnames'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { toast } from 'react-hot-toast'
import useQueyDetailUser from '../hooks/useQueyDetailUser'

const DetailUserPage = () => {
  const router = useRouter()
  const { userIds, toggleLike } = useLikeStore()
  const { status } = useSession()

  const { data, isLoading } = useQueyDetailUser(router.query?.userId as string)

  const user = data?.data
  const liked = userIds.includes(user?.id as number)
  const fullName = `${user?.first_name} ${user?.last_name}`

  const handleClick = () => {
    if (status === 'unauthenticated' || status === 'loading') {
      toast.error('You need to signin to do that')
      return
    }

    toggleLike(user?.id as number, (isLiked) => {
      if (isLiked) {
        toast.success(`You Liked ${fullName}`)
        return
      }
      toast.success(`You Disliked ${fullName}`)
    })
  }

  if (isLoading) {
    return (
      <div className="text-center">
        <h2 className="text-lg font-semibold text-indigo-600">Loading...</h2>
      </div>
    )
  }

  return (
    <div className="min-h-screen max-w-screen-md mx-auto">
      <div className="mt-12">
        <Link href="/">
          <Button>← Back</Button>
        </Link>
      </div>
      <div className="max-w-xs mx-auto mt-12">
        <div className="group transition-all">
          <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
            <Image
              src={user?.avatar as string}
              alt={user?.email as string}
              className="h-full w-full object-cover object-center group-hover:opacity-75 transition-opacity duration-100 aspect-w-1 aspect-h-1"
              width={300}
              height={300}
            />
          </div>
        </div>

        <div className="flex items-center">
          <div className="flex-1">
            <h3 className="mt-4 text-base text-indigo-700">{user?.email}</h3>
            <p className="mt-1 text-lg font-medium text-gray-900">
              {user?.first_name} {user?.last_name}
            </p>
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

      <hr className="my-12" />

      <div>
        <p>
          <strong>{fullName}</strong> is a Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit sed veritatis
          asperiores rerum deleniti esse voluptates qui expedita provident accusantium quae tempore, ad reprehenderit
          officiis ut nobis eius hic non
        </p>
      </div>
    </div>
  )
}

export default DetailUserPage
