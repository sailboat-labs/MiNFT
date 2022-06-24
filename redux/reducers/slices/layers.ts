/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { createSlice } from "@reduxjs/toolkit";

const layerStore = createSlice({
  name: "layers",
  initialState: {
    layers: [],
    layerOrder: [],
    previewLayers: [],
    selectedLayerName: null,
  },
  reducers: {
    setLayers: (state: any, param: any) => {
      const { payload } = param;
      state.layers = payload;
    },
    setLayerOrder: (state: any, param: any) => {
      const { payload } = param;
      state.layerOrder = payload;
    },
    addPreviewLayer: (state: any, param: any) => {
      // const { payload } = param;
      const payload: { layer: string; element: string } = param.payload;
      const isLayerExists = state.previewLayers.some(
        (layer: { layer: string; element: string }) =>
          layer.layer == payload.layer
      );
      if (isLayerExists) {
        //Ignore the red lines

        state.previewLayers.find(
          (layer: any) => layer.layer == payload.layer
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
        )!.element = payload.element;
      } else {
        state.previewLayers.push(payload as never);
      }
    },
    deletePreviewLayer: (state: any, param: any) => {
      const { payload } = param;
      state.previewLayers = state.previewLayers.filter(
        (layer: { layer: string; element: string }) =>
          layer.layer !== payload.layer
      );
    },
    setSelectedLayerName: (state: any, action: any) => {
      state.selectedLayerName = action.payload;
    },
  },
});
const { actions, reducer } = layerStore;
export const {
  setLayers,
  addPreviewLayer,
  deletePreviewLayer,
  setSelectedLayerName,
  setLayerOrder,
} = actions;
export default layerStore;
