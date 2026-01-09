import { AccordionDoc } from "../pages/AccordionDoc";
import { AutocompleteDoc } from "../pages/AutocompleteDoc";
import { AvatarDoc } from "../pages/AvatarDoc";
import { BadgeDoc } from "../pages/BadgeDoc";
import { ButtonDoc } from "../pages/ButtonDoc";
import { CardDoc } from "../pages/CardDoc";
import { CascaderDoc } from "../pages/CascaderDoc";
import { CheckboxDoc } from "../pages/CheckboxDoc";
import { ContributingDoc } from "../pages/ContributingDoc";
import { DialogDoc } from "../pages/DialogDoc";
import { DividerDoc } from "../pages/DividerDoc";
import { DropdownDoc } from "../pages/DropdownDoc";
import { GetStartedDoc } from "../pages/GetStarted";
import { Home } from "../pages/Home";
import { InputDoc } from "../pages/InputDoc";
import { MenuDoc } from "../pages/MenuDoc";
import { NavbarDoc } from "../pages/NavbarDoc";
import { OtpDoc } from "../pages/OtpDoc";
import { OverlayDoc } from "../pages/OverlayDoc";
import { PopoverDoc } from "../pages/PopoverDoc";
import { PositioningDoc } from "../pages/PositioningDoc";
import { RadioDoc } from "../pages/RadioDoc";
import { RoadmapDoc } from "../pages/RoadmapDoc";
import { ShortcutDoc } from "../pages/ShortcutDoc";
import { SidebarDoc } from "../pages/SidebarDoc";
import { SkeletonDoc } from "../pages/SkeletonDoc";
import { TabsDoc } from "../pages/TabsDoc";
import { TextareaDoc } from "../pages/TextareaDoc";
import { ToastDoc } from "../pages/ToastDoc";
import { TooltipDoc } from "../pages/TooltipDoc";
import { UtilitiesDoc } from "../pages/UtilitiesDoc";

interface PageRendererProps {
  activePage: string;
  onGetStarted?: () => void;
}

export function PageRenderer({ activePage, onGetStarted }: PageRendererProps) {
  switch (activePage) {
    case "home":
      return <Home onGetStarted={onGetStarted || (() => {})} />;
    case "getting-started":
      return <GetStartedDoc />;
    case "accordion":
      return <AccordionDoc />;
    case "button":
      return <ButtonDoc />;
    case "badge":
      return <BadgeDoc />;
    case "avatar":
      return <AvatarDoc />;
    case "card":
      return <CardDoc />;
    case "cascader":
      return <CascaderDoc />;
    case "autocomplete":
      return <AutocompleteDoc />;
    case "input":
      return <InputDoc />;
    case "dialog":
      return <DialogDoc />;
    case "divider":
      return <DividerDoc />;
    case "dropdown":
      return <DropdownDoc />;
    case "textarea":
      return <TextareaDoc />;
    case "checkbox":
      return <CheckboxDoc />;
    case "radio":
      return <RadioDoc />;
    case "otp-input":
      return <OtpDoc />;
    case "sidebar":
      return <SidebarDoc />;
    case "navbar":
      return <NavbarDoc />;
    case "menu":
      return <MenuDoc />;
    case "overlay":
      return <OverlayDoc />;
    case "popover":
      return <PopoverDoc />;
    case "skeleton":
      return <SkeletonDoc />;
    case "tooltip":
      return <TooltipDoc />;
    case "toast":
      return <ToastDoc />;
    case "tabs":
      return <TabsDoc />;
    case "utilities":
      return <UtilitiesDoc />;
    case "positioning":
      return <PositioningDoc />;
    case "shortcuts":
      return <ShortcutDoc />;
    case "roadmap":
      return <RoadmapDoc />;
    case "contributing":
      return <ContributingDoc />;
    default:
      return <GetStartedDoc />;
  }
}
