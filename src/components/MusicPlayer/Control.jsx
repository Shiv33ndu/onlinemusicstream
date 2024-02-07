import React, { useEffect, useState } from 'react'
import { IconContext } from 'react-icons';
import { BsPlayCircleFill, BsPauseCircleFill, BsRepeat, BsRepeat1, BsShuffle } from "react-icons/bs";
import { CgPlayTrackNext, CgPlayTrackPrev } from "react-icons/cg";
import axios from 'axios';

function Control({
    currentSongcontext = '',
    progressTime = 0,
}) {


    const [isShuffleHovered, setIsShuffleHovered] = useState(false);
    const [isPlayPrevHovered, setIsPlayPrevHovered] = useState(false);
    const [isPlayNextHovered, setIsPlayNextHovered] = useState(false);
    const [isRepeatHovered, setIsRepeatHovered] = useState(false);
    const [isPlayHovered, setIsPlayHovered] = useState(false);

    const accessToken = localStorage.getItem('accessToken');
    progressTime = localStorage.getItem('progress_ms');
    //console.log('CurrentSongContext::',progressTime);
    
    const skipTo = (operation) => {
        const url = `https://api.spotify.com/v1/me/player/${operation}`;
        
        axios.post(url,{},{
          headers:{
            Authorization:`Bearer ${accessToken}`
          }
        })
        .then((response) => {
          console.log('SuccessFull!!!');
        })
        .catch((error) => {
          console.log("SkipError::",error.message);
        })
    }

    const playback = async (operation) => {
      //console.log('PlayPause Clicked!!');
      const url = `https://api.spotify.com/v1/me/player/${operation}`;
      localStorage.setItem('isPlaying', true);
      const data = {
        'uris' : [currentSongcontext],
        'position' : '',
        'position_ms' : progressTime,
      }

      try {
        const response = await axios.put(url,data,{
          headers: {
            Authorization : `Bearer ${accessToken}`,
            "Content-Type": 'application/json',
          },
        });
      } catch (error) {
        console.log('Playback::Error::',error.message);
      }

    }

    const pause = (operation) => {
      const url = `https://api.spotify.com/v1/me/player/${operation}`;
      localStorage.setItem('isPlaying', false);
      axios.put(url,{},{
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      .then((response) => {
        console.log('Successfully Paused!!!');
        
      })
      .catch((error) => {
        console.log('Pause::Error::',error.message);
      })
    }


  return (
    <div className='w-full flex flex-col justify-center items-center'>

      <div className='w-full flex justify-center items-center' id='insidePlayer'>

      <button
      onMouseEnter={() => setIsShuffleHovered(true)}
      onMouseLeave={() => setIsShuffleHovered(false)}
      >
        <IconContext.Provider
        value={{
        color: isShuffleHovered ? 'white' : 'gray',
        size: '18px',
        }}
        >
            <BsShuffle className='mr-4' />
        </IconContext.Provider>
      </button>

      <button
      onClick={() => skipTo('previous')}
      onMouseEnter={()=> setIsPlayPrevHovered(true)}
      onMouseLeave={()=> setIsPlayPrevHovered(false)}
      >
        <IconContext.Provider
        value={{
          color: isPlayPrevHovered ? 'white' : 'gray', 
          size:'35px'}}>
          <CgPlayTrackPrev className='mr-4'/>
        </IconContext.Provider>
      </button>

      <button
      onClick={() => {
        if(localStorage.getItem('isPlaying') === 'true'){
          pause('pause')
        }
        else{
          playback('play')
        }
        return
      }}
      onMouseEnter={()=> setIsPlayHovered(true)}
      onMouseLeave={() => setIsPlayHovered(false)}
      >
        {localStorage.getItem('isPlaying') === 'true' ? 
              <IconContext.Provider
              value={{
                color: 'white', 
                size: '35px',
                scale: isPlayHovered ? '40px' :'35px'}}>
                 <BsPauseCircleFill/> 
              </IconContext.Provider>
              :
              <IconContext.Provider
              value={{
                color: 'white', 
                size: '35px',
                scale: isPlayHovered ? '40px' :'35px'}}>
                 <BsPlayCircleFill/> 
              </IconContext.Provider>
        }
      </button>

      <button
      onClick={() => skipTo('next')}
      onMouseEnter={() => setIsPlayNextHovered(true)}
      onMouseLeave={() => setIsPlayNextHovered(false)}
      >
        <IconContext.Provider
        value={{
          color: isPlayNextHovered ? 'white' : 'gray', 
          size:'35px'}}>
          <CgPlayTrackNext className='ml-4'/>
        </IconContext.Provider>
      </button>

      <button
      onMouseEnter={() => setIsRepeatHovered(true)}
      onMouseLeave={() => setIsRepeatHovered(false)}
      >
        <IconContext.Provider
        value={{
          color: isRepeatHovered ? 'white' : 'gray', 
          size:'18px'}}>
          {isRepeatHovered ? <BsRepeat className='ml-4'/> : <BsRepeat1 className='ml-4'/>}
        </IconContext.Provider>
      </button>

      </div>
      
      

    </div>
  )
}

export default Control