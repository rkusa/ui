import React, { ReactNode, useCallback } from "react";
import FocusLock from "react-focus-lock";
import { RemoveScroll } from "react-remove-scroll";
import styled, { keyframes } from "styled-components";
import Portal from "./Portal";

export default function Dialog({
  className,
  children,
  onDismiss,
  entered,
  disableEscDismiss,
  disableOutsideClickDismiss,
}: DialogProps) {
  const handleClick = useCallback(() => {
    if (onDismiss) {
      onDismiss();
    }
  }, [onDismiss]);

  const handleKeyDown = useCallback(
    (e) => {
      if (!disableEscDismiss && onDismiss && e.key === "Escape") {
        onDismiss();
      }
    },
    [disableEscDismiss, onDismiss]
  );

  return (
    <Portal>
      <Backdrop
        onClick={(!disableOutsideClickDismiss && handleClick) || undefined}
        entered={entered !== undefined ? entered : true}
      />
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

export interface DialogProps {
  className?: string;
  children?: ReactNode;
  onDismiss?: () => void;
  entered?: boolean;
  disableEscDismiss?: boolean;
  disableOutsideClickDismiss?: boolean;
}

const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const Backdrop = styled.div<{ entered: boolean }>`
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  z-index: ${(props) => props.theme.zindex.backdrop};
  animation: ${fadeIn} 0.25s ease;
  transition: opacity 0.25s ease;
  opacity: ${(props) => (props.entered ? 1 : 0)};
`;

const DialogContainer = styled.div`
  position: fixed;
  width: 640px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${(props) => props.theme.palette.white};
  margin: auto;
  z-index: ${(props) => props.theme.zindex.dialog};
  padding: 16px;
  box-sizing: border-box;

  @media (max-width: 1024px) {
    width: 100vw;
  }
`;
