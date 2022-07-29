import { combineReducers, configureStore } from "@reduxjs/toolkit";

// import reducers...
import eventsReducer from "../features/events";
import ambitionsReducer from "../features/ambitions";
// combine the reducers...
const rootReducer = combineReducers({
    events: eventsReducer,
    ambitions: ambitionsReducer,
})

export default configureStore({
    reducer: rootReducer
})