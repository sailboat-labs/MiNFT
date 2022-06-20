import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const settingsSlice = createSlice({
  name: "settings",
  initialState: {
    blockchain: "solana",

    //collection
    // commission
  },
  reducers: {
    setBlockchain: (state, action: PayloadAction<string>) => {
      state.blockchain = action.payload;
    },
  },
});

export const { setBlockchain } = settingsSlice.actions;
export default settingsSlice;
