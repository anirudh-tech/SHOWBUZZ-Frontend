import { createSlice } from "@reduxjs/toolkit";
import { fetchUser, userLogin, userSignup, logout, updateUser } from "../../actions/userActions";
import { IUserSignupData } from "../../../interface/IUserSignup";
import { IUserLogin } from "../../../interface/IUserLogin";



const userSlice = createSlice({
    name: "userSlice",
    initialState: {
        user: null as IUserSignupData | null,
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
            state.user = action.payload as IUserLogin;
            state.error = null;
        })
        .addCase(updateUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })

    }
});
export const {makeErrorDisable} = userSlice.actions;
export default userSlice.reducer;