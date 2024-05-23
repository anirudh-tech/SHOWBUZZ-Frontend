import { createSlice } from "@reduxjs/toolkit";
import { IMovie, ITheatre } from "../../../interface/ITheatreMovie";
import { addOttMovie, addScreen, addTheatreMovie, getAllMovies, getAllOttMovies, getAllTheatres, getAllTickets, getAllUsers, handleApproval, listAllTheatre, listTheatre, selectMovies } from "../../actions/adminActions";

const adminSlice : any = createSlice({
  name: "adminSlice",
  initialState: {
    theatres: null as ITheatre[] | null,
    theatreDetails: null as ITheatre | null,
    theatre: null as IMovie | null,
    movies: null as IMovie[] | null,
    tickets: null as any,
    ottMovies: null as IMovie[] | null,
    
    users: null as any,
    error: null as string | null,
    loading: false as boolean,
  },
  reducers: {
    makeErrorDisable: (state) => {
      state.error = null;
    },
    setTheatreDetails : (state,action) => {
      state.theatreDetails = action.payload
    }
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
    .addCase(listAllTheatre.fulfilled,(state, action) => {
      state.theatres =  action.payload as ITheatre[];
      state.loading = false;
    })
    .addCase(listAllTheatre.rejected,(state, action) => {
      state.error =  action.payload as string;
      state.loading = false;
    })
    .addCase(getAllMovies.pending,(state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(getAllMovies.fulfilled,(state, action) => {
      state.movies =  action.payload.movies as IMovie[];
      state.loading = false;
    })
    .addCase(getAllMovies.rejected,(state, action) => {
      state.error =  action.payload as string;
      state.loading = false;
    })
    .addCase(getAllUsers.pending,(state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(getAllUsers.fulfilled,(state, action) => {
      console.log("🚀 ~ file: adminSlice.ts:81 ~ .addCase ~ action:", action)
      state.users =  action.payload.users;
      state.loading = false;
    })
    .addCase(getAllUsers.rejected,(state, action) => {
      state.error =  action.payload as string;
      state.loading = false;
    })
    .addCase(getAllTheatres.pending,(state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(getAllTheatres.fulfilled,(state, action) => {
      console.log("🚀 ~ file: adminSlice.ts:81 ~ .addCase ~ action:", action)
      state.theatres =  action.payload.theatres;
      state.loading = false;
    })
    .addCase(getAllTheatres.rejected,(state, action) => {
      state.error =  action.payload as string;
      state.loading = false;
    })
    .addCase(handleApproval.pending,(state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(handleApproval.fulfilled,(state, action) => {
      console.log("🚀 ~ file: adminSlice.ts:81 ~ .addCase ~ action:", action)
      state.theatres =  action.payload.theatres;
      state.loading = false;
    })
    .addCase(handleApproval.rejected,(state, action) => {
      state.error =  action.payload as string;
      state.loading = false;
    })
    .addCase(getAllTickets.pending,(state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(getAllTickets.fulfilled,(state, action) => {
      console.log("🚀 ~ file: adminSlice.ts:81 ~ .addCase ~ action:", action)
      state.tickets =  action.payload.tickets;
      state.loading = false;
    })
    .addCase(getAllTickets.rejected,(state, action) => {
      state.error =  action.payload as string;
      state.loading = false;
    })
    .addCase(addOttMovie.pending,(state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(addOttMovie.fulfilled,(state, action) => {
      console.log("🚀 ~ file: adminSlice.ts:81 ~ .addCase ~ action:", action)
      state.ottMovies =  action.payload.movies;
      state.loading = false;
    })
    .addCase(addOttMovie.rejected,(state, action) => {
      state.error =  action.payload as string;
      state.loading = false;
    })
    .addCase(getAllOttMovies.pending,(state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(getAllOttMovies.fulfilled,(state, action) => {
      console.log("🚀 ~ file: adminSlice.ts:81 ~ .addCase ~ action:", action)
      state.ottMovies =  action.payload.movies;
      state.loading = false;
    })
    .addCase(getAllOttMovies.rejected,(state, action) => {
      state.error =  action.payload as string;
      state.loading = false;
    })
    
  }
});

export const {makeErrorDisable,setTheatreDetails} = adminSlice.actions;
export default adminSlice.reducer
