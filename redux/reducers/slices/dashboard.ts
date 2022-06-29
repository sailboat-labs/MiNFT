import { createSlice } from "@reduxjs/toolkit";

const dashboardStore = createSlice({
  name: "dashboard",
  initialState: {
    selectedSidebar: "nft-generator",
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
