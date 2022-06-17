import { createSlice } from "@reduxjs/toolkit";

const layerStore = createSlice({
  name: "layers",
  initialState: {
    layers: [],
    previewLayers: [],
    dirHandle: "",
  },
  reducers: {
    setLayers: (state, param) => {
      const { payload } = param;
      state.layers = payload;
    },
    setPreviewLayer: (state, param) => {
      const { payload } = param;
      state.previewLayers = payload;
    },

    setDirHandle: (state, param) => {
      const { payload } = param;
      state.dirHandle = payload;
    },
  },
});
const { actions, reducer } = layerStore;
export const { setLayers, setDirHandle, setPreviewLayer } = actions;
export default layerStore;
