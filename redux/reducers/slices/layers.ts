import { createSlice } from "@reduxjs/toolkit";

const layerStore = createSlice({
  name: "layers",
  initialState: {
    layers: [],
  },
  reducers: {
    setLayers: (state, param) => {
      console.log("data", param.payload);

      const { payload } = param;
      state.layers = payload;
    },
  },
});
const { actions, reducer } = layerStore;
export const { setLayers } = actions;
export default layerStore;
