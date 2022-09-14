import { createSlice } from "@reduxjs/toolkit";
import { Quiz } from "../types/myquizzes";
import { SliceState } from "../types/slice";

interface MyQuizzesState extends SliceState {
    quizzes: Quiz[]
}

const initialState: MyQuizzesState = {
    isLoading: false,
    loading: null,
    isError: false,
    error: null,
    quizzes: []
}

const myQuizzesSlice = createSlice({
    name: "myQuizzesSlice",
    initialState: initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        
    }
})

export const myQuizzesActions = { ...myQuizzesSlice.actions }
export const myQuizzesAsyncActions = {}
export default myQuizzesSlice.reducer