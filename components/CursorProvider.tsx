"use client";

import { createContext, useContext, useMemo, useState } from "react";
import Cursor, { type CursorType } from "./Cursor";

type CursorContextValue = {
  setCursorType: (type: CursorType) => void;
  setCursorHidden: (hidden: boolean) => void;
};

const CursorContext = createContext<CursorContextValue | undefined>(undefined);

type CursorProviderProps = {
  children: React.ReactNode;
};

export function CursorProvider({ children }: CursorProviderProps) {
  const [cursorType, setCursorType] = useState<CursorType>("default");
  const [cursorHidden, setCursorHidden] = useState(false);

  const contextValue = useMemo(
    () => ({
      setCursorType,
      setCursorHidden
    }),
    [setCursorType, setCursorHidden]
  );

  return (
    <CursorContext.Provider value={contextValue}>
      <Cursor type={cursorType} hidden={cursorHidden} />
      {children}
    </CursorContext.Provider>
  );
}

export function useCursor() {
  const context = useContext(CursorContext);
  if (!context) {
    throw new Error("useCursor must be used within a CursorProvider");
  }

  return context;
}

