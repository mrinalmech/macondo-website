import { createContext } from 'react';

export const ImageLoadedContext = createContext<() => void>(() => {});
