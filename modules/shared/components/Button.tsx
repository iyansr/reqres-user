import classNames from 'classnames'
import React from 'react'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement>

const Button = ({ className, children, ...rest }: Props) => {
  return (
    <button
      type="submit"
      className={classNames(
        className,
        `flex justify-center 
      rounded-md border border-transparent bg-indigo-600 
      py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 
      focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`
      )}
      {...rest}
    >
      {children}
    </button>
  )
}

export default Button
