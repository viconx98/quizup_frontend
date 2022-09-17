import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SliceState } from "../types/slice";

type Status = "join" | "waiting" | "playing" | "completed"

// {"question":{"question":"Is react fun?","correctAnswer":"Negative","options":["No","Nope","Nah","Negative"],"questionType":"choice","_id":"6322ef1964895ae81a6598da"}}

interface PlayQuizState extends SliceState {
    status: Status;
    socketConnected: boolean;
    data: any;
    question: any;
    completedQuiz: any;
    disableAnswers: boolean;
    pickedAnswer: string;
}

// TODO: Load preference from local storage
const initialState: PlayQuizState = {
    isLoading: false,
    loading: null,
    isError: false,
    error: null,
    status: "join",
    data: null,
    question: null,
    socketConnected: false,
    completedQuiz: null,
    disableAnswers: false,
    pickedAnswer: ""
}

const playQuizSlice = createSlice({
    name: "playQuizSlice",
    initialState: initialState,
    reducers: {
        setStatus(state, action: PayloadAction<Status>) {
            state.status = action.payload
        },
        setSocketConnected(state, action: PayloadAction<boolean>) {
            state.socketConnected = action.payload
        },
        setCompletedQuiz(state, action) {
            state.completedQuiz = action.payload
        },
        setData(state, action) {
            state.data = action.payload
        },
        setQuestion(state, action) {
            state.question = action.payload
        },
        setDisableAnswers(state, action: PayloadAction<boolean>) {
            state.disableAnswers = action.payload
        },
        setPickedAnswer(staet, action: PayloadAction<string>) {
            staet.pickedAnswer = action.payload
        }
    }
})


export const playQuizActions = {...playQuizSlice.actions}
export default playQuizSlice.reducer