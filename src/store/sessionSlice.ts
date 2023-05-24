import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export interface Verification {
    email: boolean
}

export interface User {
    email: string,
    firstName: string,
    lastName: string,
    role: string,
    verification: Verification,
    _id: string
}

export interface SessionState {
    token: string,
    user?: User
}

const initialState: SessionState = {
    token: "",
    user: undefined
}

export const SessionSlice = createSlice({
    name: "session",
    initialState,
    reducers: {
        login: ( state, action: PayloadAction< SessionState >)=> {
            state.token = action.payload.token;
            state.user = action.payload.user
        },
        
        logout: (state) =>{
            state.token = "";
            state.user = undefined
        }
    }
})

export default SessionSlice.reducer
export const { login, logout } = SessionSlice.actions