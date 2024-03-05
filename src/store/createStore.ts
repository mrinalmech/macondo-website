import { configureStore } from '@reduxjs/toolkit';
import { appSlice } from './appSlice';

const createStore = () =>
  configureStore({
    reducer: {
      [appSlice.name]: appSlice.reducer,
    },
    devTools: true,
  });

type ConfiguredStore = ReturnType<typeof createStore>;
type StoreGetState = ConfiguredStore['getState'];
export type RootState = ReturnType<StoreGetState>;
export type RootDispatch = ConfiguredStore['dispatch'];

export default createStore;
