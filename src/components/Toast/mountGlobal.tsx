import { createRoot } from "react-dom/client";
import { GlobalToastContainer } from "./GlobalToastContainer";

let isContainerMounted = false;

export function ensureGlobalToastContainer() {
  if (typeof document === "undefined") return;
  if (isContainerMounted) return;

  const existingId = "aer-global-toast-container";
  if (document.getElementById(existingId)) {
    isContainerMounted = true;
    return;
  }

  const div = document.createElement("div");
  div.id = existingId;
  document.body.appendChild(div);

  const root = createRoot(div);
  root.render(<GlobalToastContainer />);

  isContainerMounted = true;
}
