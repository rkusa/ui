import React from "react";
import styled from "styled-components";
import Spinner from "./Spinner";
import { useDelayedLoading } from "../hooks/useDelayedLoading";
import { Theme } from "../theme";

type ButtonIntent = "primary" | "success" | "danger";

interface ButtonProps {
  align?:
    | "left"
    | "right"
    | "top"
    | "bottom"
    | "center"
    | "baseline"
    | "stretch";
  type?: "button" | "submit" | "reset";
  isLoading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  intent?: ButtonIntent;
  autoFocus?: boolean;
}

export default function Button({
  isLoading,
  disabled,
  children,
  icon,
  type,
  ...props
}: ButtonProps & React.HTMLAttributes<HTMLButtonElement>) {
  const showLoading = useDelayedLoading(isLoading);

  const currentIcon = showLoading ? (
    <SpinnerStyled intent={props.intent} />
  ) : (
    icon
  );

  return (
    <ButtonStyled
      type={type || "button"}
      hasIcon={!!currentIcon}
      hasText={!!children}
      isLoading={isLoading}
      disabled={isLoading || disabled}
      {...props}
    >
      {currentIcon && (
        <IconContainer hasText={!!children}>{currentIcon}</IconContainer>
      )}
      {children}
    </ButtonStyled>
  );
}

interface ButtonLinkProps extends Omit<ButtonProps, "type" | "disabled"> {
  href?: string;
  target?: string;
}

export function ButtonLink({
  isLoading,
  children,
  icon,
  ...props
}: ButtonLinkProps & React.HTMLAttributes<HTMLAnchorElement>) {
  const showLoading = useDelayedLoading(isLoading);

  const currentIcon = showLoading ? <SpinnerStyled /> : icon;

  return (
    <ButtonLinkStyled
      hasIcon={!!currentIcon}
      hasText={!!children}
      isLoading={isLoading}
      {...props}
    >
      {currentIcon && (
        <IconContainer hasText={!!children}>{currentIcon}</IconContainer>
      )}
      {children}
    </ButtonLinkStyled>
  );
}

export const ButtonStyled = styled.button<{
  hasIcon?: boolean;
  hasText?: boolean;
  isLoading?: boolean;
  intent?: ButtonIntent;
  disabled?: boolean;
}>`
  display: inline-flex;
  align-items: center;
  font-size: 1rem;
  border: none;
  border-radius: 4px;
  cursor: ${({ isLoading, disabled }) =>
    isLoading ? "progress" : disabled ? "auto" : "pointer"};
  align-self: ${alignSelf};
  text-decoration: none;
  padding: ${padding};
  background-color: ${backgroundColor};
  background-image: linear-gradient(#00000000, #0000000a);
  border: 1px solid ${borderColor};
  box-sizing: border-box;
  height: 34px;
  font-family: inherit;
  white-space: nowrap;

  &,
  &:any-link {
    color: ${color};
    margin: 0;
  }

  &:disabled {
    background-image: linear-gradient(#ffffff3c, #ffffff50);
  }

  &:focus {
    outline: 0;
    box-shadow: 0 0 0 2px ${(props) => props.theme.palette.primary} inset;
  }

  &:hover:not(:disabled) {
    background-image: linear-gradient(#0000000a, #00000014);
  }

  & + button {
    margin-left: 4px;
  }
`;

function padding(props: {
  hasIcon?: boolean;
  hasText?: boolean;
  isLoading?: boolean;
}) {
  if (props.hasText) {
    return props.hasIcon ? "0 14px 0 10px" : "0 22px";
  } else {
    return "0 8px";
  }
}

function backgroundColor({
  intent,
  theme,
}: {
  intent?: ButtonIntent;
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
      return theme.palette.white;
  }
}

function borderColor({
  intent,
  theme,
}: {
  intent?: ButtonIntent;
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
      return theme.palette.gray300;
  }
}

function color({ intent, theme }: { intent?: ButtonIntent; theme: Theme }) {
  switch (intent) {
    case "primary":
      return theme.palette.white;
    case "success":
      return theme.palette.white;
    case "danger":
      return theme.palette.white;
    default:
      return theme.palette.gray900;
  }
}

const ButtonLinkStyled = ButtonStyled.withComponent("a");

const SpinnerStyled = styled(Spinner)`
  width: 16px;
  height: 16px;
  border-width: 3px;
  box-sizing: border-box;
  visibility: visible;
`;

function alignSelf(props: ButtonProps) {
  switch (props.align) {
    case "left":
    case "top":
      return "flex-start";
    case "right":
    case "bottom":
      return "flex-start";
    case "center":
      return "center";
    case "baseline":
      return "baseline";
    case "stretch":
      return "stretch";
    default:
      return "initial";
  }
}

const IconContainer = styled.span<{ hasText?: boolean }>`
  display: inline-block;
  width: ${(props) => (props.hasText ? "16px" : "20px")};
  margin-right: ${(props) => (props.hasText ? "4px" : "0")};
  box-sizing: border-box;
  padding-top: 3px;

  svg {
    width: auto;
    max-height: ${(props) => (props.hasText ? "16px" : "20px")};
  }
`;
