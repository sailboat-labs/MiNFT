import { combineReducers } from "redux";
import userStore from "redux/reducers/slices/user";

import layerStore from "./slices/layers";

const rootReducer = combineReducers({
  userReducer: userStore.reducer,
  layersReducer: layerStore.reducer,
});

export default rootReducer;
