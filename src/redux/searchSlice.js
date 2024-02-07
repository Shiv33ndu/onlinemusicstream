import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    input : null,
    value: '',
    searchData: {},
}

const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers:{
        setSearchInput:(state, action) =>{
           // console.log('Store::Input::',action.payload);
            state.input = action.payload;
        },
        setInputValue:(state, action) =>{
           // console.log('Store::Value::',action.payload);
            state.value = action.payload;
        },
        setSearchData:(state, action) =>{
            console.log('Store::SearcStore::value::',action.payload);
            state.searchData= action.payload;
        },
    }
})

export default searchSlice.reducer;

export const { setSearchInput, setInputValue, setSearchData } = searchSlice.actions;