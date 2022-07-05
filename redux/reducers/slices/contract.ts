import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const contractSlice = createSlice({
  name: "contract",
  initialState: {
    type: "Classic Mint",
    whitelisted: false,
    whitelistDetails: null,
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
  },
});
const { actions } = contractSlice;
export const { setContract, updateWhitelistDetails } = actions;
export default contractSlice;
