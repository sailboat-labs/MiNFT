import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const settingsSlice = createSlice({
  name: "settings",
  initialState: {
    blockchain: "solana",
    showSettings: false,

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
  },
});

export const { setBlockchain, setShowSettings } = settingsSlice.actions;
export default settingsSlice;
