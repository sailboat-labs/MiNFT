import { createSlice } from "@reduxjs/toolkit";

const dashboardStore = createSlice({
  name: "dashboard",
  initialState: {
    selectedSidebar: "dashboard-home",
    slideInModalConfig: {
      slideFrom: "right",
      show: false,
      componentLabel: "",
    },
  },
  reducers: {
    setSelectedSidebar: (state, param) => {
      const { payload } = param;
      state.selectedSidebar = payload;
    },

    setSlideInModalConfig: (state: any, param: any) => {
      const { payload } = param;
      const key = payload.key;
      const value = payload.value;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      state.slideInModalConfig[key] = value;
    },
  },
});
const { actions, reducer } = dashboardStore;
export const { setSelectedSidebar, setSlideInModalConfig } = actions;
export default dashboardStore;
