import { combineReducers } from "redux";
import userStore from "redux/reducers/slices/user";

import configurationStore from "./slices/configuration";
import dashboardStore from "./slices/dashboard";
import generatedImagesStore from "./slices/generated-images";
import layerStore from "./slices/layers";
import settings from "./slices/settings";

const rootReducer = combineReducers({
  userReducer: userStore.reducer,
  layersReducer: layerStore.reducer,
  settingsReducer: settings.reducer,
  generatedImagesReducer: generatedImagesStore.reducer,
  configurationsReducer: configurationStore.reducer,
  dashboardReducer: dashboardStore.reducer,
});

export default rootReducer;
