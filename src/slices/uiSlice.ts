import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UiState {
    isDarkTheme: boolean
}

// TODO: Load preference from local storage
const initialState: UiState = {
    isDarkTheme: false
}

const uiSlice = createSlice({
    name: "uiSlice",
    initialState: initialState,
    reducers: {
        toggleDarkTheme(state, action: PayloadAction<void>) {
            state.isDarkTheme = !state.isDarkTheme
        }
    }
})


export const uiActions = {...uiSlice.actions}
export default uiSlice.reducer