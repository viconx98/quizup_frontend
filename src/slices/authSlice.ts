import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosClient, { Endpoints } from "../axios_config";
import { SigninData, SignupData, TokenData, User } from "../types/auth";
import { SliceState } from "../types/slice";

interface AuthState extends SliceState {
    user: TokenData | null
    authComplete: boolean,
}

const initialUser: TokenData = JSON.parse(localStorage.getItem("user")!)

const initialState: AuthState = {
    user: initialUser,
    authComplete: initialUser !== null,
    isLoading: false,
    loading: null,
    isError: false,
    error: null
}

const signup = createAsyncThunk(
    "authSlice/signup",
    async (signupData: SignupData) => {
        const response = await axiosClient.post(Endpoints.Signup, signupData)

        return response.data as TokenData
    }
)

const signin = createAsyncThunk(
    "authSlice/signin",
    async (signinData: SigninData) => {
        const response = await axiosClient.post(Endpoints.Signin, signinData)

        return response.data as TokenData
    }
)

const logout = createAsyncThunk(
    "authSlice/logout",
    () => {
        localStorage.removeItem("user")
        return true
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
    extraReducers: (builder) => {
        builder.addCase(signup.pending, (state, action) => {
            state.isLoading = true
        }).addCase(signup.fulfilled, (state, action: PayloadAction<TokenData>) => {
            state.isLoading = false
            state.loading = null
            state.isError = false
            state.error = null

            localStorage.setItem("user", JSON.stringify(action.payload))

            state.user = action.payload
            state.authComplete = true
        }).addCase(signup.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true

            state.error = action.error.message!
        })

        builder.addCase(signin.pending, (state, action) => {
            state.isLoading = true
        }).addCase(signin.fulfilled, (state, action: PayloadAction<TokenData>) => {
            state.isLoading = false
            state.loading = null
            state.isError = false
            state.error = null

            localStorage.setItem("user", JSON.stringify(action.payload))

            state.user = action.payload
            state.authComplete = true
        }).addCase(signin.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true

            state.error = action.error.message!
        })

        builder.addCase(logout.pending, (state, action) => {
            state.isLoading = true
        }).addCase(logout.fulfilled, (state, action) => {
            state.isLoading = false
            state.loading = null
            state.isError = false
            state.error = null
            state.user = null
            state.authComplete = false

        }).addCase(logout.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true

            state.error = action.error.message!
        })
    }
})


export const authActions = { ...authSlice.actions }
export const authAsyncActions = { signup, signin, logout }
export default authSlice.reducer