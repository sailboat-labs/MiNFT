import { NFTLayer } from "@/types";
/**
 * returns name of trait groups
 *
 * @param state - redux store
 * @returns {Array.<string>} - string array of trait group
 */
export const getTraitGroups = (state: any) =>
  state.layersReducer.layers.map((layer: NFTLayer) => layer.name) ?? [];

export const getLayers = (state: any) => state.layersReducer.layers ?? [];

export const getGeneratedImages = (state: any) =>
  state.generatedImagesReducer.images ?? [];

export const getPreviewLayers = (state: any) =>
  state.layersReducer.previewLayers ?? [];

export const getLayerOrder = (state: any) =>
  state.layersReducer.layerOrder ?? [];

export const getSelectedLayerName = (state: any) =>
  state.layersReducer.selectedLayerName || null;
