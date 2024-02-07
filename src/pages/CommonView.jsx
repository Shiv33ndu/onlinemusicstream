import React from 'react'
import AlbumCard from '../components/AlbumCard'
import { useLocation, useParams } from 'react-router-dom'
import { useGetSearchResultQuery } from '../redux/service/spotifyApi';
import queryString from 'query-string';
import Loader from '../components/Loader';
import Error from '../components/Error';

// this page will render Playlists, Shows, Podcasts(Episode), Albums

function CommonView() {
  
  const { searchKey } = useParams();
  const { pathname } = useLocation();
  let pathType = '';
  let id = 0;

  //console.log(`PathName::${pathname}\nKey::${searchKey}`);

  if(pathname){
    if(pathname.includes('album')) pathType = 'album'
    if(pathname.includes('playlist')) pathType = 'playlist'
    if(pathname.includes('podcast')) pathType = 'episode'
    if(pathname.includes('show')) pathType = 'show'
  }
  
  const query = {
    q: searchKey.replace('%20', ' ').trim().toLowerCase(),
    type: pathType,
  }
  console.log('Path:',pathType);
  const {data, error, isFetching} = useGetSearchResultQuery(queryString.stringify(query));

  if(isFetching) return <Loader/>

  if(error) return <Error/>

  if(data) {
    console.log('Data::',data);
    pathType = pathType.concat('s');
  }
  //console.log(pathType);
  
  if(data){
    const result = data[pathType];

    return (
        <div className='w-full flex flex-wrap justify-around gap-3 mt-36 mb-10'>
        { result.items.map((item) => (
          <div key={id++} className='w-1/6'>
            <AlbumCard
            name={item?.name || ''}
            images={item?.images || ''}
            type={item?.type || ''}
            description={item?.owner?.display_name || ''}
            artists={item?.artists || []}
            rel_date={item?.release_date || ''}
            />
          </div>
        ))}
      </div>
    )
  }
}

export default CommonView