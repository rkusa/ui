import React, { useEffect, useState, useCallback } from "react";
import Dialog from "./Dialog";
import styled from "@emotion/styled";
import { X } from "react-feather";

interface Props {
  title: string;
  className?: string;
  children?: React.ReactNode;
  onDismiss: () => void;
}

// TODO:
// - aria stuff on close Button
export default function SideSheet({
  title,
  className,
  children,
  onDismiss,
}: Props) {
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    setTimeout(() => setEntered(true));
  }, []);

  const handleClose = useCallback(() => {
    setEntered(false);
    setTimeout(onDismiss, 250);
  }, [onDismiss]);

  return (
    <>
      <DialogStyled
        onDismiss={handleClose}
        entered={entered}
        className={className}
      >
        <Header>
          <h2>{title}</h2>
          <Button onClick={handleClose}>
            <X />
          </Button>
        </Header>

        {children}
      </DialogStyled>
    </>
  );
}

const DialogStyled = styled(Dialog)<{ entered: boolean; width?: number }>`
  width: ${(props) => `${props.width || 512}px`};
  height: 100%;
  top: 0;
  bottom: 0;
  right: 0;
  transition: transform 0.25s ease;
  transform: translateX(${(props) => (props.entered ? 0 : "100%")});
  box-shadow: rgba(0, 0, 0, 0.05) -1px 0px 2px 0px;
  background-color: ${(props) => props.theme.palette.gray200};
  margin: 0;
  left: auto;
  padding: 32px 64px;
  overflow-y: auto;
  overflow-x: hidden;

  @media (max-width: ${(props) => `${props.width || 512}px`}) {
    width: 100vw;
    left: 0;
  }

  @media (max-width: 575px) {
    padding: 32px 16px;
  }
`;

const Header = styled.header`
  position: relative;
  text-align: center;
  margin-bottom: 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h2 {
    margin: 0.5em 0;
  }
`;

// TODO: replace with shared button style
const Button = styled.button`
  color: ${(props) => props.theme.palette.gray400};
  cursor: pointer;

  &,
  &:hover,
  &:active,
  &:focus {
    background: none;
    border: none;
  }

  @media (max-width: 575px) {
    right: -8px;
  }
`;
