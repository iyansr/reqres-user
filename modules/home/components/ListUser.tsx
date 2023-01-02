import Button from '@modules/shared/components/Button'
import classNames from 'classnames'
import Image from 'next/image'
import React, { useState } from 'react'
import { usePageStore } from '../hooks/usePaginated'
import useQueryUsers from '../hooks/useQueryUsers'
import UserCard from './UserCard'

const ListUser = () => {
  const { page, onNextPage, onPreviousPage } = usePageStore()
  const { data, isLoading } = useQueryUsers({ page })

  if (isLoading) {
    return (
      <div className="text-center">
        <h2 className="text-lg font-semibold text-indigo-600">Loading...</h2>
      </div>
    )
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-screen-md pb-16 px-4 sm:pb-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-center font-medium text-indigo-600 text-2xl mb-12">List of Awesome People {'💖'}</h2>

        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2">
          {data?.data.map((user) => (
            <UserCard user={user} key={user.id} />
          ))}
        </div>

        <nav className="flex items-center mt-12 justify-between border-t border-gray-200 bg-white py-3 ">
          <div className="flex flex-1 justify-between ">
            <Button
              onClick={onPreviousPage}
              disabled={page === 1}
              className={classNames({
                grayscale: page === 1,
              })}
            >
              Previous
            </Button>
            <Button
              onClick={onNextPage}
              disabled={page === data?.total_pages}
              className={classNames({
                grayscale: page === data?.total_pages,
              })}
            >
              Next
            </Button>
          </div>
        </nav>
      </div>
    </div>
  )
}

export default ListUser
