import React, { useEffect, useState } from 'react'
import SongTile from '../components/SongTile'
import { useGetSearchResultQuery } from '../redux/service/spotifyApi'
import { useLocation, useParams } from 'react-router-dom'
import queryString from 'query-string';
import Loader from '../components/Loader';
import Error from '../components/Error';


function SongSearchPage() {

    const { searchKey } = useParams();
    const { pathname } = useLocation();
    let id = 1;

    const query = {
        q: searchKey.replace('%20', ' ').trim().toLowerCase(),
        type: pathname.includes('track') ? 'track' : '',
        limit: 50,
      }
      
      const { data, isFetching, error } = useGetSearchResultQuery(queryString.stringify(query));
      
      if(isFetching) return <Loader/>
      if(error) return <Error/>
      
      //const [scrolled, setScrolled] = useState(false)
      
      const handleScroll = (e) => {
        console.log('Scroll::', e);
      }
      

  if(data){
    return (
        <div className='w-full px-10 mb-10'>
            <div id='Titles' className='w-full mt-32 py-3'>
                <div id='cont' className={`fixed z-10 h-10 w-full mx-auto xl:max-w-5xl lg:max-w-[51rem] md:max-w-[46rem] sm:max-w-[35rem] xxs:max-w-[20rem] text-white/55 transition-all duration-100 `}>
                    <div className='flex justify-between ml-5 -mr-9'>
                    <div className='flex gap-4 w-full'>
                        <p>#</p>
                        <p>Title</p>
                    </div>
                    <div className='flex justify-between w-full'>
                    <p className='mr-10'>Album</p>
                    <p className=''>Time</p>
                    </div>
                    </div>
                </div>
            </div>

            <div className='w-full p-5 flex flex-col'>
            <div className='w-full bg-[#333333] h-[1px] mb-4 mt-3'></div>
                {data ? 
                data?.tracks?.items.map((item) => (
                    <div key={id++} className='flex items-center gap-3'>
                        <p className='text-white/55 text-md font-semibold'>{id}</p>
                        <SongTile
                        artists={item?.artists || []}
                        explicit={item?.explicit || false}
                        images={item?.album?.images || []}
                        songTitle={item?.name || ''}
                        time={item?.duration_ms || ''}
                        album_name={item?.album?.name || ''}
                        />
                    </div> 
                ))
                :
                ''
                }
            </div>
        </div>
      )
  }
}

export default SongSearchPage