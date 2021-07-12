import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authApi from "./api/authApi";

export const islogin = createAsyncThunk("auth/isLogin", async () => {
  const data = await authApi.isLogin();
  console.log("data redux là: ", data);
  return data;
});

const appSlice = createSlice(
  {
    name: 'app',
    initialState: {
      sidebarShow: 'responsive'
    },
    reducers:
    {
      changeState(state, payload) {
        if (payload.payload.type === 'set') {
          state.sidebarShow = payload.payload.sidebarShow;
        }
      }
    },

    extraReducers: {
      [islogin.fulfilled]: (state, action) => {
        
      },
      [islogin.rejected]: (state, action) => { },
    },
  },
);

const { actions, reducer } = appSlice;
export const { changeState } = actions; // named export
export default reducer; // default export