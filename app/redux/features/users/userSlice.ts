import { RootState } from "@/app/store";
import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    { id: '0', name: "Dude Lebowski" },
    { id: '1', name: "Neil Young" },
    { id: '2', name: "Dave Gray" },
]

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {}
})

export const selectAllUsers = (state: RootState) => state.users

export default userSlice.reducer
