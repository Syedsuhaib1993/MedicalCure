import React from 'react'

const Button = ({title,submit}) => {
  return (
    <div>
      <button type={submit} className='bg-yellow-500 sm:text-lg text-sm text-white px-2 py-2 rounded-md hover:bg-yellow-300 trasition duration-300 ease-in-out'>
        {title}
      </button>
    </div>
  )
}

export default Button
