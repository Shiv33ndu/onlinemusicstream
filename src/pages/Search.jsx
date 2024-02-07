import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Container from '../components/Container';
import { useGetSearchResultQuery } from '../redux/service/spotifyApi';
import queryString from 'query-string';
import Loader from '../components/Loader';
import Error from '../components/Error';
import Fuse from 'fuse.js';
import TopResult from '../components/TopResult';
import { useDispatch } from 'react-redux';
import { setSearchData } from '../redux/searchSlice';
import SongTile from '../components/SongTile';

function Search() {

  const { searchKey } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let id = 0;
  let foundArtists = [];
  let foundAlbums = [];
  let foundPlaylists = [];
  let foundTracks = [];
  let foundShows = [];
  let foundEpisodes = [];
  let foundAudiobook = [];

  const queryBuild = {
    q: searchKey.replace('%20', ' ').trim().toLowerCase(),
    type: 'album,artist,playlist,track,show,episode,audiobook',
  }

  const {data, isFetching, error, refetch} = useGetSearchResultQuery(queryString.stringify(queryBuild))

  useEffect(()=>{
    if(!isFetching && !data) 
      refetch();
  },[queryBuild.q, queryBuild.type])

  if(isFetching) return <Loader/>

  if(error) return <Error/>

  //console.log('Search Response::', data);

  // if(data && !isFetching){
  //   const options = {
  //     keys: ['name'],
  //     includeScore: true,
  //   }
  //   const flattenData = [...data?.albums?.items,...data?.artists?.items,...data?.audiobooks?.items,...data?.episodes?.items, ...data?.playlists?.items, ...data?.shows?.items, ...data?.tracks?.items];

  //   //console.log('Flatten::',flattenData);

  //   const fuse = new Fuse(flattenData, options);
  //   const fullSearch = fuse.search(searchKey);
  //   const closeResult = fullSearch.filter((result) => result.score < 1)
  //   console.log('Full Search::', closeResult);
    
  // }

  
  if(data && !isFetching){
    const artistsArray = data?.artists?.items || [];
    const albumsArray = data?.albums?.items || [] ;
    const playlistsArray = data?.playlists?.items || [];
    const showsArray = data?.shows ? data.shows.items : [];
  
    //const filterArtist = filterBySearchKey(artistsArray, searchKey.toLowerCase());
  
    const fuse = new Fuse(artistsArray, {keys: ['name']})
    foundArtists = fuse.search(searchKey);

    dispatch(setSearchData(data))
      
    //foundArtists = filterArtist;
      
    //console.log('Found Result::',foundArtists);
  }
  

  return (
    <div className='w-full flex flex-col items-center lg:flex-row mt-24 transition-all duration-100 ease-in-out p-6'>
      
      <div className='w-[90%] lg:w-1/2 text-white rounded-lg p-4 ml-5 mr-5 mb-5'>
        <p className='text-3xl font-poppin font-semibold text-white mb-3'>Top result</p>
        <div>
          {foundArtists ? 
            <TopResult 
            name={foundArtists[0]?.item?.name || ''} 
            type={foundArtists[0]?.item?.type || ''}
            images={foundArtists[0]?.item?.images || ''}/>
            : 
            <div className='text-white'>No Artist Found</div>
          }
        </div>  
      </div>
      
      <div className='w-[90%] lg:w-1/2 text-white rounded-lg p-4 ml-5 mr-5'>
      <p className='text-3xl font-poppin font-semibold text-white mb-3'>Songs</p>
        {data ? 
        data?.tracks?.items.slice(0,4).map((track) => (
          <div key={id++}>
            <SongTile
            artists={track?.artists || []}
            explicit={track?.explicit || false}
            images={track?.album?.images || []}
            songTitle={track?.name || ''}
            time={track?.duration_ms || ''}
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

export default Search