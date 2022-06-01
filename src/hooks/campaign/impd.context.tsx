import React, { createContext, ReactNode } from 'react';

import { useGetUserIMPD } from './campaign.hook';

type IMPD = ReturnType<typeof useGetUserIMPD>;

export const IMPDContext = createContext<IMPD>({} as any);

export function IMPDProvider({ children }: { children: ReactNode }) {
  const impd = useGetUserIMPD();

  return <IMPDContext.Provider value={impd}>{children}</IMPDContext.Provider>;
}
