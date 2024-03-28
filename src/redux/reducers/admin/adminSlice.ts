import { createSlice } from "@reduxjs/toolkit";
import { IMovie, ITheatre } from "../../../interface/ITheatreMovie";
import { addScreen, addTheatreMovie, listTheatre, selectMovies } from "../../actions/adminActions";

const adminSlice = createSlice({
  name: "adminSlice",
  initialState: {
    theatreDetails: null as ITheatre | null,
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
    .addCase(selectMovies.rejected, (state, action) => {
      console.log(action.payload,'---error from action.payload');
      state.error = action.payload as string;
    })
    .addCase(addScreen.fulfilled, (state, action) => {
      state.loading = false;
      state.theatreDetails = action.payload as ITheatre;
    })
    .addCase(addScreen.rejected, (state, action) => {
      console.log(action.payload,'action payload')
      state.loading = false;
      state.error = action.payload as string;
    })
    .addCase(listTheatre.fulfilled, (state, action) => {
      state.loading = false;
      state.theatreDetails = action.payload as ITheatre;
    })
  }
});

export const {makeErrorDisable} = adminSlice.actions;
export default adminSlice.reducer
