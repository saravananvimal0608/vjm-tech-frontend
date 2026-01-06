import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { getApi, postApi, deleteApi } from '../common/common'

export const fetchDetails = createAsyncThunk(
    "details/fetchDetails",
    async (_, thunkAPI) => {
        try {
            const res = await getApi("/details/get")
            return res.data.details
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || "api fetching error")
        }
    }
)

export const addDetails = createAsyncThunk(
    "add/addDetails",
    async (values, thunkAPI) => {
        try {
            const res = await postApi("/details/create", values)
            return res.data.details
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || "api fetching error")
        }
    }
)

export const deleteDetails = createAsyncThunk(
    'delete/deleteDetails',
    async (id, thunkAPI) => {
        try {
            const res = await deleteApi(`/details/delete/${id}`)
            return res.data.details
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || "api fetching error")
        }
    }
)

export const allData = createAsyncThunk(
    "alldata/getAllData",
    async (_, thunkAPI) => {
        try {
            const res = await getApi(`/details/getAll`)
            return res.data.details
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || "api fetching error")
        }
    }
)

const detailsSlice = createSlice({
    name: "details",
    initialState: {
        datas: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            //fetch details
            .addCase(fetchDetails.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchDetails.fulfilled, (state, action) => {
                state.loading = false
                state.datas = action.payload
            })
            .addCase(fetchDetails.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })

            // add details
            .addCase(addDetails.pending, (state) => {
                state.loading = true
            })
            .addCase(addDetails.fulfilled, (state, action) => {
                state.loading = false
                state.datas.push(action.payload)
            })
            .addCase(addDetails.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })

            // Get all details
            .addCase(allData.pending, (state) => {
                state.loading = true
            })
            .addCase(allData.fulfilled, (state, action) => {
                state.loading = false
                state.datas = action.payload
            })
            .addCase(allData.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    }
})

export default detailsSlice.reducer