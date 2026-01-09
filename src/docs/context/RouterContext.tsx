import React, { createContext, useContext, useEffect, useState } from "react";

interface RouterContextType {
  activePage: string;
  activeAnchor: string;
  setActivePage: (path: string) => void;
}

const RouterContext = createContext<RouterContextType | undefined>(undefined);

export function RouterProvider({
  children,
  defaultPage = "home",
}: {
  children: React.ReactNode;
  defaultPage?: string;
}) {
  const parseHash = (rawHash: string) => {
    // Handle #/page/anchor or #page/anchor
    const cleanHash = rawHash.replace(/^#\/?/, "");
    const parts = cleanHash.split("/");
    return {
      page: parts[0] || defaultPage,
      anchor: parts[1] || "",
    };
  };

  const [state, setState] = useState(() => parseHash(window.location.hash));
  const isNavigating = React.useRef(false);

  useEffect(() => {
    const handleHashChange = () => {
      // If we are currently scrolling (scroll-spy), don't trigger another setState if it matches
      const nextState = parseHash(window.location.hash);
      if (nextState.page !== state.page || nextState.anchor !== state.anchor) {
        setState(nextState);
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [state]);

  // Handle scrolling when anchor changes (ONLY if triggered by navigation)
  useEffect(() => {
    if (isNavigating.current) {
      isNavigating.current = false;
      if (state.anchor) {
        const timer = setTimeout(() => {
          const element = document.getElementById(state.anchor);
          if (element) {
            const offset = 80; // Topbar height
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.scrollY - offset;

            window.scrollTo({
              top: offsetPosition,
              behavior: "smooth",
            });
          }
        }, 100);
        return () => clearTimeout(timer);
      } else {
        window.scrollTo(0, 0);
      }
    }
  }, [state.page, state.anchor]);

  // Scroll Spy Logic
  useEffect(() => {
    if (state.page === "home") return;

    const handleScroll = () => {
      if (isNavigating.current) return;

      const sections = document.querySelectorAll("div[id], section[id]");
      let currentAnchor = "";

      // Find the section closest to the top of the viewport
      for (const section of sections) {
        const rect = section.getBoundingClientRect();
        if (rect.top >= 0 && rect.top <= 200) {
          currentAnchor = section.id;
          break;
        }
      }

      if (currentAnchor && currentAnchor !== state.anchor) {
        // Update URL hash directly without triggering the navigation effect
        const newHash = `#${state.page}/${currentAnchor}`;
        window.history.replaceState(null, "", newHash);
        // Note: replaceState doesn't trigger hashchange, so we update state manually
        setState((prev) => ({ ...prev, anchor: currentAnchor }));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [state.page, state.anchor]);

  const setActivePage = (path: string) => {
    // path can be "page" or "page/anchor" or "page#anchor" (for compatibility)
    const [page, anchor] = path.includes("#")
      ? path.split("#")
      : path.split("/");
    isNavigating.current = true;
    const newHash = `#${page}${anchor ? `/${anchor}` : ""}`;
    window.location.hash = newHash;
  };

  return (
    <RouterContext.Provider
      value={{
        activePage: state.page,
        activeAnchor: state.anchor,
        setActivePage,
      }}
    >
      {children}
    </RouterContext.Provider>
  );
}

export function useRouter() {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error("useRouter must be used within a RouterProvider");
  }
  return context;
}
