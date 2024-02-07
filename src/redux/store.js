import {configureStore} from '@reduxjs/toolkit'
import playerReducer from './slice/playerSlice';
import { spotifyApi } from './service/spotifyApi';
import searchReducer from './searchSlice'

export const store = configureStore({
    reducer:{
        player: playerReducer,
        [spotifyApi.reducerPath] : spotifyApi.reducer,
        search: searchReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(spotifyApi.middleware), 
})
