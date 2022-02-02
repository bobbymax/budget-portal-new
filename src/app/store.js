import { configureStore } from "@reduxjs/toolkit"
import userReducer from "../features/auth/userSlice"
import configReducer from "../features/config/configSlice"
import overviewReducer from "../features/overview/overviewSlice"

export const store = configureStore({
    reducer: {
        auth: userReducer,
        config: configReducer,
        overview: overviewReducer
    },
})