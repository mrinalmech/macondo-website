import { createContext } from 'react';

export const ImageLoadedContext = createContext<(name: string) => void>(() => {});
