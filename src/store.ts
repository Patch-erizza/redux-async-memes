import {combineSlices, configureStore} from '@reduxjs/toolkit'
import {memesSlice} from "./Slices/MemesSlice.ts";

const rootReducer = combineSlices(memesSlice)
export const store = configureStore({
    reducer: rootReducer
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch