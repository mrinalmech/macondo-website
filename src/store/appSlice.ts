import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { RootState } from './createStore';

interface AppState {
  appLoaded: boolean;
}

const initialState: AppState = {
  appLoaded: false,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setAppLoaded(state, action: PayloadAction<boolean>) {
      state.appLoaded = action.payload;
    },
  },
});

export const { setAppLoaded } = appSlice.actions;

export const selectAppLoaded = (state: RootState) => state.app.appLoaded;
