import {IMeme} from "../models/IMeme.ts";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axiosInstance from "../axios.ts";

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
    async () => {
        console.log("HEE")
        const res = await axiosInstance.get('http://memes.tmplr.keenetic.pro/api/Memes/GetList');
        console.log("RES", res)
        return await res.data
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