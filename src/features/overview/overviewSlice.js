import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    value: {
        utilization: {},
        performance: {
            months: [],
            values: []
        },
    }
}


export const overviewSlice = createSlice({
    name: "overview",
    initialState,
    reducers: {
        getOverview: (state, action) => {
            state.value.utilization = action.data.utilization
        }
    }
})

const overviewReducer = overviewSlice.reducer

export const { getOverview } = overviewSlice.actions

export default overviewReducer