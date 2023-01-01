import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler } from 'react-hook-form/dist/types'

import Input from '@modules/shared/components/Input'
import { Credentials } from '@modules/shared/types'
import useMutateSignin from '../hooks/useMutateSignin'

const schema = z.object({
  email: z.string().email().min(2),
  password: z.string().min(8, 'Password must contain at least 8 characters'),
})

const Form = () => {
  const { mutateAsync, isLoading, error } = useMutateSignin()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Credentials>({
    resolver: zodResolver(schema),
  })

  const onSubmit: SubmitHandler<Credentials> = async (data) => {
    await mutateAsync(data)
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <Input label="Email Address" {...register('email')} errorMessage={errors?.email?.message} />
      <Input label="Password" {...register('password')} errorMessage={errors?.password?.message} />

      <div>
        <button
          disabled={isLoading}
          type="submit"
          className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          {isLoading ? 'Loading...' : 'Sign in'}
        </button>
      </div>

      <div>{error ? <p className="text-red-500 text-center text-sm">{error?.error}</p> : null}</div>
    </form>
  )
}

export default Form
