/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { createSlice } from "@reduxjs/toolkit";

import { IElement, ILayer } from "@/interfaces";

const layerStore = createSlice({
  name: "layers",
  initialState: {
    layers: [],
    selectedLayerName: null,
    searchFilter: "",
  },
  reducers: {
    setLayers: (state: any, param: any) => {
      const { payload } = param;
      state.layers = payload;
    },

    addLayer: (state: any, param: any) => {
      const { payload } = param;
      state.layers.push(payload);
    },

    setSearchFilter: (state: any, param: any) => {
      state.searchFilter = param.payload;
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

      const isElementSelected = state.layers
        .find((layer: ILayer) => layer.name == payload.layer)
        .elements.find(
          (element: IElement) => element.filename == `${payload.elementName}`
        ).isSelected;

      //If there are already selected traits in a layer, deselect them and select the new one
      state.layers
        .find((layer: ILayer) => layer.name == payload.layer)
        .elements.filter(
          (element: IElement) => element.filename != payload.elementName
        )
        .forEach((element: IElement) => {
          element.isSelected = false;
        });

      if (isElementSelected) {
        state.layers
          .find((layer: ILayer) => layer.name == payload.layer)
          .elements.find(
            (element: IElement) => element.filename == `${payload.elementName}`
          ).isSelected = false;
      } else {
        state.layers
          .find((layer: ILayer) => layer.name == payload.layer)
          .elements.find(
            (element: IElement) => element.filename == `${payload.elementName}`
          ).isSelected = true;
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
    deleteLayer: (state: any, param: any) => {
      const { payload } = param;

      const layerIndex = (state.layers as ILayer[]).findIndex(
        (layer) => layer.name == payload
      );

      if (layerIndex != -1) {
        (state.layers as ILayer[]).splice(layerIndex!, 1);
      }
    },

    addTraitsToLayer: (state: any, param: any) => {
      const { payload } = param;

      const layerName = payload.layerName;
      const elements = payload.elements;

      state.layers
        .find((layer: ILayer) => layer.name == layerName)
        .elements.push(...elements);
    },

    changeLayerName: (state: any, param: any) => {
      const { payload } = param;
      const currentName = payload.currentName;
      const newName = payload.newName;

      const elementData = state.layers.find(
        (layer: ILayer) => layer.name == currentName
      )?.elements;
      if (elementData) {
        const elements = elementData.map((element: IElement) => ({
          ...element,
          trait: newName,
        }));
        state.layers.find(
          (layer: ILayer) => layer.name == currentName
        ).elements = elements;
      }

      state.layers.find((layer: ILayer) => layer.name == currentName).name =
        newName;
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
  addTraitsToLayer,
  changeLayerName,
  setSearchFilter,
  deleteLayer,
  addLayer,
} = actions;
export default layerStore;
