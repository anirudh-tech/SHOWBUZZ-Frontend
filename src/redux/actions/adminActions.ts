import { createAsyncThunk } from "@reduxjs/toolkit";
import { IMovie } from "../../interface/ITheatreMovie";
import { reduxRequest } from "../../config/api";
import { config } from "../../config/configuration";


export const addTheatreMovie = createAsyncThunk('movie/addTheatreMovie', async(formData: IMovie, {rejectWithValue}) => {
  return reduxRequest(
    "post",
    `/movie/addTheatreMovie`,
    formData,
    config,
    rejectWithValue
  )
})