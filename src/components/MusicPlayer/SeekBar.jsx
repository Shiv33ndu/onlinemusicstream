import React, { useEffect, useState } from 'react'
import { useGetPlaybackStateQuery } from '../../redux/service/spotifyApi';

function SeekBar({
    totalTime,
}) {
    const [endTime, setEndTime] = useState('');
    const [progressTime, setProgressTime] = useState('')
    const [seekTime, setSeekTime] = useState('');
    const {data, error, isFetching, refetch} = useGetPlaybackStateQuery();

    useEffect(()=>{
        const intervalTime = setInterval(()=>{
                refetch();
        },1000)
    },[refetch])

    useEffect(()=>{
        if(!isFetching && data){
            //console.log('Progress Data::', data?.device);
            localStorage.setItem('volume',data?.device?.volume_percent || 0);
            localStorage.setItem('isPlaying', data?.is_playing);
            localStorage.setItem('progress_ms', data?.progress_ms || 0);
            const totalSecond = Math.floor(data?.progress_ms / 1000);
            const min = Math.floor(totalSecond / 60);
            const sec = Math.floor(totalSecond % 60);
           // console.log('Progress Time::');
            setProgressTime(min+':'+(sec < 10 ? `0${sec}` : sec));
        }
    },[data, isFetching])

    useEffect(()=>{
        const Totalseconds = Math.floor(totalTime / 1000);
        const minutes = Math.floor(Totalseconds / 60);
        const seconds = Totalseconds % 60;
        //console.log(minutes+':'+seconds);
        setEndTime(minutes+':'+(seconds < 10 ? `0${seconds}` : seconds));
    },[totalTime])

    const progressPercentage = (data?.progress_ms / totalTime) * 400 || 0;

  return (
    <div className='flex justify-center w-full mt-2'>
        <div className='mt-2 cursor-default'>
            <p className='text-[10px] mr-2'>{progressTime ? progressTime : '0:00'}</p>
        </div>

        <div className={`relative w-full group`}>
            <div id='absoluteBoxSeek' className='absolute top-[14px] -z-0 w-full h-1 bg-white/20 rounded-full'></div>
            <div id='seekBarDiv' className='w-full absolute bg-transparent z-10 rounded-full'>
                <input 
                min={0}
                value={data?.progress_ms || 0}
                max={totalTime}
                onChange={(e) => (e)}
                className='w-full accent-white/20 h-[4px] outline-none rounded-lg appearance-none bg-white/20 opacity-0 group-hover:opacity-100' 
                type="range" name="" id="" />
            </div>

            <div className={`absolute flex-grow h-1 w-auto top-[14px]`}>
                <div id='progressDiv' className={`h-1 group-hover:bg-green-700 bg-white rounded-xl`}
                style={{width: `${progressPercentage}px`}}></div>
            </div>
        </div>

        <div className='mt-2 cursor-default'>
            <p className='text-[10px] ml-2'>{endTime ? endTime : '0:00'}</p>
        </div>
    </div>
  )
}

export default SeekBar