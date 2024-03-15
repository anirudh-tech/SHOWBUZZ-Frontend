import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from './reducers/user/userSlice'
import adminReducer from './reducers/admin/adminSlice'
import { useDispatch } from "react-redux";

export const useAppDispatch = () => useDispatch<AppDispatch>();

export type AppDispatch = typeof store.dispatch;

const reducer = combineReducers({
    user: userReducer,
    admin:adminReducer
})

export const store = configureStore({
    reducer: reducer
})