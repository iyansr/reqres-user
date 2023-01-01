import React from 'react'

type InputProps = {
  label?: string
  errorMessage?: string
} & React.InputHTMLAttributes<HTMLInputElement>

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ label, errorMessage, ...rest }, ref) => {
  return (
    <div>
      <label htmlFor={rest.id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="mt-1">
        <input
          ref={ref}
          className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          {...rest}
        />
        {!!errorMessage && <span className="text-xs text-red-600">{errorMessage}</span>}
      </div>
    </div>
  )
})

Input.displayName = 'Input'

export default Input
