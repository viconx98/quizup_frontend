import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { stat } from "fs";
import axiosClient, { Endpoints } from "../axios_config";
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

const fetchQuizzes = createAsyncThunk(
    "myQuizzesSlice/fetchQuizzes",
    async () => {
        const response = await axiosClient.get(Endpoints.GetQuizzes)

        return response.data as Quiz[]
    }
)

const myQuizzesSlice = createSlice({
    name: "myQuizzesSlice",
    initialState: initialState,
    reducers: {
        addQuiz(state, action: PayloadAction<Quiz>) {
            state.quizzes.push(action.payload)
        },
        deleteQuiz(state, action: PayloadAction<string>) {
            state.quizzes = state.quizzes.filter(quiz => quiz._id !== action.payload)
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchQuizzes.pending, (state, action) => {
            state.isLoading = true
            
        }).addCase(fetchQuizzes.fulfilled, (state, action: PayloadAction<Quiz[]>) => {
            state.isLoading = false
            state.isError = false
            state.error = null

            state.quizzes = action.payload
        }).addCase(fetchQuizzes.rejected, (state, action) => {
            state.isError = true
            state.error = action.error.message!
        })
    }
})

export const myQuizzesActions = { ...myQuizzesSlice.actions }
export const myQuizzesAsyncActions = {fetchQuizzes}
export default myQuizzesSlice.reducer