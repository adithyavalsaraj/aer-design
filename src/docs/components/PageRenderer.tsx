import { ButtonDoc } from "../pages/ButtonDoc";
import { CheckboxDoc } from "../pages/CheckboxDoc";
import { DropdownDoc } from "../pages/DropdownDoc";
import { GetStartedDoc } from "../pages/GetStarted";
import { InputDoc } from "../pages/InputDoc";
import { MenuDoc } from "../pages/MenuDoc";
import { NavbarDoc } from "../pages/NavbarDoc";
import { OtpDoc } from "../pages/OtpDoc";
import { OverlayDoc } from "../pages/OverlayDoc";
import { PositioningDoc } from "../pages/PositioningDoc";
import { RadioDoc } from "../pages/RadioDoc";
import { ShortcutDoc } from "../pages/ShortcutDoc";
import { SidebarDoc } from "../pages/SidebarDoc";
import { TextareaDoc } from "../pages/TextareaDoc";
import { TooltipDoc } from "../pages/TooltipDoc";
import { UtilitiesDoc } from "../pages/UtilitiesDoc";

interface PageRendererProps {
  activePage: string;
}

export function PageRenderer({ activePage }: PageRendererProps) {
  switch (activePage) {
    case "getting-started":
      return <GetStartedDoc />;
    case "button":
      return <ButtonDoc />;
    case "input":
      return <InputDoc />;
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
    case "tooltip":
      return <TooltipDoc />;
    case "utilities":
      return <UtilitiesDoc />;
    case "positioning":
      return <PositioningDoc />;
    case "shortcuts":
      return <ShortcutDoc />;
    default:
      return <GetStartedDoc />;
  }
}
