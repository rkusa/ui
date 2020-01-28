import React, { ReactNode, useCallback } from "react";
import FocusLock from "react-focus-lock";
import { RemoveScroll } from "react-remove-scroll";
import styled from "styled-components";
import Portal from "./Portal";

export default function Dialog({
  className,
  children,
  onDismiss
}: DialogProps) {
  const handleClick = useCallback(() => {
    if (onDismiss) {
      onDismiss();
    }
  }, [onDismiss]);

  const handleKeyDown = useCallback(
    e => {
      if (onDismiss && e.key === "Escape") {
        onDismiss();
      }
    },
    [onDismiss]
  );

  return (
    <Portal>
      <Backdrop onClick={handleClick} />
      <FocusLock autoFocus returnFocus>
        <RemoveScroll>
          <DialogContainer
            onKeyDown={handleKeyDown}
            className={className}
            aria-modal="true"
            role="dialog"
            tabIndex={-1}
          >
            {children}
          </DialogContainer>
        </RemoveScroll>
      </FocusLock>
    </Portal>
  );
}

interface DialogProps {
  className?: string;
  children?: ReactNode;
  onDismiss?: () => void;
}

const Backdrop = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  z-index: 999;
`;

const DialogContainer = styled.div`
  position: fixed;
  width: 640px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${props => props.theme.palette.white};
  margin: auto;
  z-index: 1000;
  padding: 16px;
  box-sizing: border-box;

  @media (max-width: 1024px) {
    width: 100vw;
  }
`;
