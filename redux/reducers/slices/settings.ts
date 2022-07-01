import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const settingsSlice = createSlice({
  name: "settings",
  initialState: {
    blockchain: "ethereum",
    showSettings: false,
    showGeneratedTokensPreview: false,

    renderSettings: {
      system: "canvas",
      format: "PNG",
      width: 100,
      height: 100,
      quality: { percentage: 60, name: "Medium" },
    },

    //collection
    // commission
  },
  reducers: {
    setBlockchain: (state, action: PayloadAction<string>) => {
      state.blockchain = action.payload;
    },
    setShowSettings: (state: any, param: any) => {
      const { payload } = param;
      state.showSettings = payload;
    },
    setRenderSystem: (state, action: PayloadAction<string>) => {
      state.renderSettings.system = action.payload;
    },
    setRenderFormat: (state, action: PayloadAction<string>) => {
      state.renderSettings.format = action.payload;
    },
    setRenderWidth: (state, action: PayloadAction<number>) => {
      state.renderSettings.width = action.payload;
    },
    setRenderQuality: (
      state,
      action: PayloadAction<{ percentage: number; name: string }>
    ) => {
      state.renderSettings.quality = action.payload;
    },
    setRenderHeight: (state, action: PayloadAction<number>) => {
      state.renderSettings.height = action.payload;
    },
    setShowGeneratedTokensPreview: (state: any, param: any) => {
      const { payload } = param;
      state.showGeneratedTokensPreview = payload;
    },
  },
});

export const {
  setBlockchain,
  setRenderWidth,
  setShowSettings,
  setRenderFormat,
  setRenderHeight,
  setRenderSystem,
  setRenderQuality,
  setShowGeneratedTokensPreview,
} = settingsSlice.actions;
export default settingsSlice;
