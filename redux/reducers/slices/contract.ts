import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const contractSlice = createSlice({
  name: "contract",
  initialState: {
    type: "Classic Mint",
    whitelisted: false,
    whitelistDetails: null,
    classicMint: null,
    dutch: null,
    fairDutch: null,
    pureWhitelist: null,
  },
  reducers: {
    setContract: (
      state: any,
      action: PayloadAction<{ key: string; value: any }>
    ) => {
      const { key, value } = action.payload;
      state[key] = value;
    },
    updateWhitelistDetails: (state: any, action: PayloadAction<any>) => {
      state.whitelistDetails = state.whitelistDetails
        ? { ...state.whitelistDetails, ...action.payload }
        : action.payload;
    },
    updateClassicMint: (state: any, action: PayloadAction<any>) => {
      // todo: updates classic mint
      if (state.classicMint === null) {
        state.classicMint = {};
      }

      const { key, value } = action.payload;
      state.classicMint[key] = value;
    },
    updatePureWhitelist: (state: any, action: PayloadAction<any>) => {
      // todo: updates pure whitelist
    },
    updateFairDutch: (state: any, action: PayloadAction<any>) => {
      // todo: updates fair dutch
    },
    updateDutchAuction: (state: any, action: PayloadAction<any>) => {
      // todo: updates dutch auction
    },
  },
});
// const { actions } = contractSlice;

export const {
  setContract,
  updateFairDutch,
  updateClassicMint,
  updateDutchAuction,
  updateWhitelistDetails,
} = contractSlice.actions;
export default contractSlice;
