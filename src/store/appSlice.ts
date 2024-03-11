import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { RootState } from './createStore';

interface AppState {
  appLoaded: boolean;
  features: {
    allImgsLoaded: boolean;
    loadedImgs: string[];
  };
}

const initialState: AppState = {
  appLoaded: false,
  features: {
    allImgsLoaded: false,
    loadedImgs: [],
  },
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setAppLoaded(state, action: PayloadAction<boolean>) {
      state.appLoaded = action.payload;
    },
    setImageLoaded(state, action: PayloadAction<{ imgName: string; imgsNames: string[] }>) {
      const { imgName, imgsNames } = action.payload;

      if (state.features.loadedImgs.findIndex(li => li === imgName) === -1) {
        state.features.loadedImgs.push(imgName);

        if (state.features.loadedImgs.length === imgsNames.length) {
          state.features.allImgsLoaded = true;
        }
      }
    },
  },
});

export const { setAppLoaded, setImageLoaded } = appSlice.actions;

export const selectAppLoaded = (state: RootState) => state.app.appLoaded;
export const selectFeaturesImagesLoaded = (state: RootState) => state.app.features.allImgsLoaded;
