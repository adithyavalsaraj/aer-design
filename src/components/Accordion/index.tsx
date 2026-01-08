import { Accordion } from "./Accordion";
import { AccordionTab } from "./AccordionTab";

// Add subcomponents to Main Component for easier imports
// e.g. <Accordion.Tab>
const AccordionNamespace = Object.assign(Accordion, {
  Tab: AccordionTab,
});

export * from "./types";
export { AccordionNamespace as Accordion, AccordionTab };
