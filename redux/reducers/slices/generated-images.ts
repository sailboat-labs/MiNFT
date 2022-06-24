import { createSlice } from "@reduxjs/toolkit";

const generatedImagesStore = createSlice({
  name: "generatedImages",
  initialState: {
    images: [],
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
} = actions;
export default generatedImagesStore;
