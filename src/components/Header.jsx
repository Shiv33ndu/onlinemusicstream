import React, { useEffect } from 'react'
import SearchBox from './SearchBox'
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {Link} from 'react-router-dom'

function Header() {

  const navigate = useNavigate();
  const {pathname} = useLocation();

  //console.log('Location::', pathname);
  const filterOption = [
    {id: 1, name: 'All', filter: 'all'},
    {id: 2, name: 'Artist', filter: 'artist'},
    {id: 3, name: 'Songs', filter: 'track'},
    {id: 4, name: 'Playlists', filter: 'playlist'},
    {id: 5, name: 'Albums', filter: 'album'},
    {id: 6, name: 'Podcasts & Shows', filter: 'show'},

  ]

  const searchState = useSelector(state => state.search.input);
  const inputValue = useSelector(state => state.search.value);
  //console.log('State::', searchState);
  

  return (
      <div className='header-bg fixed top-0 z-10 w-full h-[70px] bg-transparent transition-all duration-300 ease-in-out text-center'>
        <div className='w-full flex justify-start px-5 py-2'>
          <SearchBox/>
        </div>

        <div className='flex gap-3 animate-slidedown mt-3 ml-3 transition-all duration-200'>
        { searchState ?
            filterOption.map((option) => (
              <div key={option.id} className={`rounded-full bg-[#212121] hover:bg-[#292929] animate-slidedown ${ pathname.includes(option.filter.toLowerCase()) ? 'bg-[#29cf63] text-black font-semibold hover:bg-[#29cf63] hover:text-black' : ''}`}>
                  <Link to={`/search/${option.filter.toLowerCase()}/${inputValue}`}>
                  <button className='px-4 py-2 text-sm font-poppin'>
                    {option.name}
                  </button>
                  </Link>
              </div>
            ))
            :
            ''
          }
        </div>
      </div>
  )
}

export default Header