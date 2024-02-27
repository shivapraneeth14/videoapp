import { createSlice } from "@reduxjs/toolkit";

export const Themeslice = createSlice({
   name:"theme",
   initialState:{
    theme:"light",
   },
    reducers:{
        Themechange :(state,action)=>{
            state.theme=action.payload.theme
        }
    }
},

)
 export const {Themechange} = Themeslice.actions
 export const ThemeReducer = Themeslice.reducer;
