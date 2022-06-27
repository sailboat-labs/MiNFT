import { createSlice } from "@reduxjs/toolkit";

const configurationStore = createSlice({
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
const { actions, reducer } = configurationStore;
export const { setConfiguration } = actions;
export default configurationStore;
