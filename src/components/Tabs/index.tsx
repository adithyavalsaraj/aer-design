import { TabContent } from "./TabContent";
import { TabList } from "./TabList";
import { Tabs } from "./Tabs";
import { TabTrigger } from "./TabTrigger";

// Add subcomponents to Main Component for easier imports
// e.g. <Tabs.List>
const TabsNamespace = Object.assign(Tabs, {
  List: TabList,
  Trigger: TabTrigger,
  Content: TabContent,
});

export * from "./types";
export { TabContent, TabList, TabsNamespace as Tabs, TabTrigger };
