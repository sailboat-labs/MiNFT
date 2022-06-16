import { createSlice } from "@reduxjs/toolkit";

const layerStore = createSlice({
  name: "layers",
  initialState: {
    layers: [],
    dirHandle: "",
  },
  reducers: {
    setLayers: (state, param) => {
      const { payload } = param;
      state.layers = payload;
    },

    setDirHandle: (state, param) => {
      const { payload } = param;
      state.dirHandle = payload;
    },
  },
});
const { actions, reducer } = layerStore;
export const { setLayers, setDirHandle } = actions;
export default layerStore;
