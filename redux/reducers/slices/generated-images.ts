import { createSlice } from "@reduxjs/toolkit";

const generatedImagesStore = createSlice({
  name: "generatedImages",
  initialState: {
    images: [],
    filter: null,
    attributeOccurrence: [],
  },
  reducers: {
    addGeneratedImage: (state, param) => {
      const payload = param.payload as any as never;
      state.images.push(payload);
    },

    clearGeneratedImages: (state, _) => {
      state.images = [];
    },
    setGeneratedImagesFilter: (state, action) => {
      state.filter = action.payload;
    },
    setGeneratedImages: (state, action) => {
      state.images = action.payload;
    },
    setAttributeOccurrence: (state, param) => {
      const payload = param.payload as any as never;
      state.attributeOccurrence.push(payload);
    },
  },
});
const { actions, reducer } = generatedImagesStore;
export const {
  addGeneratedImage,
  clearGeneratedImages,
  setAttributeOccurrence,
  setGeneratedImagesFilter,
  setGeneratedImages,
} = actions;
export default generatedImagesStore;
