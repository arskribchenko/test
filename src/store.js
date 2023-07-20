import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";

import {
  persistStore,
  persistReducer,
  createMigrate,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";

import appSlice from "./redux/appSlice";
import accountSlice from "./redux/accountSlice";
import customizationSlice from "./redux/customizationSlice";
import searchSlice from "./redux/searchSlice";
import reportSlice from "./redux/reportSlice";

const persistConfig = {
  key: "root",
  version: 2,
  storage,
  stateReconciler: autoMergeLevel2,
  blacklist: ["app.isSplashed", "account.agoraId"],
};

const rootReducer = combineReducers({
  app: appSlice,
  account: accountSlice,
  customization: customizationSlice,
  search: searchSlice,
  report: reportSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});
