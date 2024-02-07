import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const spotifyApi = createApi({
    reducerPath: 'spotifyApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.spotify.com/',
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('accessToken');
            //console.log('SpotifyApi::Token::',token);
            headers.set('Authorization', `Bearer ${token}`);
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getBrowseCategories: builder.query({query : () => 'v1/browse/categories?limit=50'}),
        getSingleBrowseCategories: builder.query({query : (category_id) => `v1/browse/categories/${category_id}/playlists?limit=25`}),
        getUserPlaylists: builder.query({query : () => 'v1/me/playlists'}),
        getCurrentlyPlaying: builder.query({query : () => 'v1/me/player/currently-playing'}),
        getPlaybackState: builder.query({query : () => 'v1/me/player'}),
        getSearchResult: builder.query({query: (query) => `v1/search?${query}`}),
    }),
});

export const {
    useGetBrowseCategoriesQuery,
    useGetSingleBrowseCategoriesQuery,
    useGetUserPlaylistsQuery,
    useGetCurrentlyPlayingQuery,
    useGetPlaybackStateQuery,
    useGetSearchResultQuery,
} = spotifyApi;