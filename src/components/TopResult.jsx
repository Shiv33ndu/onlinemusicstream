import React, { useState } from 'react'
import { IconContext } from 'react-icons';
import { BsPlayCircleFill } from "react-icons/bs";
import noimage from '../assets/noimage.png'

function TopResult({
    images=[],
    name,
    type,
}) {

    type = type.charAt(0).toUpperCase() + type.slice(1);
    //console.log(`Name::${name}\nType::${type}\nImages::${images}`);
    const [hovered, setHovered] = useState(false);

  return (
    <div 
    onMouseEnter={() => setHovered(true)}
    onMouseLeave={() => setHovered(false)}
    className='relative w-full rounded-lg bg-[#212121] p-5 cursor-pointer hover:bg-[#2e2e2e] transition-all ease-in animate-slideup'>
      <div className='flex relative'>
        <div className='relative z-10'>
            <img className='w-[100px] h-[100px] rounded-full object-cover shadow-xl shadow-gray-950/40'
            src={images[2]?.url || noimage} alt={name} title={type}/> 
            <p className='text-2xl font-bold text-white mt-3 truncate'>{name}</p>
            <p className='text-sm text-white/40 truncate'>{type}</p>
        </div>
        <div className='relative z-20 flex items-end justify-end lg:w-[77%] w-[83%]'>
          { hovered ? 

          <div className='relative'>
            <div className='bg-black w-[20px] h-[20px] -top-[35px] right-[20px] rounded-full absolute animate-slideupfast'></div>
            <div className='absolute -top-[50px] right-1 animate-slideupfast shadow-xl shadow-black/60 rounded-full'>
              <IconContext.Provider
              className=''
              value={{
                  color: '#1ED760',
                  size: '50px',
                  }}>
                  <BsPlayCircleFill />
              </IconContext.Provider>
            </div>
          </div>
          :
          ''
          }
        </div>
      </div>
    </div>
  )
}

export default TopResult