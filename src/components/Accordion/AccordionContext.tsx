import { createContext, useContext } from "react";
import type { AccordionContextType } from "./types";

export const AccordionContext = createContext<AccordionContextType | null>(
  null
);

export const useAccordionContext = () => {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error(
      "Accordion compound components must be used within an Accordion component"
    );
  }
  return context;
};
