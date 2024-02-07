import queryString from 'query-string'
import { useEffect, useState } from 'react';
import Spotify from './pages/Spotify';
import Player from './components/Player';

export default function App() {

  //console.log('Client ID:', import.meta.env.VITE_CLIENT_SECRET);

  const client_id = import.meta.env.VITE_CLIENT_ID;
  const client_secret = import.meta.env.VITE_CLIENT_SECRET;
  let state = generateRandomString(16);
  
  let scope = ['user-read-private', 'user-read-email', 'user-read-playback-state', 'user-modify-playback-state', 'user-read-currently-playing', 'user-read-recently-played', 'user-read-playback-position', 'user-top-read','playlist-read-private', 'playlist-read-collaborative'];

  let url = 'https://accounts.spotify.com/authorize'
  const redirect_url = 'http://localhost:5173'

  const apiUrl = 'https://api.spotify.com/v1/'

  const [token, setToken] = useState('');

  function generateRandomString(length){
    let str = '';
    const set = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const num = '0123456789';
    for (let i = 0; i < length; i++){
      let randomIndex = Math.floor(Math.random() * set.length % 10);
      let randomNum = Math.floor(Math.random() * num.length % 10);
      str += set[randomIndex] + num[randomNum];
    } 
      return str;
    }
  
  const handleLogin = (e) => {
    e.preventDefault();

    const queryParams = {
      client_id : client_id,
      redirect_uri: redirect_url,
      scope: scope.join(),
      response_type: 'token',
      show_dialog : true,   
    }

    const url = `https://accounts.spotify.com/authorize?${queryString.stringify(queryParams)}`;

    window.location = url
  }
  //console.log('Scope',scope.join());
  useEffect(()=>{
    
    //getting Access Token
    const value = window.location.hash;
    const hash = value.slice(1);
    const token = localStorage.getItem('accessToken');
    
    //we will store Token only when Hash is present and Token is not, means, in Auth Situations
    if(hash && !token){
      let accessToken = hash.split('&')[0].split('=')[1];
      localStorage.setItem('accessToken', accessToken);
      setToken(accessToken);
      //console.log('Token Assigned::', token);
    }
    else{
      setToken(token);
    }
    
  },[])

//  useEffect(()=>{
//     const fetch = async () => {
//       if(token){
//         //we will fetch the data 
//         const {data} = await axios.get(apiUrl+'browse/categories',{
//           headers:{
//             Authorization: `Bearer ${token}`
//           },
//         })
//         console.log('HomePage Data of ::',data);
//       } 
//     }
//     fetch();
//  },[token])

  const logout = () => {
    setToken('');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('volume');
    localStorage.removeItem('isPlaying');
    console.log('URL::', window.location.href);
    window.location.href = redirect_url;
  }
  //console.log('Token::', token);


  //Header Scroll Change FN
  
  

  return (
   <>
      {/* <div className="relative flex bg-raisinBlack">
          
        <Sidebar/>

        <div className="flex-1 flex flex-col">
          <Searchbar/>

          <div className="h-[calc(100hv-72px)] overflow-y-scroll hide-scrollbar flex-col xl:flex-row">
              <div className="flex-1 h-fit pb-40">

              </div>
          </div>
        </div>
          
      </div> */}
      <div className="flex bg-[#121212] w-full h-screen">
          {token ? 

            <div className='w-full'>
              <Spotify/>
              <Player/>
                <button
                  onClick={logout}
                  className="absolute z-50 top-4 right-10 w-[85px] bg-soptifyGreen px-2 py-3 rounded-full text-black font-semibold text-md text-center hover:bg-soptifyGreen/90">
                      Logout
                </button>
            </div>
            :
            <div className='w-full flex justify-center items-center'>
              <div>
              <button 
            onClick={handleLogin}
            className="w-[220px] bg-soptifyGreen px-4 py-3 rounded-full text-black font-semibold text-lg hover:bg-soptifyGreen/90">
                Login to Spotify
            </button>
              </div>
            </div>
            
          }
      </div>
   </>
  )
}