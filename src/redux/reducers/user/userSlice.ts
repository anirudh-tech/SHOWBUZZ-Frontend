import { createSlice } from "@reduxjs/toolkit";
import {
  fetchUser,
  userLogin,
  userSignup,
  logout,
  updateUser,
  listUser,
  createGroup,
  listGroups,
  getMessage,
  joinGroup,
  getMovieData,
} from "../../actions/userActions";
import { IUserSignupData } from "../../../interface/IUserSignup";
import { IUserLogin } from "../../../interface/IUserLogin";
import { IMovie } from "../../../interface/ITheatreMovie";

const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    user: null as IUserSignupData | null,
    error: null as string | null,
    loading: false as boolean,
    userDetails: null as IUserSignupData | null,
    groups: null as any | null,
    messages: null as any | null,
    ottMovie: null as IMovie | null,
  },
  reducers: {
    makeErrorDisable: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userSignup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userSignup.fulfilled, (state, action: any) => {
        state.loading = false;
        state.user = action.payload as IUserSignupData;
        state.error = null;
      })
      .addCase(userSignup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userLogin.fulfilled, (state, action: any) => {
        state.loading = false;
        state.user = action.payload as IUserLogin;
        state.error = null;
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload as IUserLogin;
        state.error = null;
      })
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.loading = false;
        state.error = null;
      })
      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action: any) => {
        state.loading = false;
        state.userDetails = action.payload as IUserLogin;
        state.error = null;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(listUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(listUser.fulfilled, (state, action: any) => {
        state.loading = false;
        state.userDetails = action.payload as IUserLogin;
        state.error = null;
      })
      .addCase(listUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createGroup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createGroup.fulfilled, (state, action: any) => {
        state.loading = false;
        state.groups = action.payload as string[];
        state.error = null;
      })
      .addCase(createGroup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(listGroups.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(listGroups.fulfilled, (state, action: any) => {
        state.loading = false;
        state.groups = action.payload as any;
        state.error = null;
      })
      .addCase(listGroups.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMessage.fulfilled, (state, action: any) => {
        state.loading = false;
        state.messages = action.payload as any;
        state.error = null;
      })
      .addCase(getMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(joinGroup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(joinGroup.fulfilled, (state, action: any) => {
        state.loading = false;
        state.groups = action.payload as any;
        state.error = null;
      })
      .addCase(joinGroup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getMovieData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMovieData.fulfilled, (state, action) => {
        console.log("🚀 ~ file: adminSlice.ts:81 ~ .addCase ~ action:", action);
        state.ottMovie = action.payload.movies;
        state.loading = false;
      })
      .addCase(getMovieData.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      });
  },
});
export const { makeErrorDisable } = userSlice.actions;
export default userSlice.reducer;
