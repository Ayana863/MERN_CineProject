import { createSlice } from "@reduxjs/toolkit"



export const SearchSlice=createSlice({
    name:"search",
    initialState:{
        value:""
    },
    reducers:{
        searchItems:(state,action)=>{
            state.value=action.payload
        },
        clearSearch:(state)=>{
            state.value=""
        }
    }
})
export const {searchItems,clearSearch}=SearchSlice.actions
export default SearchSlice.reducer