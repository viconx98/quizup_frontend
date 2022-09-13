import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";

const mainStore = configureStore({
    reducer: {
        auth: authReducer
    }
})

export type RootState = ReturnType<typeof mainStore.getState>
export type AppDispatch = typeof mainStore.dispatch

export default mainStore