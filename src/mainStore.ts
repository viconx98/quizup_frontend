import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import uiReducer from "./slices/uiSlice";
import myQuizzesReducer from "./slices/myQuizzesSlice";
import manageQuizReducer from "./slices/manageQuizSlice";
import editQuizReducer from "./slices/editQuizSlice";
import runQuizReducer from "./slices/runQuizSlice";
import playQuizReducer from "./slices/playQuizSlice";

const mainStore = configureStore({
    reducer: {
        ui: uiReducer,
        auth: authReducer,
        myQuizzes: myQuizzesReducer,
        manageQuiz: manageQuizReducer,
        editQuiz: editQuizReducer,
        runQuiz: runQuizReducer,
        playQuiz: playQuizReducer
    }
})

export type RootState = ReturnType<typeof mainStore.getState>
export type AppDispatch = typeof mainStore.dispatch

export default mainStore