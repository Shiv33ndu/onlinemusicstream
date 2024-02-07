import React, { useEffect, useState } from 'react'
import CurrentlyPlaying from './MusicPlayer/CurrentlyPlaying'
import { useGetCurrentlyPlayingQuery } from '../redux/service/spotifyApi'
import Control from './MusicPlayer/Control';
import VolumeSection from './MusicPlayer/VolumeSection';
import SeekBar from './MusicPlayer/SeekBar';
import noimage from '../assets/noimage.png';

function Player() {

  const {data, error, isFetching, refetch} = useGetCurrentlyPlayingQuery();
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsplaying] = useState(false);

  // if(!isFetching) items=data.item;

  // if(items){
  //   console.log('Items::',items);
  //   artists = items?.album?.artists;
  //   images = items?.album?.images;
  //   trackName = items?.name;
  //   console.log('Artists:',artists,'\nImages::',images,'\nTrack Name::',trackName);
  // }

  //polling interval in every 10 seconds
  useEffect(()=>{
    const intervalId = setInterval(()=>{
      refetch();
    },10000)
  },[refetch])

  //as per the new refetch and on the update of the data we will run one more useEffect
  useEffect(()=>{
    if(!isFetching && data)
    {
      setCurrentTrack(data.item);
    }
  },[data, isFetching])
  //console.log('Data::',data);
  //console.log('Data::', currentTrack);
  
  return (
    
    <div className='relative w-full h-[72px]'>
      <div className='absolute h-28 bottom-0 left-0 right-0 flex justify-between items-center animate-slideup bg-[#121212] z-10'>
        <div className='text-white w-1/3' id='currentTrackDiv'>
        { currentTrack || localStorage.getItem('isPlaying') ? 
        <CurrentlyPlaying
        trackName={currentTrack?.name || ''}
        images={currentTrack?.album?.images || noimage}
        artists={currentTrack?.artists || ''}
      />
        :
        ''
        }
        </div>

        { currentTrack ?
        <div className='text-white w-1/3' id='musicControlDiv'>
        <Control  
        currentSongcontext={data?.item?.uri || ''}
        />
        <div className='w-full'>
          <SeekBar
          totalTime={currentTrack?.duration_ms}
          />
        </div>
        </div>
        :
        ''
        }

        {currentTrack ? 
        <div className='text-white w-1/3' id='volumeAndShit'>
        <VolumeSection/>
        </div>
        :
        ''
        }

    </div>
    </div>
    
  )
}

export default Player