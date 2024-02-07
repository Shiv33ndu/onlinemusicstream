import React from 'react'
import BrowseCard from './BrowseCard'
import Container from './Container'
import { useGetBrowseCategoriesQuery } from '../redux/service/spotifyApi';
import Loader from './Loader';
import Error from './Error';
import { Link } from 'react-router-dom';

function BrowserComp() {

  const { data, isFetching, error } = useGetBrowseCategoriesQuery();

  //console.log('Browser::SpotifyAPI::Data::', data);

  

  //console.log('Items::',data.items);

  if(isFetching) return <Loader/>

  if(error) return <Error/>

  const items = data?.categories?.items;

  const handleScroll = () => {
    console.log(window.scrollY);
  }

  //window.addEventListener('scroll',handleScroll);

  return (
    <Container>
      <div className='mb-6' onScroll={handleScroll}>
      <div className='w-full bg-gradient-to-br from-black to-gray-500/25 h-[200px] flex flex-col justify-end mb-5'>
              <p className='py-6 px-4 text-5xl font-bold truncate animate-slideup'>Browse all</p>
              <div className='w-full h-[1px] bg-inchWormGreen/35 shadow-inner'></div>
      </div>
      
      <div className='w-full flex flex-wrap gap-3 justify-around p-4'>
        { data ? 
        items?.map((item) =>(
          <div key={item.id} className='w-1/6'>
            <Link to={{
              pathname: `/${item.id === 'toplists' ? item.id : item.id}`,
              search: `${item.name}`,
              }}>
              <BrowseCard href={item.href} icons={item.icons} id={item.id} name={item.name} />
            </Link>
          </div>
        ))
        :
        <div>Nothing found</div>  
      }
      </div>
      </div>
    </Container>
  )
}

export default BrowserComp