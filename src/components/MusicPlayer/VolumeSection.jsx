import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios';
import { BsFillVolumeMuteFill, BsFillVolumeUpFill } from "react-icons/bs";
import { IconContext } from 'react-icons';

function VolumeSection() {
  
  const [volumeInput, setVolumeInput] = useState(0);
  const rangeRef = useRef(0);
  const volumePercent = localStorage.getItem('volume');
  const [isVolHovered, setIsVolHovered] = useState(false);
  //console.log('RangeRef::',rangeRef);

  useEffect(()=>{
    setVolumeInput(volumePercent);
    //console.log("Volume Percent::",volumePercent);
  },[volumePercent])


  function axiosSetVolume(volume) {
    const accessToken = localStorage.getItem('accessToken');
    const url = `https://api.spotify.com/v1/me/player/volume?volume_percent=${volume}`;
    //console.log('Token::',accessToken);

    axios.put(url,{},
        {
          headers:{
            'Authorization': `Bearer ${accessToken}`,
          }
        }
      )
      .then((resp) => {
        console.log('Volume Set Successfully:',resp.data);
      })
      .catch((error) =>{
        console.log('VolumeSetting::Error::',error);
      })
  }

  // console.log('Current vol::', volumeInput)
  //   setVolumeInput((prev) => {
  //     console.log('Prev Vol::', prev);
  //   })

  return (
    <div className='flex justify-end px-5'>
        <div className='-mt-[10px] mr-2'>
        <button
          className='cursor-default'
          onMouseEnter={() => setIsVolHovered(true)}
          onMouseLeave={() => setIsVolHovered(false)}
          >
          <IconContext.Provider
          value={{
            color: isVolHovered ? 'white' : 'gray', 
            size:'25px'}}>
            {volumeInput == 0 ? <BsFillVolumeMuteFill className='ml-4'/> : <BsFillVolumeUpFill className='ml-4'/>}
          </IconContext.Provider>
        </button>
        </div>

        <div className='relative w-[100px] h-1 group'>
        <div id='absoluteBox' className='absolute w-full h-1 bg-white/20 rounded-full'></div>
        <div className={`absolute flex-grow h-1 w-auto`}>
        <div id='progress' className={`h-1 group-hover:bg-green-700 bg-white rounded-xl`}
        style={{width: `${Number((volumeInput || 0))}px`}}
        ></div>
        </div>
        <input 
        id='inputBox' 
        type="range" 
        min={0}
        max={100}
        value={volumeInput}
        ref={rangeRef}
        onChange={(e) => setVolumeInput((prev) => {
            axiosSetVolume(e?.currentTarget?.value); 
            setVolumeInput(e?.currentTarget?.value);
        })}
        className='absolute w-full h-1 bg-transparent accent-white/20 appearance-none cursor-default opacity-0 group-hover:opacity-100'
        />
      </div>
    </div>
  )
}

export default VolumeSection
