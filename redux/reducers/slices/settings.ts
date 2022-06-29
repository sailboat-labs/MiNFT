import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const settingsSlice = createSlice({
  name: "settings",
  initialState: {
    blockchain: "ethereum",
    showSettings: false,
    showGeneratedTokensPreview: false,

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
    setShowGeneratedTokensPreview: (state: any, param: any) => {
      const { payload } = param;
      state.showGeneratedTokensPreview = payload;
    },
  },
});

export const { setBlockchain, setShowSettings, setShowGeneratedTokensPreview } =
  settingsSlice.actions;
export default settingsSlice;
