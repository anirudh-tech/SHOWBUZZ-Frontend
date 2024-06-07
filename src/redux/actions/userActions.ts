import { createAsyncThunk } from "@reduxjs/toolkit";
import { IUserSignupData } from "../../interface/IUserSignup";
import axios, { AxiosError } from "axios";
import { baseUrl } from "../../config/constants";
import { ApiError, config, handleError } from "../../config/configuration";
import { IUserLogin } from "../../interface/IUserLogin";
import { reduxRequest } from "../../config/api";


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

export const listUser = createAsyncThunk("user/listUser", async (id : any, {rejectWithValue}) => {
    try {
        const {data} = await axios.get(`${baseUrl}/user/listUser/${id}`,config)
        console.log("🚀 ~ file: userActions.ts:54 ~ listUser ~ data.data:", data.data)
        return data.data
    } catch (err) {
        const axiosError = err as AxiosError<ApiError>;
        return handleError(axiosError, rejectWithValue);
    }
})
export const updateUser = createAsyncThunk("user/updateUser", async (userCredentials : any, {rejectWithValue}) => {
    try {
        const {data} = await axios.post(`${baseUrl}/user/updateUser`,userCredentials,config)
        return data.user
    } catch (err) {
        const axiosError = err as AxiosError<ApiError>;
        return handleError(axiosError, rejectWithValue);
    }
})

export const createGroup = createAsyncThunk('chat/createGroup', async (body: any | null , {rejectWithValue}) => {
    return reduxRequest(
      "post",
      `/chat/chat/createGroup`,
      config,
      rejectWithValue,
      body
    )
  })

export const listGroups = createAsyncThunk('chat/listGroups', async (_ , {rejectWithValue}) => {
    return reduxRequest(
      "get",
      `/chat/chat/listGroups`,
      config,
      rejectWithValue,
    )
  })

export const joinGroup = createAsyncThunk('chat/joinGroup', async (body: any , {rejectWithValue}) => {
    return reduxRequest(
      "put",
      `/chat/chat/joinGroup`,
      config,
      rejectWithValue,
      body
    )
  })

export const getMessage = createAsyncThunk('chat/getMessage', async (groupId: any , {rejectWithValue}) => {
    return reduxRequest(
      "post",
      `/chat/chat/getMessage`,
      config,
      rejectWithValue,
      groupId
    )
  })

export const listMessages = createAsyncThunk('chat/listMessages', async (chatId: any , {rejectWithValue}) => {
    return reduxRequest(
      "get",
      `/chat/chat/listMessages/${chatId}`,
      config,
      rejectWithValue,
    )
  })

export const sendMessage = createAsyncThunk('chat/sendMessage', async (body: any , {rejectWithValue}) => {
    return reduxRequest(
      "post",
      `/chat/chat/send-message`,
      config,
      rejectWithValue,
      body
    )
  })

  export const getMovieData = createAsyncThunk('/movie/getMovieData', async(id: any, {rejectWithValue}) => {
    return reduxRequest(
      "get",
      `/movie/getMovieData/${id}`,
      config,
      rejectWithValue
    )
  })

export const logout = createAsyncThunk("user/logout", async () => {
    try {
        const response = await axios.get(`${baseUrl}/auth/logout`,{withCredentials: true});
        return response
    } catch (error: any) {
        throw new Error(error.message)
    }
})