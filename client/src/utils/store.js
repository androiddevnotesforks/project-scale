import { configureStore } from "@reduxjs/toolkit";

import ambitionsReducer from "../features/ambitions";

export default configureStore({
    reducer: ambitionsReducer
})