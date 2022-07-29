import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    ambitionId: "",
}

const ambitionsSlice = createSlice({
    name: "ambitions",
    initialState,
    reducers: {
        ADD_AMBITION_ID(state, action) {
            return {
                ...state,
                ambitionId: action.payload.ambitionId
            };
        }
    }
})

export const { ADD_AMBITION_ID } = ambitionsSlice.actions;

export default ambitionsSlice.reducer;