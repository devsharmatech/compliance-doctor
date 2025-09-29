import { createSlice } from "@reduxjs/toolkit"
import { clear } from "console"
import { RootState } from "../store"

const initialState = {
    isAuthenticated: false,
    user: null,
    token: null,
    loading: false,
    error: null,
    success: null,
    message: null,
}

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        clearAuth: (state) => {
            state.isAuthenticated = false
            state.user = null
            state.token = null
            state.loading = false
            state.error = null
            state.success = null
            state.message = null
        },
        setAuth: (state, action) => {
            state.isAuthenticated = true
            state.user = action.payload.user || null
            state.token = action.payload.token
            state.loading = false
            state.error = null
            state.success = null
            state.message = null
        },
    }
})
export const { clearAuth, setAuth } = authSlice.actions
export const authReducer = authSlice.reducer
export const selectAuth = (state:RootState) => state.auth