import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { stat } from "fs";
import axiosClient, { Endpoints } from "../axios_config";
import { Quiz } from "../types/myquizzes";
import { SliceState } from "../types/slice";
import { myQuizzesActions } from "./myQuizzesSlice";

interface ManageQuizState extends SliceState {
    shouldShowAdd: boolean;
    shouldShowDelete: boolean;
    quizToDelete: string
}

const initialState: ManageQuizState = {
    isLoading: false,
    loading: null,
    isError: false,
    error: null,
    shouldShowAdd: false,
    shouldShowDelete: false,
    quizToDelete: ""
}

const addQuiz = createAsyncThunk(
    "manageQuizSlice/addQuiz",
    async (title: string, { dispatch }) => {
        const response = await axiosClient.post(Endpoints.AddQuiz, { title })

        // Keep the ui in sync
        dispatch(myQuizzesActions.addQuiz(response.data))

        return response.data as Quiz
    }
)

const deleteQuiz = createAsyncThunk(
    "manageQuizSlice/deleteQuiz",
    async (quizId: string, { dispatch }) => {
        const response = await axiosClient.post(Endpoints.DeleteQuiz, { quizId })

        // Keep the ui in sync
        dispatch(myQuizzesActions.deleteQuiz(quizId))

        return response.data
    }
) 

const manageQuizSlice = createSlice({
    name: "manageQuizSlice",
    initialState: initialState,
    reducers: {
        setShouldShowAdd(state, action: PayloadAction<boolean>) {
            state.shouldShowAdd = action.payload
        },
        setShouldShowDelete(state, action: PayloadAction<boolean>) {
            state.shouldShowDelete = action.payload
        },
        setQuizToDelete(state, action: PayloadAction<string>) {
            state.quizToDelete = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(addQuiz.pending, (state, action) => {
            state.isLoading = true
        }).addCase(addQuiz.fulfilled, (state, action) => {
            state.isLoading = false
            state.isError = false

            state.shouldShowAdd = false
        }).addCase(addQuiz.rejected, (state, action) => {
            state.isError = true
            state.error = action.error.message!
        })

        builder.addCase(deleteQuiz.pending, (state, action) => {
            state.isLoading = true
        }).addCase(deleteQuiz.fulfilled, (state, action) => {
            state.isLoading = false
            state.isError = false

            state.shouldShowDelete = false
        }).addCase(deleteQuiz.rejected, (state, action) => {
            state.isError = true
            state.error = action.error.message!
        })
    }
})



export const manageQuizActions = { ...manageQuizSlice.actions }
export const manageQuizAsyncActions = { addQuiz, deleteQuiz }
export default manageQuizSlice.reducer