import { createSlice } from "@reduxjs/toolkit";

const dashboardStore = createSlice({
  name: "user",
  initialState: {
    selectedSidebar: "",
  },
  reducers: {
    setSelectedSidebar: (state, param) => {
      const { payload } = param;
      state.selectedSidebar = payload;
    },
  },
});
const { actions, reducer } = dashboardStore;
export const { setSelectedSidebar } = actions;
export default dashboardStore;
