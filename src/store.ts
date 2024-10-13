import {combineSlices, configureStore} from '@reduxjs/toolkit'
import {memesSlice} from "./Slices/MemesSlice.ts";
import {tagsSlice} from "./Slices/TagsSlice.ts";
import {selectedTagsSlice} from "./Slices/SelectedTagsSlice.ts";

const rootReducer = combineSlices(memesSlice, tagsSlice, selectedTagsSlice)
export const store = configureStore({
    reducer: rootReducer
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch