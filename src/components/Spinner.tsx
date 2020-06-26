import React from "react";
import styled, { keyframes } from "styled-components";
import { Theme } from "../theme";
import { lighten, darken } from "polished";

type SpinnerIntent = "primary" | "success" | "danger";

interface SpinnerProps extends React.HTMLAttributes<HTMLElement> {
  intent?: SpinnerIntent;
}

export default function Spinner({ intent, ...rest }: SpinnerProps) {
  return <Icon intent={intent} {...rest} />;
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

const Icon = styled.i<{ intent?: SpinnerIntent }>`
  display: inline-block;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 4px solid
    ${({ theme, intent }) =>
      lighten(!intent ? 0.5 : 0.4, borderColor({ theme, intent }))};
  border-right: 4px solid
    ${({ theme, intent }) =>
      !intent
        ? borderColor({ theme, intent })
        : darken(0.2, borderColor({ theme, intent }))};
  visibility: hidden;
  animation: ${spin} 1.1s infinite linear,
    0s linear 0.5s forwards ${makeVisible};
`;

function borderColor({
  intent,
  theme,
}: {
  intent?: SpinnerIntent;
  theme: Theme;
}) {
  switch (intent) {
    case "primary":
      return theme.palette.primary;
    case "success":
      return theme.palette.success;
    case "danger":
      return theme.palette.danger;
    default:
      return theme.palette.primary;
  }
}
