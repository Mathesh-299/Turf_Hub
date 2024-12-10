import { configureStore } from "@reduxjs/toolkit";
import useReducer from "./Slice";

export default configureStore({
    reducer: {
        admin:useReducer,
    },
})