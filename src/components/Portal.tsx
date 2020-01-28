import { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";

const PORTAL_CONTAINER_ID = "rkusa-ui-portal-container";

export default function Portal({ children }: PortalProps) {
  const [container, setContainer] = useState<HTMLElement | null>(() =>
    typeof document !== "undefined"
      ? document.getElementById(PORTAL_CONTAINER_ID)
      : null
  );

  useEffect(() => {
    if (container) {
      return;
    }

    let newContainer = document.getElementById(PORTAL_CONTAINER_ID);
    if (!newContainer) {
      newContainer = document.createElement("div");
      newContainer.setAttribute("id", PORTAL_CONTAINER_ID);
      document.body.appendChild(newContainer);
    }
    setContainer(newContainer);
  }, [container]);

  if (container) {
    return createPortal(children, container);
  } else {
    return null;
  }
}

interface PortalProps {
  children?: ReactNode;
}
