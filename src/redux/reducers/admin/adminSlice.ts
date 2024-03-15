import { createSlice } from "@reduxjs/toolkit";
import { IMovie } from "../../../interface/ITheatreMovie";
import { addTheatreMovie } from "../../actions/adminActions";

const adminSlice = createSlice({
  name: "adminSlice",
  initialState: {
    theatre: null as IMovie | null,
    error: null as string | null,
    loading: false as boolean,
  },
  reducers: {
    makeErrorDisable: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(addTheatreMovie.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(addTheatreMovie.fulfilled, (state, action:any) => {
      state.theatre = action.payload as IMovie;
      state.loading = false;
      state.error = null;
    })
    .addCase(addTheatreMovie.rejected, (state, action ) => {
      state.loading = false;
      state.error = action.payload as string;
    })
  }
});

export const {makeErrorDisable} = adminSlice.actions;
export default adminSlice.reducer
