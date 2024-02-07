import React from 'react'
import noimage from '../assets/noimage.png'

function BrowseCard({
  name='',
  icons = [],
  href='',
  id='',
}) {
  return (
    <div className='w-full rounded-lg px-3 py-3 bg-[#272727] transition-all duration-300 animate-slideup text-md cursor-pointer hover:bg-[#3b3b3b]'>
      <img 
      className='rounded-lg'
      src={icons[0]?.url || noimage} alt={name} />
      <p className='mt-3 text-lg font-semibold transition-all duration-150 truncate'>{name}</p>
    </div>
  )
}

export default BrowseCard