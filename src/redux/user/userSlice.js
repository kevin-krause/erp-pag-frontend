import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    currentUser: null,
    error: null,
    loading: false
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signinStart: state => {
            state.loading = true
        },
        signinSuccess: (state, action) => {
            state.loading = false
            state.error = null
            state.currentUser = action.payload
        },
        signinFailure: (state, action) => {
            state.loading = false
            state.error = null
            state.error = action.payload
        }
    }
})

export const { signinStart, signinSuccess, signinFailure } = userSlice.actions
export default userSlice.reducer
