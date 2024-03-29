import { combineReducers } from "redux";
import userStore from "redux/reducers/slices/user";

import configurationStore from "./slices/configuration";
import contractSlice from "./slices/contract";
import dashboardStore from "./slices/dashboard";
import generatedImagesStore from "./slices/generated-images";
import layerStore from "./slices/layers";
import projectStore from "./slices/project";

const rootReducer = combineReducers({
  userReducer: userStore.reducer,
  contractReducer: contractSlice.reducer,
  layersReducer: layerStore.reducer,
  generatedImagesReducer: generatedImagesStore.reducer,
  configurationsReducer: configurationStore.reducer,
  dashboardReducer: dashboardStore.reducer,
  projectReducer: projectStore.reducer,
});

export default rootReducer;
