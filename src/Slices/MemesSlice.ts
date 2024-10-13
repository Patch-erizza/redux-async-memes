import {IMeme} from "../models/IMeme.ts";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axiosInstance from "../axios.ts";
import {ISelectOption} from "../models/ISelectOption.ts";

export interface MemesSliceState {
    value: IMeme[],
    isLoading: boolean,
    errorMessage: string | null,
}
const initialState: MemesSliceState = {
    value: [],
    isLoading: false,
    errorMessage: null,
}
export const fetchMemes = createAsyncThunk(
    'memes/fetchMemes',
    async (selectedTags: ISelectOption[]) => {
        // const res = await axiosInstance.get('http://192.168.1.42:5678/api/Memes/GetList');
        // https://memes.tmplr.keenetic.pro/api/Memes/SearchByTagsIds?TagsIds=636&TagsIds=637
        const tagsIds = selectedTags.map((tag) => tag.value);
        const urlStr = tagsIds.map((tagId) => 'TagsIds=' + tagId)
        const res = await axiosInstance.get('http://192.168.1.42:5678/api/Memes/SearchByTagsIds?' + urlStr.join('&'));
        return res.data
    }
)

export const memesSlice = createSlice({
    name: 'memes',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchMemes.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(fetchMemes.fulfilled, (state, action) => {
            state.isLoading = false
            state.value = action.payload
        })
        builder.addCase(fetchMemes.rejected, (state, action) => {
            state.isLoading = false
            state.errorMessage = action.error.message || null
        })
    }
})

export default memesSlice.reducer