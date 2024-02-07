import React from 'react'

function CurrentlyPlaying({
    trackName,
    artists= [],
    images=[],
}) {
    let id=0;
  return (
    <div className='w-full flex px-3'>
        <div id='image'>
            <img className='rounded-md' src={images[2]?.url || ''} alt="" />
        </div>
        <div id='trackName-artists' className='p-4'>
            <div id='trackName'>
                <p className='font-poppin text-[12px] font-bold'>{trackName}</p>
            </div>
            <div id='artists' className='flex'>
                {artists ? 
                artists.map((artist) => (
                    <p key={id++} className='font-poppin text-[11px] font-thin tracking-wide text-white/50 truncate'>{artist.name}{artists.length-1 == id ? '' : ','}</p>
                ))
                :
                ''
                }
            </div>
        </div>
    </div>
  )
}

export default CurrentlyPlaying