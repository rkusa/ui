import React from "react";
import styled, { keyframes } from "styled-components";

export default function Spinner(props: React.HTMLAttributes<HTMLElement>) {
  return <Icon {...props} />;
}

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`;

const makeVisible = keyframes`
  to {
    visibility: visible;
  }
`;

const Icon = styled.i`
  display: inline-block;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 4px solid ${({ theme }) => theme.palette.primary + "4B"};
  border-right: 4px solid ${({ theme }) => theme.palette.primary};
  visibility: hidden;
  animation: ${spin} 1.1s infinite linear,
    0s linear 0.5s forwards ${makeVisible};
`;
