import { createAsyncThunk } from "@reduxjs/toolkit";
import { IMovie } from "../../interface/ITheatreMovie";
import { reduxRequest } from "../../config/api";
import { config } from "../../config/configuration";


export const addTheatreMovie = createAsyncThunk('movie/addTheatreMovie', async(formData: IMovie, {rejectWithValue}) => {
  return reduxRequest(
    "post",
    `/movie/addTheatreMovie`,
    config,
    rejectWithValue,
    formData
  )
})
export const editTheatreMovie = createAsyncThunk('movie/editTheatreMovie', async(formData: IMovie, {rejectWithValue}) => {
  return reduxRequest(
    "post",
    `/movie/editTheatreMovie`,
    config,
    rejectWithValue,
    formData
  )
})

export const selectMovies = createAsyncThunk('theatre/selectMovies', async(formData:any , {rejectWithValue}) => {
  return reduxRequest(
    "post",
    `/theatre/selectMovies`,
    config,
    rejectWithValue,
    formData,
  )
})

export const addScreen = createAsyncThunk('theatre/addScreens', async(inputValue: any, {rejectWithValue}) => {
  return reduxRequest(
    "post",
    `/theatre/addScreen`,
    config,
    rejectWithValue,
    inputValue,
  )
})
export const listTheatre = createAsyncThunk('theatre/theatreDetails', async(id: string | null, {rejectWithValue}) => {
  return reduxRequest(
    "get",
    `/theatre/theatreDetails/${id}`,
    config,
    rejectWithValue
  )
})
export const listAllTheatre = createAsyncThunk('theatre/AlltheatreDetails', async( _,{rejectWithValue}) => {
  return reduxRequest(
    "get",
    `/theatre/allTheatreDetails`,
    config,
    rejectWithValue
  )
})

export const setSeatLayout = createAsyncThunk('theatre/setSeatLayout', async(data: any, {rejectWithValue}) => {
  return reduxRequest(
    "post",
    `/theatre/setSeatLayout`,
    config,
    rejectWithValue,
    data
  )
})

export const getAllMovies = createAsyncThunk('movie/getAllMovies', async({page, limit}: any, {rejectWithValue}) => {
  return reduxRequest(
    "get",
    `/movie/getAllMovies?page=${page}&limit=${limit}`,
    config,
    rejectWithValue
  )
})

export const getAllUsers = createAsyncThunk('user/listUsers', async({page, limit}: any, {rejectWithValue}) => {
  return reduxRequest(
    "get",
    `/user/listUsers?page=${page}&limit=${limit}`,
    config,
    rejectWithValue
  )
})

export const getAllTheatres = createAsyncThunk('theatre/allTheatres', async({page, limit}: any, {rejectWithValue}) => {
  return reduxRequest(
    "get",
    `/theatre/allTheatres?page=${page}&limit=${limit}`,
    config,
    rejectWithValue
  )
})

export const getAllTickets = createAsyncThunk('payment/allTickets', async({page, limit}: any, {rejectWithValue}) => {
  return reduxRequest(
    "get",
    `/payment/allTickets?page=${page}&limit=${limit}`,
    config,
    rejectWithValue
  )
})

export const getAllTicketsInTheatres: any = createAsyncThunk('payment/getAllTicketsInTheatres', async({page, limit,id}: any, {rejectWithValue}) => {
  return reduxRequest(
    "get",
    `/payment/getAllTicketsInTheatres/${id}?page=${page}&limit=${limit}`,
    config,
    rejectWithValue
  )
})

export const updateUserStatus = createAsyncThunk('user/updateStatus', async (status: any | null , {rejectWithValue}) => {
  return reduxRequest(
    "post",
    `/user/updateStatus`,
    config,
    rejectWithValue,
    status
  )
})
export const updateTheatreStatus = createAsyncThunk('theatre/updateStatus', async (status: any | null , {rejectWithValue}) => {
  return reduxRequest(
    "post",
    `/theatre/updateStatus`,
    config,
    rejectWithValue,
    status
  )
})
export const deleteMovie = createAsyncThunk('movies/deleteMovie', async (status: any, {rejectWithValue}) => {
  return reduxRequest(
    "post",
    `/movie/deleteMovie`,
    config,
    rejectWithValue,
    status
  )
})