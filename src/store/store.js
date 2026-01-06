import { configureStore } from '@reduxjs/toolkit'
import detailReducer from '../slices/detailsSlice'

const store = configureStore({
    reducer: {
        details: detailReducer
    }
})

export default store