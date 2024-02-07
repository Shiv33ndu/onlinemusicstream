import React, { useEffect, useId, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { useGetSingleBrowseCategoriesQuery } from '../redux/service/spotifyApi';
import Container from '../components/Container';
import Loader from '../components/Loader';
import Error from '../components/Error';
import SongCard from '../components/SongCard';

function SingleBrowsePage() {
    const { param } = useParams();
    const location = useLocation();
    const searchString = location?.search?.slice(1); 
    const categoryName =  searchString.includes('%20') ? searchString.replace('%20', ' ') : searchString;
    const { data, isFetching, error } = useGetSingleBrowseCategoriesQuery(param);
    //console.log('Param::',param);
    //console.log('Category Name::', categoryName);
    //console.log('Data::', data);
    
  if(isFetching) return <Loader/>

  if(error) return <Error/>

  const items = data?.playlists?.items;
  //console.log("Items::", items);
  let id=0;

  return (
    <Container>
        <div className='w-full flex flex-col text-white'>
            <div className='w-full bg-gradient-to-br from-black to-gray-500/25 h-[200px] flex items-end'>
              <p className='py-6 px-4 text-5xl font-bold animate-slideup'>{categoryName}</p>
            </div>
            <div className='w-full flex flex-wrap gap-3 justify-around p-5 mb-5'>
              { data ? 
              items?.map((item) =>(
                <div key={id++} className='w-1/6'>
                  <SongCard
                  images={item.images}
                  name={item.name}
                  description={item.description}
                  />
                </div>
              ))
              :
              <div>Something went wrong! Try Again</div>  
              }
            </div>
        </div>
    </Container>
  )
}

export default SingleBrowsePage