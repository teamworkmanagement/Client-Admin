import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authApi from "src/api/authApi";

export const login = createAsyncThunk("auth/login", async (payload, { rejectWithValue }) => {
  try {
    const data = await authApi.login(payload);
    return data.data;
  }
  catch (err) {
    return rejectWithValue(err);
  }

});

export const islogin = createAsyncThunk("auth/isLogin", async () => {
  const data = await authApi.isLogin();
  console.log("data redux là: ", data);
  return data;
});

const authSlice = createSlice(
  {
    name: 'user',
    initialState: {
      currentUser: {},
      loginStatus: false,
    },
    reducers:
    {
      setAuth: (state) => {
        state.loginStatus = !state.loginStatus;
      },
      setAuthF: (state) => {
        state.loginStatus = false;
      },
      setValueAuth: (state, action) => {
        state.loginStatus = action.payload;
      },
    },

    extraReducers: {
      [login.rejected]: (state, action) => { },
      [login.fulfilled]: (state, action) => {
        const { id, fullName, email, userAvatar, userDob, userPhoneNumber, firstTimeSocial, userAddress, userDescription, userGithubLink, userFacebookLink } = action.payload;
        state.currentUser = { id, fullName, email, userAvatar, userDob, userPhoneNumber, firstTimeSocial, userAddress, userDescription, userGithubLink, userFacebookLink };
        state.loginStatus = true;
      },
      [islogin.fulfilled]: (state, action) => {
        state.loginStatus = action.payload.data === "UnAuth" ? false : true;
      },
      [islogin.rejected]: (state, action) => { },
    },
  }
);

const { actions, reducer } = authSlice;
export const { setAuth, setAuthF, setValueAuth } = actions;
export default reducer;