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