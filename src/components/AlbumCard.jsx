import React, { useState } from 'react'
import { IconContext } from 'react-icons';
import { BsPlayCircleFill } from 'react-icons/bs';
import noimage from '../assets/noimage.png'

//this card component can show Playlist, Show, PodCasts(EP), Albums

function AlbumCard({
    name='',
    images=[],
    description='',
    type = '',
    ...prop
}) {


    const [hovered, setHovered] = useState(false);

    if(prop.rel_date){
      //console.log('Prop::',prop);
      description = prop.rel_date.slice(0,4).concat(' '+String.fromCharCode(8226)+' '+prop.artists[0].name);
     // console.log(+'');
    }
    

    if(type === 'playlist') description = 'By '.concat(description);

  return (
    <div 
    onMouseEnter={() => setHovered(true)}
    onMouseLeave={() => setHovered(false)}
    className='relative w-full justify-center rounded-lg bg-[#181717] px-3 py-3 cursor-pointer hover:bg-[#202020] transition-all duration-100 ease-in-out animate-slideup'>
      <div className='inline-flex justify-center w-full transition-all duration-100'>
      <img 
      className='rounded object-cover lg:w-[160px] lg:h-[160px] md:w-[100px] md:h-[100px] sm:w-[70px] sm:h-[70px] text-center shadow-xl shadow-black/65'
      src={images[0]?.url || noimage} alt={name} title={description}/>
      </div>
      <p className='text-md font-bold text-white/85 mt-3 truncate px-2'>{name}</p>
      <p className='text-sm font-semibold text-white/35 truncate px-2 mt-1 mb-7'>{description}</p>
      <div className='relative z-[5] w-full'>
            <div className='absolute -top-[100px] right-[50px]'>
                {hovered ?                 
                <div>
                    <div className='bg-black w-[20px] h-[20px] -top-[35px] -right-[25px] rounded-full absolute animate-slideupfast'></div>
                    <div className='absolute -top-[50px] -right-[40px] animate-slideupfast shadow-lg shadow-gray-950/45 rounded-full'>
                        <IconContext.Provider
                        className=''
                        value={{
                            color: '#1ED760',
                            size: '50px',
                            }}>
                            <BsPlayCircleFill/>
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

export default AlbumCard