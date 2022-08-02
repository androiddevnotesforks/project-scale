import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    ambitionId: "",
    identity: "",
    endValue: "",
    dailyPlan: "",
    weight: "kg",
    money: "dollars",
    hobby: "minutes",
    enigma: "units",
}

const ambitionsSlice = createSlice({
    name: "ambitions",
    initialState,
    reducers: {
        ADD_AMBITION_ID(state, action) {
            return {
                ...state,
                ambitionId: action.payload.ambitionId,
                identity: action.payload.identity,
                endValue: action.payload.endValue,
                dailyPlan: action.payload.dailyPlan,
            };
        }
    }
})

export const { ADD_AMBITION_ID } = ambitionsSlice.actions;

export default ambitionsSlice.reducer;