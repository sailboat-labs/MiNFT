import { createSlice } from "@reduxjs/toolkit";

const generatedImagesStore = createSlice({
  name: "generatedImages",
  initialState: {
    images: [],
    gif: null,
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
    setGeneratedGIF: (state, action) => {
      state.gif = action.payload;
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
  setGeneratedGIF,
} = actions;
export default generatedImagesStore;
