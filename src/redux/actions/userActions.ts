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
        return data.user
   }catch(err : any){
    const axiosError = err as AxiosError<ApiError>;
        return handleError(axiosError, rejectWithValue);
   }
})

export const userLogin = createAsyncThunk('user/userLogin',async (userCredentials: IUserLogin, {rejectWithValue}) => {
    try {
        console.log("reached in userLogin reducer")
        const {data} = await axios.post(`${baseUrl}/auth/login`,userCredentials,config)
        return data.user
    } catch (error: any) {
        const axiosError = error as AxiosError<ApiError>;
        return handleError(axiosError, rejectWithValue);
    }
})

export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
    try {
        const response = await axios.get(`${baseUrl}/auth/isExist`, { withCredentials: true });
        console.log(response,'=-=-==--=-=-=-==--=-=--==--=')
        if (response.data.status === "ok") {
            return response.data.data;
        } else {
            throw new Error(response.data?.message);
        }
    } catch (error:any) {
        throw new Error(error?.message);
    }

})