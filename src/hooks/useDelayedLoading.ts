import { useEffect } from "react";
import useMountedSate from "./usMountedState";

export function useDelayedLoading(isLoading?: boolean) {
  const [showLoading, setShowLoading] = useMountedSate(false);

  // postpone showing the loading indicator until the loading takes more than 600ms
  useEffect(() => {
    if (isLoading) {
      const timeout = setTimeout(() => setShowLoading(true), 500);
      return () => clearTimeout(timeout);
    } else {
      setShowLoading(false);
    }

    return;
  }, [isLoading]);

  return showLoading;
}
