import { createContext } from 'react';

export const HeroImageLoadedContext = createContext<(name: string) => void>(() => {});
