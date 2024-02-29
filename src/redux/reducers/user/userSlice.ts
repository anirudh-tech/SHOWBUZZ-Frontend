import { createSlice } from "@reduxjs/toolkit";
import { userSignup } from "../../actions/userActions";
import { IUserSignupData } from "../../../interface/IUserSignup";



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
          logout: (state) => {
            state.user = null;
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
    }
});
export const {makeErrorDisable, logout} = userSlice.actions;
export default userSlice.reducer;