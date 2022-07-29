import { createSlice } from "@reduxjs/toolkit";

const dashboardStore = createSlice({
  name: "dashboard",
  initialState: {
    selectedSidebar: "dashboard-home",
    informationBar: {
      show: false,
      message: "",
      showLoader: false,
    },
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
    setInformationBarConfig: (state: any, param: any) => {
      const { payload } = param;
      const { show, message, showLoader } = payload;
      console.log({ show, message, showLoader });

      state.informationBar.message = message;
      state.informationBar.show = show;
      state.informationBar.showLoader = showLoader;
    },
  },
});
const { actions, reducer } = dashboardStore;
export const {
  setSelectedSidebar,
  setSlideInModalConfig,
  setInformationBarConfig,
} = actions;
export default dashboardStore;
