import React from 'react'
import { MdExplicit } from "react-icons/md";
import noimage from '../assets/noimage.png';
import { IconContext } from 'react-icons';
import { IoIosPlay } from "react-icons/io";

function SongTile({
    images = [],
    artists = [],
    songTitle = '',
    time = '',
    explicit = false,
    ...prop
}) {
    let id = 0;
    let album = '';
    const formattedTime = String(Math.floor((time / 1000)/60)+':'+(Math.floor((time / 1000)%60) < 10 ? '0'+Math.floor((time / 1000)%60) : Math.floor((time / 1000)%60))); 

    if(prop.album_name){

        album = prop.album_name;

    }

  return (
    <div 
    className='hover:bg-[#2c2c2c] focus:bg-gray-600 group w-full h-14 flex justify-between rounded px-2 py-1 transition-all duration-200'>
        <div className='relative overflow-hidden rounded'>
            <img
            className='rounded w-[54px] object-cover' 
            src={images[1]?.url || noimage} alt="" />
            <div className='absolute z-[5] bottom-0 left-0 group-hover:block hidden group-hover:bg-black/50 group-hover:opacity-100 rounded'>
                <div className='bg-gray-900/10 backdrop-blur-[0px] left-3 top-5 relative w-[60px] h-[60px] rounded'>
                        <IconContext.Provider
                        value={{size: '30px'}}
                        >
                            <IoIosPlay/>
                        </IconContext.Provider>
                </div>
            </div>
        </div>
        <div className='w-full flex justify-between'>
            <div className='flex flex-col w-full'>
                <div id='songtitleDiv' className='w-[50%]'>
                <p className='text-sm font-poppin font-semibold text-white/90 ml-3 truncate'>{songTitle}</p>
                </div>
                <div className='w-full flex justify-start items-center ml-3'>
                    {explicit ? 
                    <IconContext.Provider
                    value={{color: 'gray',
                            size: '18px'}}
                    >
                        <MdExplicit/>
                    </IconContext.Provider> : ''}
                    <div className='flex w-[50%] justify-start truncate'>
                    {artists ? 
                    artists.map((artist) => (
                            <p key={id++} className='text-sm group-hover:text-white text-white/50 font-semibold'>{artist.name}{artists.length-1 == id ? '' : ','+' '}</p>
                    ))
                    :
                    ''
                    }
                    </div>
                </div>
            </div>
            {album ? 
            <div className='w-full mr-24 flex items-center'>
                    <div className='w-[50%] flex justify-start'>
                    <p className='text-white/55 font-normal text-md truncate'>{album.length > 27 ? album.slice(0,27)+'...' : album}</p>
                    </div> 
            </div>
            : ''}
            <div className='flex items-center'>
            <p className='text-sm font-poppin text-white/55'>{formattedTime}</p>
            </div>
        </div>
    </div>
  )
}

export default SongTile

    