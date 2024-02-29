import { configureStore } from "@reduxjs/toolkit";
import userReducer from './reducers/user/userSlice'
import { useDispatch } from "react-redux";

export const useAppDispatch = () => useDispatch<AppDispatch>();

export type AppDispatch = typeof store.dispatch;

export const store = configureStore({
    reducer:{
        user: userReducer,
    }
})