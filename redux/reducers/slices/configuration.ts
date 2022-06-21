import { createSlice } from "@reduxjs/toolkit";

const userStore = createSlice({
  name: "configuration",
  initialState: {
    configuration: {},
  },
  reducers: {
    setConfiguration: (state, param) => {
      const { payload } = param;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      state.configuration[payload.key] = payload.value;
    },
  },
});
const { actions, reducer } = userStore;
export const { setConfiguration } = actions;
export default userStore;
