import React from 'react'
import { useParams } from 'react-router-dom'
import Container from '../components/Container';
import { useGetSearchResultQuery } from '../redux/service/spotifyApi';
import queryString from 'query-string';
import Loader from '../components/Loader';
import Error from '../components/Error';
import ArtistCard from '../components/ArtistCard';

function TopArtists() {

  const {searchKey} = useParams();
  console.log('Key::',searchKey);
  
  const queryBuild = {
    q: searchKey.replace('%20', ' ').trim().toLowerCase(),
    type: 'artist',
  }

  const {data, isFetching, error, refetch} = useGetSearchResultQuery(queryString.stringify(queryBuild));

  if(data && !isFetching)
    console.log('Data::',data);

  if(isFetching) return <Loader/>
  
  if(error) return <Error/>

  return (
    <Container>
        <div className='w-full flex text-white'>
            <div className='w-full flex flex-wrap justify-evenly gap-3 p-5 mb-5 mt-32 '>
              { data ? 
              data?.artists?.items?.map((item) =>(
                <div key={item.name} className='w-1/5'>
                  <ArtistCard
                  images={item?.images || ''}
                  name={item?.name || ''}
                  description={item?.type || ''}
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

export default TopArtists