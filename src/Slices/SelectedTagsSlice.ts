import {ISelectOption} from "../models/ISelectOption.ts";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface SelectedTagsSlice {
    value: ISelectOption[]
}
const initialState: SelectedTagsSlice = {
    value: []
}
export const selectedTagsSlice = createSlice({
    name: 'selectTas',
    initialState,
    reducers: {
        setSelectedTags: (state, action: PayloadAction<ISelectOption[]>) => {
            state.selectedTags = action.payload
        }
    },
    selectors: {
        selectTags: state => state.value
    }
})
export const {setSelectedTags} = selectedTagsSlice.actions;
export const {selectTags} = selectedTagsSlice.selectors