import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import uiReducer from "./slices/uiSlice";
import myQuizzesReducer from "./slices/myQuizzesSlice";

const mainStore = configureStore({
    reducer: {
        ui: uiReducer,
        auth: authReducer,
        myQuizzes: myQuizzesReducer
    }
})

export type RootState = ReturnType<typeof mainStore.getState>
export type AppDispatch = typeof mainStore.dispatch

export default mainStore