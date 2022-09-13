import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../types/auth";
import { SliceState } from "../types/slice";

interface AuthState extends SliceState {
    user: User | null
    authComplete: boolean,
}

const initialState: AuthState = {
    user: null,
    authComplete: false,
    isLoading: false,
    loading: null,
    isError: false,
    error: null
}

const signup = createAsyncThunk(
    "authSlice/signup",
    async () => {

    }
)

const authSlice = createSlice({
    name: "authSlice",
    initialState: initialState,
    reducers: {
        setError(state, action: PayloadAction<Array<any>>) {
            state.isError = action.payload[0]
            state.error = action.payload[1]
        }
    },
    extraReducers: {

    }
})


export const authActions = { ...authSlice.actions }
export const authAsyncActions = {}
export default authSlice.reducer