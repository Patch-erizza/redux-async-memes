import {ITag} from "../models/ITag.ts";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axiosInstance from "../axios.ts";

export interface TagsSliceState {
    value: ITag[],
    isLoading: boolean,
    errorMessage: string | null,
}
const initialState: TagsSliceState = {
    value: [],
    isLoading: false,
    errorMessage: null,
}
export const fetchTags = createAsyncThunk(
    'memes/fetchTags',
    async () => {
        const res = await axiosInstance.get('http://192.168.1.42:5678/api/Tags/GetList');
        return await res.data
    }
)

export const tagsSlice = createSlice({
    name: 'tags',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchTags.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(fetchTags.fulfilled, (state, action) => {
            state.isLoading = false
            state.value = action.payload
        })
        builder.addCase(fetchTags.rejected, (state, action) => {
            state.isLoading = false
            state.errorMessage = action.error.message || null
        })
    }
})
export default tagsSlice.reducer