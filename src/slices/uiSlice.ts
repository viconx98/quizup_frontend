import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UiState {
    isDarkTheme: boolean;
    currentTab: string;
}

// TODO: Load preference from local storage
const initialState: UiState = {
    isDarkTheme: true,
    currentTab: "myquizzes"
}

const uiSlice = createSlice({
    name: "uiSlice",
    initialState: initialState,
    reducers: {
        toggleDarkTheme(state, action: PayloadAction<void>) {
            state.isDarkTheme = !state.isDarkTheme
        },
        setTab(state, action: PayloadAction<string>){
            state.currentTab = action.payload
        }
    }
})


export const uiActions = {...uiSlice.actions}
export default uiSlice.reducer