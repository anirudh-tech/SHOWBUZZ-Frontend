import { createAsyncThunk } from "@reduxjs/toolkit";
import { IUserSignupData } from "../../interface/IUserSignup";
import axios, { AxiosError } from "axios";
import { baseUrl } from "../../config/constants";
import { ApiError, config, handleError } from "../../config/configuration";


export const userSignup = createAsyncThunk('user/userSignup', async (userCredentials: IUserSignupData, {rejectWithValue}) => {
    try{
        console.log("reached in reducer")
        const {data} = await axios.post(`${baseUrl}/auth/signup`,userCredentials,config)
        return data 
   }catch(err : any){
    const axiosError = err as AxiosError<ApiError>;
        return handleError(axiosError, rejectWithValue);
   }
})