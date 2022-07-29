import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    dataInput: "",
    notes: "",
};

const eventSlice = createSlice({
    name: "events",
    initialState,
    reducers: {
        ADD_EVENT(state, action) {
            // console.log(action);
            return {
                ...state,
                dataInput: action.payload.dataInput,
                notes: action.payload.notes,
            };
        }
    }
})

export const { ADD_EVENT } = eventSlice.actions;

export default eventSlice.reducer;