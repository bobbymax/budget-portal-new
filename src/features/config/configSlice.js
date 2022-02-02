import { createSlice } from "@reduxjs/toolkit"
import { formatConfig } from "../../services/utils/helpers"

const initialState = {
    value: []
}

export const configSlice = createSlice({
    name: "config",
    initialState,
    reducers: {
        fetchSiteConfig: (state, action) => {
            state.value = formatConfig(action.payload.data)
        }
    }
})

export const { fetchSiteConfig } = configSlice.actions

export default configSlice.reducer