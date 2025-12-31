import { createContext, type ReactNode, useContext, useState } from "react";

export interface TOCItem {
  id: string;
  title: string;
}

interface TOCContextType {
  tocItems: TOCItem[] | null;
  setTocItems: (items: TOCItem[] | null) => void;
}

const TOCContext = createContext<TOCContextType | undefined>(undefined);

export function TOCProvider({ children }: { children: ReactNode }) {
  const [tocItems, setTocItems] = useState<TOCItem[] | null>(null);

  return (
    <TOCContext.Provider value={{ tocItems, setTocItems }}>
      {children}
    </TOCContext.Provider>
  );
}

export function useTOC() {
  const context = useContext(TOCContext);
  if (!context) {
    throw new Error("useTOC must be used within a TOCProvider");
  }
  return context;
}
