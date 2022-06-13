import { createSlice } from "@reduxjs/toolkit";

const userStore = createSlice({
  name: "configuration",
  initialState: {
    name: "",
  },
  reducers: {
    setName: (state, param) => {
      const { payload } = param;
      state.name = payload;
    },
  },
});
const { actions, reducer } = userStore;
export const { setName } = actions;
export default userStore;
