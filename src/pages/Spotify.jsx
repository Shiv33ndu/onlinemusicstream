import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import Browse from './Browse'
import Player from '../components/Player'
import Header from '../components/Header'
import SingleBrowsePage from './SingleBrowsePage'
import Search from './Search'
import TopArtists from './TopArtists'
import CommonView from './CommonView'
import SongSearchPage from './SongSearchPage'

function Spotify() {

  

  return (
    <div className='text-white relative flex flex-col'>
        <div id='colSection' className='relative flex w-full'>
            <Sidebar/>
            <div id='routerSection' className='h-[calc(100vh-72px)] overflow-y-scroll hide-scrollbar w-full'>
            <Header/>
                <Routes>
                    <Route path='/' element={<Browse/>}/>
                    <Route path='/search' element={<Browse/>}/>
                    <Route path='/:param' element={<SingleBrowsePage/>}/>
                    <Route path='/search/all/:searchKey' element={<Search/>}/>
                    <Route path='/search/artist/:searchKey' element={<TopArtists/>}/>
                    <Route path='/search/track/:searchKey' element={<SongSearchPage/>}/>
                    <Route path='/search/playlist/:searchKey' element={<CommonView/>}/>
                    <Route path='/search/episode/:searchKey' element={<CommonView/>}/>
                    <Route path='/search/show/:searchKey' element={<CommonView/>}/>
                    <Route path='/search/album/:searchKey' element={<CommonView/>}/>
                </Routes>
            </div>
        </div>
        
    </div>
  )
}

export default Spotify