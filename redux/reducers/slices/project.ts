import { createSlice } from "@reduxjs/toolkit";

const projectStore = createSlice({
  name: "project",
  initialState: {
    project: {},
  },
  reducers: {
    setProject: (state, param) => {
      const { payload } = param;
      state.project = payload;
    },
  },
});
const { actions, reducer } = projectStore;
export const { setProject } = actions;
export default projectStore;
