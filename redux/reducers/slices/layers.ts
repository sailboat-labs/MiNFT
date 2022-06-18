import { createSlice } from "@reduxjs/toolkit";

const layerStore = createSlice({
  name: "layers",
  initialState: {
    layers: [],
    previewLayers: [],
  },
  reducers: {
    setLayers: (state, param) => {
      const { payload } = param;
      state.layers = payload;
    },
    addPreviewLayer: (state, param) => {
      // const { payload } = param;
      const payload: { layer: string; element: string } = param.payload;
      const isLayerExists = state.previewLayers.some(
        (layer: { layer: string; element: string }) =>
          layer.layer == payload.layer
      );
      if (isLayerExists) {
        state.previewLayers = state.previewLayers.filter(
          (layer: { layer: string; element: string }) =>
            layer.layer !== payload.layer
        );
      }
      state.previewLayers.push(payload as never);
    },
    deletePreviewLayer: (state, param) => {
      const { payload } = param;
      state.previewLayers = state.previewLayers.filter(
        (layer: { layer: string; element: string }) =>
          layer.layer !== payload.layer
      );
    },
  },
});
const { actions, reducer } = layerStore;
export const { setLayers, addPreviewLayer, deletePreviewLayer } = actions;
export default layerStore;
