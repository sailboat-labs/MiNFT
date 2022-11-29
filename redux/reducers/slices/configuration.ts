import { createSlice } from "@reduxjs/toolkit";

import { enumNFTGenConfig } from "@/enums/nft-gen-configurations";

const configurationStore = createSlice({
  name: "nft_configuration",
  initialState: {
    configuration: {
      [enumNFTGenConfig.RENDER_FORMAT]: "canvas",
      [enumNFTGenConfig.OUTPUT_IMAGE_TYPE]: "PNG",
      [enumNFTGenConfig.RENDER_FORMAT_WIDTH]: 1024,
      [enumNFTGenConfig.RENDER_FORMAT_HEIGHT]: 1024,
      [enumNFTGenConfig.RENDER_QUALITY]: { percentage: 60, name: "Medium" },
      [enumNFTGenConfig.BLOCKCHAIN]: "ethereum",
    },
  },
  reducers: {
    setConfiguration: (state, param) => {
      const { payload } = param;

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      state.configuration[payload.key] = payload.value;
    },
  },
});
const { actions, reducer } = configurationStore;
export const { setConfiguration } = actions;
export default configurationStore;
