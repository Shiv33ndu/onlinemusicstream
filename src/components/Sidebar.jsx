import React from 'react'
import SpotifyWhite from '../assets/SpotifyWhite.png'
import { sideBarOptions } from '../constants/constants'
import { Link } from 'react-router-dom';
import { useGetUserPlaylistsQuery } from '../redux/service/spotifyApi';
import { IoIosArrowForward } from "react-icons/io";
import RespContainer from './RespContainer';


function Sidebar() {
  let id=0;
  let id1=3;
  const items = sideBarOptions;
  const {data, error} = useGetUserPlaylistsQuery();
  console.log('Playlists Data::', data);
  return (
      <div className='w-1/6 relative bg-gradient-to-b from-[#212121] to-gray-800/5 animate-slideleft rounded-b-lg mb-9 xxs:hidden md:block'>
        
        <div className='w-full mt-3'>
          <img 
          className='-mt-16'
          src={SpotifyWhite} alt='Spotify' />
        </div>

        <div className='w-full flex flex-col items-center mt-[-30px] gap-3'>
            {items ? 
              <div className='space-y-2'>
                {items.map((item)=>(
                  <Link key={item.title} to={item.path}>
                <div key={id++} className={`flex flex-row mb-2 w-[${item.title.length}px]`}>
                    <div className='mt-[2px] ml-[-70px]'>
                      <img 
                      className='w-[22px] mr-4 stroke-white'
                      src={item.icon} alt={item.title} />
                    </div>
                    <p className='text-left font-poppin font-semibold text-[#7a7878] hover:text-white text-sm'>{item.title}</p>
              
                </div>
                  </Link>
              ))}
              </div>
            :
            <div>No Content</div>
            }
        </div>


        {/* Playlist Data Fetching */}

        <div className='w-full flex flex-col gap-3 mt-6 text-[#7a7878]'>
            <div className='flex justify-between px-4'>
            <p className='font-semibold text-sm text-white/45'>PLAYLIST</p>
            <Link to={`/playlists`}>
            <IoIosArrowForward className='hover:text-white' title='See All Playlists'/>
            </Link>
            </div>
            <div id='PlaylistsLis' className='w-full h-[100px] space-y-2 px-4'>
              { data ?
                data?.items?.slice(0,8).map((item) => (
                  <div key={id++} className={`w-[${item.name.length-4}px]`}>
                    <div className='truncate text-sm font-semibold hover:text-white cursor-pointer'>{item.name}</div>
                  </div>
                ))
                :
                ''
              }
            </div>
        </div>
    </div>
  )
}

export default Sidebar