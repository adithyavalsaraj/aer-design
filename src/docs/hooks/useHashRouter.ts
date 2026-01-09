import { useRouter } from "../context/RouterContext";

export function useHashRouter() {
  const { activePage, activeAnchor, setActivePage } = useRouter();
  return { activePage, activeAnchor, setActivePage };
}
