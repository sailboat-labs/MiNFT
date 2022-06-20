import { createSlice } from "@reduxjs/toolkit";

const generatedImagesStore = createSlice({
  name: "generatedImages",
  initialState: {
    images: [],
  },
  reducers: {
    addGeneratedImage: (state, param) => {
      const payload = param.payload as any as never;
      state.images.push(payload);
    },
    clearGeneratedImages: (state, _) => {
      state.images = [];
    },
  },
});
const { actions, reducer } = generatedImagesStore;
export const { addGeneratedImage, clearGeneratedImages } = actions;
export default generatedImagesStore;
