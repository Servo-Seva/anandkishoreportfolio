import { useEffect, useRef } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

const scrollPositions = new Map<string, number>();

export function useScrollRestoration() {
  const location = useLocation();
  const navigationType = useNavigationType();
  const prevKey = useRef<string>(location.key);

  // Save scroll position continuously
  useEffect(() => {
    const saveScrollPosition = () => {
      scrollPositions.set(location.key, window.scrollY);
    };

    // Save on scroll
    window.addEventListener("scroll", saveScrollPosition, { passive: true });
    window.addEventListener("beforeunload", saveScrollPosition);

    return () => {
      window.removeEventListener("scroll", saveScrollPosition);
      window.removeEventListener("beforeunload", saveScrollPosition);
    };
  }, [location.key]);

  // Handle navigation
  useEffect(() => {
    // Save position of previous page before handling new navigation
    if (prevKey.current !== location.key) {
      // Position was already saved via scroll event
      prevKey.current = location.key;
    }

    if (navigationType === "POP") {
      // Back/forward button - restore position
      const savedPosition = scrollPositions.get(location.key);
      if (savedPosition !== undefined) {
        // Use setTimeout to ensure DOM has rendered
        setTimeout(() => {
          window.scrollTo(0, savedPosition);
        }, 0);
      }
    } else if (navigationType === "PUSH") {
      // New navigation - scroll to top
      window.scrollTo(0, 0);
    }
    // REPLACE - do nothing, keep current position
  }, [location.key, navigationType]);
}
