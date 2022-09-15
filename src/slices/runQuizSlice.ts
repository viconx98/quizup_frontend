import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SliceState } from "../types/slice";
import io from "socket.io-client"
import { Socket } from "socket.io-client"
import { Quiz } from "../types/myquizzes";

interface RunQuizState extends SliceState {
    quizId: string;
    quizRoom: QuizRoom | null
}

export interface QuizRoom {
    admin: string;
    adminSocketId: string;
    pin: number;
    quizId: string;
    players: any[];
    status: "waiting" | "playing" | "completed";
    quizRoom: Quiz;
    currentIndex: number;
}

const initialState: RunQuizState = {
    isLoading: true,
    loading: null,
    isError: false,
    error: null,
    quizId: "",
    quizRoom: null 
}

const runQuizSlice = createSlice({
    name: "runQuizSlice",
    initialState: initialState,
    reducers: {
        setQuizId(state, action: PayloadAction<string>) {
            state.quizId = action.payload
        },

        setQuizRoom(state, action: PayloadAction<QuizRoom>) {
            state.quizRoom = action.payload
        }
    }
})


export const runQuizActions = { ...runQuizSlice.actions }
export const runQuizAsyncActions = {}
export default runQuizSlice.reducer