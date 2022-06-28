/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { createSlice } from "@reduxjs/toolkit";

import { IElement, ILayer } from "@/interfaces";

const layerStore = createSlice({
  name: "layers",
  initialState: {
    layers: [],
    selectedLayerName: null,
  },
  reducers: {
    setLayers: (state: any, param: any) => {
      const { payload } = param;
      state.layers = payload;
    },

    reOrderLayer: (state: any, param: any) => {
      const { payload } = param;
      const currentIndex = payload.currentIndex;
      const nextIndex = payload.nextIndex;
      const layerToMove = state.layers[currentIndex];
      state.layers.splice(currentIndex, 1);
      state.layers.splice(nextIndex, 0, layerToMove);
    },
    selectTraitForPreview: (state: any, param: any) => {
      // const { payload } = param;
      const payload: { layer: string; elementName: string } = param.payload;

      //If there are already selected traits in a layer, deselect them and select the new one
      if (
        (
          state.layers.find(
            (layer: ILayer) => layer.name == payload.layer
          ) as ILayer
        ).elements.some(
          (element: IElement) => element.filename == payload.elementName
        )
      ) {
        state.layers
          .find((layer: ILayer) => layer.name == payload.layer)
          .elements.forEach((element: IElement) => {
            element.isSelected = false;
          });
      }

      state.layers
        .find((layer: ILayer) => layer.name == payload.layer)
        .elements.find(
          (element: IElement) => element.filename == `${payload.elementName}`
        ).isSelected = true;
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
    deleteTrait: (state: any, param: any) => {
      const { payload } = param;

      const layerName = payload.layerName;
      const elementName = payload.elementName;

      console.log({ layerName, elementName });

      const layer = (state.layers as ILayer[]).find(
        (layer) => layer.name == layerName
      );
      const elementIndex = layer?.elements.findIndex(
        (element) => element.filename == elementName
      );
      console.log(elementIndex);

      if (elementIndex != -1) {
        (state.layers as ILayer[])
          .find((layer) => layer.name == layerName)
          ?.elements.splice(elementIndex!, 1);
      }
    },
  },
});
const { actions, reducer } = layerStore;
export const {
  setLayers,
  selectTraitForPreview,
  deletePreviewLayer,
  setSelectedLayerName,
  reOrderLayer,
  deleteTrait,
} = actions;
export default layerStore;
