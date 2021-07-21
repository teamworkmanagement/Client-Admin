import { createSlice } from "@reduxjs/toolkit";

const testSlice = createSlice(
  {
    name: 'test',
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
  },
);

const { actions, reducer } = testSlice;
export const { changeState } = actions;
export default reducer;