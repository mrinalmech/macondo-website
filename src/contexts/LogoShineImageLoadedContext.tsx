import { createContext } from 'react';

export const LogoShineImageLoadedContext = createContext<(name: string) => void>(() => {});
