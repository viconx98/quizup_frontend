import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosClient, { Endpoints } from "../axios_config";
import { Quiz } from "../types/myquizzes";
import { SliceState } from "../types/slice";

interface EditQuizState extends SliceState {
    quizId: string | null
    quiz: Quiz | null
}

const initialState: EditQuizState = {
    isLoading: false,
    isError: false,
    loading: "",
    error: "",
    quizId: null,
    quiz: null
} 

const loadQuiz = createAsyncThunk(
    "editQuizSlice/loadQuiz",
    async (quizId: string) => {
        const response = await axiosClient.get(Endpoints.Quiz + quizId)

        return response.data as Quiz
    }
)

const editQuizSlice = createSlice({
    name: "editQuizSlice",
    initialState: initialState,
    reducers: {
        setQuizId(state, action: PayloadAction<string>) {
            state.quizId = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loadQuiz.pending, (state, action) => {
            state.isLoading = true
        }).addCase(loadQuiz.fulfilled, (state, action) => {
            state.isLoading = false
            state.isError = false
            state.quiz = action.payload
        }).addCase(loadQuiz.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            
            state.error = action.error.message!
        })
    }
})

export const editQuizActions = { ...editQuizSlice.actions }
export const editQuizAsyncActions = {loadQuiz}
export default editQuizSlice.reducer