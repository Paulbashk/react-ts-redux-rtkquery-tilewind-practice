import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { githubAPI } from "./github/github.api";
import {setupListeners} from '@reduxjs/toolkit/query';
import { githubReducer } from "./github/github.slice";

const rootReducer = combineReducers({
  [githubAPI.reducerPath]: githubAPI.reducer,
  github: githubReducer
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(githubAPI.middleware)
});

// Необходим для выполнения событий (например, для перезапроса при переключении вкладок)
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;