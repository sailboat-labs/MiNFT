import { createSlice } from "@reduxjs/toolkit";

const contractSlice = createSlice({
  name: "contract",
  initialState: {
    type: "Classic Mint",
    whitelist: false,
  },
  reducers: {
    setContract: (state: any, action: any) => {
      const { key, value } = action.payload;
      state[key] = value;
    },
  },
});
const { actions } = contractSlice;
export const { setContract } = actions;
export default contractSlice;
