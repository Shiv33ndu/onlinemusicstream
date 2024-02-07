import React from 'react'

function Container({
    children,
    className='',
}) {
  return (
    <div className={`w-full ${className} flex justify-center items-center flex-wrap`}>
        {children}
    </div>
  )
}

export default Container