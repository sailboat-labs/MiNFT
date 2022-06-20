import { createSlice } from "@reduxjs/toolkit";

const layerStore = createSlice({
  name: "layers",
  initialState: {
    layers: [],
    previewLayers: [
      {
        id: 1,
        name: "Background",
        blendmode: "source-over",
        opacity: 1,
        elements: [
          {
            sublayer: false,
            weight: 3,
            blendmode: "source-over",
            opacity: 1,
            id: 2,
            name: "BG-1",
            filename: "",
            path: "",
            zindex: "1",
            trait: "BG-#110",
            traitValue: "",
          },
        ],
      },
      {
        id: 1,
        name: "Bling",
        blendmode: "source-over",
        opacity: 1,
        elements: [
          {
            sublayer: false,
            weight: 3,
            blendmode: "source-over",
            opacity: 1,
            id: 2,
            name: "Bling-1",
            filename: "",
            path: "",
            zindex: "1",
            trait: "Bling-#110",
            traitValue: "",
          },
        ],
      },
      {
        id: 1,
        name: "Eyes",
        blendmode: "source-over",
        opacity: 1,
        elements: [
          {
            sublayer: false,
            weight: 3,
            blendmode: "source-over",
            opacity: 1,
            id: 2,
            name: "Eyes-1",
            filename: "",
            path: "",
            zindex: "1",
            trait: "Eyes-#110",
            traitValue: "",
          },
        ],
      },
    ],
    dirHandle: "",
  },
  reducers: {
    setLayers: (state, param) => {
      const { payload } = param;
      state.layers = payload;
    },
    /**
     *
     * @param state - redux state object
     * @param param - redux action object
     * @returns {undefined}
     */
    pushPreviewLayer: (state, param) => {
      const { payload } = param; // payload should be an ILayer Object with one item in elements array
      const foundLayerIndex = [...state.previewLayers].findIndex(
        (layer) => layer.name === payload
      );
      if (foundLayerIndex > -1) {
        state.previewLayers = [...state.previewLayers].splice(
          foundLayerIndex,
          1,
          payload
        );
        return;
      }

      state.previewLayers = payload;
    },
    /**
     * removes a preview layer
     *
     * @param {Object} state - redux state object
     * @param {Object} param - redux action object. payload property in object should be a string of the name of the layer to remove
     * @returns {undefined}
     */
    removePreviewLayer: (state, param) => {
      state.previewLayers = [...state.previewLayers].filter(
        (layer) => layer.name !== param.payload
      );
    },
    setDirHandle: (state, param) => {
      const { payload } = param;
      state.dirHandle = payload;
    },
  },
});
const { actions, reducer } = layerStore;
export const { setLayers, setDirHandle, pushPreviewLayer, removePreviewLayer } =
  actions;
export default layerStore;
