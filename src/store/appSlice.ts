import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { RootState } from './createStore';

interface AppState {
  heroImgsLoaded: boolean;
  logoShineImgsLoaded: boolean;
  steamLoaded: boolean;
  features: {
    allImgsLoaded: boolean;
    loadedImgs: string[];
  };
}

const initialState: AppState = {
  heroImgsLoaded: false,
  logoShineImgsLoaded: false,
  steamLoaded: false,
  features: {
    allImgsLoaded: false,
    loadedImgs: [],
  },
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setHeroImgsLoaded(state, action: PayloadAction<boolean>) {
      state.heroImgsLoaded = action.payload;
    },
    setLogoShineImgsLoaded(state, action: PayloadAction<boolean>) {
      state.logoShineImgsLoaded = action.payload;
    },
    setSteamLoaded(state, action: PayloadAction<boolean>) {
      state.steamLoaded = action.payload;
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

export const { setHeroImgsLoaded, setLogoShineImgsLoaded, setImageLoaded, setSteamLoaded } =
  appSlice.actions;

export const selectHeroImgsLoaded = (state: RootState) => state.app.heroImgsLoaded;
export const selectLogoShineImgsLoaded = (state: RootState) => state.app.logoShineImgsLoaded;
export const selectSteamLoaded = (state: RootState) => state.app.steamLoaded;
export const selectFeaturesImagesLoaded = (state: RootState) => state.app.features.allImgsLoaded;
