import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SliceState } from "../types/slice";

type Status = "join" | "waiting" | "playing" | "completed"
 

interface PlayQuizState extends SliceState {
    status: Status,
    data: any
}

// TODO: Load preference from local storage
const initialState: PlayQuizState = {
    isLoading: false,
    loading: null,
    isError: false,
    error: null,
    status: "join",
    data: null
}

const playQuizSlice = createSlice({
    name: "playQuizSlice",
    initialState: initialState,
    reducers: {
        setStatus(state, action: PayloadAction<Status>) {
            state.status = action.payload
        },
        setData(state, action) {
            state.data = action.payload
        }
    }
})


export const playQuizActions = {...playQuizSlice.actions}
export default playQuizSlice.reducer