export const getBlockchainType = (state: any) =>
  state.settingsReducer.blockchain;

export const getConfiguration = (state: any) =>
  state.configurationsReducer.configuration;

export const getShowSettings = (state: any) =>
  state.settingsReducer.showSettings;

export const getShowGeneratedTokensPreview = (state: any) =>
  state.settingsReducer.showGeneratedTokensPreview;
