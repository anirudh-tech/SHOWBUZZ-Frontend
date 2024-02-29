import { createAsyncThunk } from "@reduxjs/toolkit";
import { IUserSignupData } from "../../interface/IUserSignup";
import axios, { AxiosError } from "axios";
import { baseUrl } from "../../config/constants";
import { ApiError, config, handleError } from "../../config/configuration";
import { IUserLogin } from "../../interface/IUserLogin";


export const userSignup = createAsyncThunk('user/userSignup', async (userCredentials: IUserSignupData, {rejectWithValue}) => {
    try{
        console.log("reached in userSignup reducer")
        const {data} = await axios.post(`${baseUrl}/auth/signup`,userCredentials,config)
        return data 
   }catch(err : any){
    const axiosError = err as AxiosError<ApiError>;
        return handleError(axiosError, rejectWithValue);
   }
})

export const userLogin = createAsyncThunk('user/userLogin',async (userCredentials: IUserLogin, {rejectWithValue}) => {
    try {
        console.log("reached in userLogin reducer")
        const {data} = await axios.post(`${baseUrl}/auth/login`,userCredentials,config)
        return data
    } catch (error: any) {
        const axiosError = error as AxiosError<ApiError>;
        return handleError(axiosError, rejectWithValue);
    }
})