import { configureStore } from "@reduxjs/toolkit";
import postReducer from "@/app/redux/features/posts/postsSlice"
import userReducer from "@/app/redux/features/users/userSlice";

export const store = configureStore({
    reducer: {
        posts: postReducer,
        users: userReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch