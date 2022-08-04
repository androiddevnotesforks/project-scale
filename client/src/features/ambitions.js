import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    ambitionId: "",
    category: "",
    identity: "",
    endValue: "",
    dailyPlan: "",
    public: false,
}

const ambitionsSlice = createSlice({
    name: "ambitions",
    initialState,
    reducers: {
        ADD_AMBITION_ID(state, action) {
            return {
                ...state,
                ambitionId: action.payload.ambitionId,
                category: action.payload.category,
                identity: action.payload.identity,
                endValue: action.payload.endValue,
                dailyPlan: action.payload.dailyPlan,
                public: action.payload.public,
            };
        }
    }
})

export const { ADD_AMBITION_ID } = ambitionsSlice.actions;

export default ambitionsSlice.reducer;