import React, { useRef, useState } from 'react'
import Container from './Container';
import { FaSearch } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setInputValue, setSearchInput } from '../redux/searchSlice';

function SearchBox() {
    const [input, setInput] = useState('');
    const navigate = useNavigate();
    const searchRef = useRef('');
    const dispatch = useDispatch();
    //console.log('Location::',window.location.href);
    const inputValue = useSelector(state => state.search.value)
    if(inputValue){
      dispatch(setSearchInput(true)); 
    }else{
      dispatch(setSearchInput(false));
    }

  return (
    <div className='mt-2'>
        <div className='flex w-full justify-center items-center 
        rounded-full px-3 text-white font-semibold bg-[#1d1d1d]
        hover:outline hover:outline-soptifyGreen/85 transition-all duration-100 ease-out'>
            <FaSearch/>
            <input 
            className='w-[300px] outline-none rounded-full ml-2 px-1 py-3 bg-[#1d1d1d] placeholder:text-soptifyGreen/20
            placeholder:italic placeholder:text-md placeholder:font-normal'
            value={inputValue}
            ref={searchRef}
            onChange={(e) => {
              //setInput(e.currentTarget.value);
              dispatch(setInputValue(e.currentTarget.value));
              if(inputValue.trim() !== '')
              navigate(`/search/all/${e.currentTarget.value}`);
              else
              navigate('/');
              return
            }}
            placeholder='what do you want to listen...'
            type="text" />
            <button onClick={() => {
              setInput('');
              dispatch(setInputValue(''));
              navigate('/');
              return
            }}>
              { inputValue ? 'X' : ''}
            </button>
        </div>
    </div>
  )
}

export default SearchBox