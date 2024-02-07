import React from 'react'
import noimage from '../assets/noimage.png';

function SongCard({
  name,
  images=[],
  description,
}) {

  //console.log(`Name::${name}\nImages::${images}\nType::${description}`);

  return (
    <div className='w-full rounded-lg bg-[#272727] p-3 cursor-pointer hover:bg-[#3b3b3b] transition-all duration-300 ease-in-out animate-slideup'>
      <img 
      className='rounded-lg'
      src={images[0]?.url || noimage} alt={name} title={description}/>
      <p className='text-md font-bold text-white/85 mt-3 truncate'>{name}</p>
      <p className='text-sm text-white/40 truncate'>{description}</p>
    </div>
  )
}

export default SongCard