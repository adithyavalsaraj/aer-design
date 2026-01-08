import { useEffect, useState } from "react";

export function useHashRouter(defaultPage: string = "home") {
  // Initialize state from URL hash
  const getInitialPage = () => {
    // Check if window is defined (SSR safety, though mostly for client-side)
    if (typeof window === "undefined") return defaultPage;
    const hash = window.location.hash.replace("#/", "");
    return hash || defaultPage;
  };

  const [activePage, setActivePage] = useState(getInitialPage);

  // Sync URL hash with activePage and handle scroll-to-top
  useEffect(() => {
    const hash = `#/${activePage}`;
    if (window.location.hash !== hash) {
      window.history.pushState(null, "", hash);
    }
    window.scrollTo(0, 0);
  }, [activePage]);

  // Handle browser back/forward buttons
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#/", "");
      setActivePage(hash || defaultPage);
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [defaultPage]);

  return { activePage, setActivePage };
}
