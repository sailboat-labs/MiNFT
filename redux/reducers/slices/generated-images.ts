import { createSlice } from "@reduxjs/toolkit";

const generatedImagesStore = createSlice({
  name: "generatedImagesStore",
  initialState: {
    images: [],
  },
  reducers: {
    addGeneratedImage: (state, param) => {
      const payload = param.payload as any as never;
      state.images.push(payload);
    },
  },
});
const { actions, reducer } = generatedImagesStore;
export const { addGeneratedImage } = actions;
export default generatedImagesStore;
