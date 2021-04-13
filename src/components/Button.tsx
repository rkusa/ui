import React, { forwardRef, useCallback, useState } from "react";
import styled from "@emotion/styled";
import Spinner from "./Spinner";
import { useDelayedLoading } from "../hooks/useDelayedLoading";
import { Theme } from "../theme";

type ButtonIntent = "primary" | "success" | "danger";

export interface ButtonProps {
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
  naked?: boolean;
  autoFocus?: boolean;
  onAction?(): Promise<void>;
}

const Button = forwardRef<
  HTMLButtonElement,
  ButtonProps & React.HTMLAttributes<HTMLButtonElement>
>(function Button(
  { isLoading, disabled, children, icon, type, onAction, onClick, ...props },
  ref
) {
  const [isExecuting, setExecuting] = useState(false);
  const showLoading = useDelayedLoading(isLoading);

  const handleClick = useCallback(
    async (e) => {
      if (onAction) {
        setExecuting(true);
        try {
          onAction();
        } catch (err) {
          throw err;
        } finally {
          setExecuting(false);
        }
      } else if (onClick) {
        onClick(e);
      }
    },
    [onClick, onAction]
  );

  const currentIcon = showLoading ? (
    <SpinnerStyled intent={props.intent} />
  ) : (
    icon
  );

  return (
    <ButtonStyled
      ref={ref}
      type={type || "button"}
      hasIcon={!!currentIcon}
      hasText={!!children}
      isLoading={isExecuting || isLoading}
      disabled={isExecuting || isLoading || disabled}
      onClick={handleClick}
      {...props}
    >
      {currentIcon && (
        <IconContainer hasText={!!children}>{currentIcon}</IconContainer>
      )}
      {children}
    </ButtonStyled>
  );
});

export default Button;

export interface ButtonLinkProps
  extends Omit<ButtonProps, "type" | "disabled" | "onAction"> {
  href?: string;
  target?: string;
}

export const ButtonLink = forwardRef<
  HTMLAnchorElement,
  ButtonLinkProps & React.HTMLAttributes<HTMLAnchorElement>
>(function ButtonLink({ isLoading, children, icon, ...props }, ref) {
  const showLoading = useDelayedLoading(isLoading);

  const currentIcon = showLoading ? <SpinnerStyled /> : icon;

  return (
    <ButtonLinkStyled
      ref={ref}
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
});

const ButtonStyled = styled.button<{
  hasIcon?: boolean;
  hasText?: boolean;
  isLoading?: boolean;
  intent?: ButtonIntent;
  naked?: boolean;
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

  &:focus {
    outline: 0;
    box-shadow: 0 0 0 2px ${(props) => props.theme.palette.primary} inset;
  }

  ${(props) =>
    !props.naked &&
    `
      background-image: linear-gradient(#00000000, #0000000a);

      &:disabled {
        background-image: linear-gradient(#ffffff3c, #ffffff50);
      }

      &:hover:not(:disabled) {
        background-image: linear-gradient(#0000000a, #00000014);
      }
  `}

  & + &,
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
  naked,
  theme,
}: {
  intent?: ButtonIntent;
  naked?: boolean;
  theme: Theme;
}) {
  if (naked) {
    return "transparent";
  }

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
  naked,
  theme,
}: {
  intent?: ButtonIntent;
  naked?: boolean;
  theme: Theme;
}) {
  if (naked) {
    return "transparent";
  }

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

function color({
  intent,
  naked,
  theme,
}: {
  intent?: ButtonIntent;
  naked?: boolean;
  theme: Theme;
}) {
  if (naked) {
    switch (intent) {
      case "primary":
        return theme.palette.primary;
      case "success":
        return theme.palette.success;
      case "danger":
        return theme.palette.danger;
      default:
        return theme.palette.gray900;
    }
  } else {
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
