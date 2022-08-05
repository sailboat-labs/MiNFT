import { createSlice } from "@reduxjs/toolkit";

const userStore = createSlice({
  name: "user",
  initialState: {
    address: "",
  },
  reducers: {
    setAddress: (state, param) => {
      const { payload } = param;
      state.address = payload;
    },
  },
});
const { actions, reducer } = userStore;
export const { setAddress } = actions;
export default userStore;
