import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UiState {
    isDarkTheme: boolean;
    currentTab: string;
}

const preference = localStorage.getItem("theme")
const prefersDark = preference !== null && preference === "dark"

// TODO: Load preference from local storage
const initialState: UiState = {
    isDarkTheme: prefersDark,
    currentTab: "myquizzes"
}

const uiSlice = createSlice({
    name: "uiSlice",
    initialState: initialState,
    reducers: {
        toggleDarkTheme(state, action: PayloadAction<void>) {
            state.isDarkTheme = !state.isDarkTheme

            localStorage.setItem("theme", state.isDarkTheme ? "dark" : "light")
        },
        setTab(state, action: PayloadAction<string>) {
            state.currentTab = action.payload
        }
    }
})


export const uiActions = { ...uiSlice.actions }
export default uiSlice.reducer