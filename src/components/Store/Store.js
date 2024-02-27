import {configureStore} from '@reduxjs/toolkit'
import { ThemeReducer } from './Themeslice'

export const store =  configureStore({
    reducer:ThemeReducer,
})
