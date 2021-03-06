import React from "react";
import styled from "@emotion/styled";
import isPropValid from "@emotion/is-prop-valid";

interface StackProps {
  inline?: boolean;
  allowWrap?: boolean;
  pd?: boolean;
  mt?: boolean;
  mb?: boolean;
}

type VStackHAlign = "left" | "right" | "center" | "stretch";
type VStackVAlign =
  | "top"
  | "bottom"
  | "middle"
  | "spaceBetween"
  | "spaceAround"
  | "spaceEvenly";

interface VStackAlignmentProps extends StackProps {
  halign?: VStackHAlign;
  valign?: VStackVAlign;
}

interface VStackProps extends VStackAlignmentProps {
  direction: "vertical";
}

type HStackHAlign =
  | "left"
  | "right"
  | "center"
  | "spaceBetween"
  | "spaceAround"
  | "spaceEvenly";
type HStackVAlign = "top" | "bottom" | "middle" | "stretch";

interface HStackAlignmentProps extends StackProps {
  halign?: HStackHAlign;
  valign?: HStackVAlign;
}

interface HStackProps extends HStackAlignmentProps {
  direction: "horizontal";
}

interface ConditionalStackProps extends StackProps {
  direction: "vertical" | "horizontal";
  halign?: VStackHAlign | HStackHAlign;
  valign?: VStackVAlign | HStackVAlign;
}

const Stack = styled("div", {
  shouldForwardProp: (prop) => isPropValid(prop) && prop !== "direction",
})<VStackProps | HStackProps | ConditionalStackProps>`
  display: flex;
  flex-direction: ${({ direction }) =>
    direction === "horizontal" ? "row" : "column"};
  justify-content: ${(props) =>
    props.direction === "horizontal"
      ? hJustifyContent(props)
      : vJustifyContent(props)};
  align-items: ${(props) =>
    props.direction === "horizontal" ? hAlignItems(props) : vAlignItems(props)};
  width: ${({ inline }) => (inline ? "auto" : "100%")};
  flex-grow: ${({ inline }) => (inline ? 0 : 1)};
  flex-wrap: ${({ allowWrap }) => (allowWrap ? "wrap" : "no-wrap")};
  padding: ${({ pd, theme }) => (pd ? `${theme.spacing.default}px 0` : "0")};
  margin-top: ${({ mt, theme }) => (mt ? `${theme.spacing.default}px` : "0")};
  margin-bottom: ${({ mb, theme }) =>
    mb ? `${theme.spacing.default}px` : "0"};
`;

type StackComponentProps = Omit<React.HTMLAttributes<HTMLElement>, "as"> & {
  as?: React.ElementType<any>;
};

function VStack({
  children,
  ...props
}: VStackAlignmentProps & StackComponentProps) {
  return (
    <Stack direction="vertical" {...props}>
      {children}
    </Stack>
  );
}

function HStack({
  children,
  ...props
}: HStackAlignmentProps & StackComponentProps) {
  return (
    <Stack direction="horizontal" {...props}>
      {children}
    </Stack>
  );
}

function vAlignItems(props: VStackProps | HStackProps | ConditionalStackProps) {
  switch (props.halign) {
    case "left":
      return "flex-start";
    case "right":
      return "flex-end";
    case "center":
      return "center";
    case "stretch":
      return "stretch";
    default:
      return "initial";
  }
}

function vJustifyContent(
  props: VStackProps | HStackProps | ConditionalStackProps
) {
  switch (props.valign) {
    case "top":
      return "flex-start";
    case "bottom":
      return "flex-end";
    case "middle":
      return "center";
    case "spaceBetween":
      return "space-between";
    case "spaceAround":
      return "space-around";
    case "spaceEvenly":
      return "space-evenly";
    default:
      return "initial";
  }
}

function hAlignItems(props: VStackProps | HStackProps | ConditionalStackProps) {
  switch (props.valign) {
    case "top":
      return "flex-start";
    case "bottom":
      return "flex-end";
    case "middle":
      return "center";
    case "stretch":
      return "stretch";
    default:
      return "stretch";
  }
}

function hJustifyContent(
  props: VStackProps | HStackProps | ConditionalStackProps
) {
  switch (props.halign) {
    case "left":
      return "flex-start";
    case "right":
      return "flex-end";
    case "center":
      return "center";
    case "spaceBetween":
      return "space-between";
    case "spaceAround":
      return "space-around";
    case "spaceEvenly":
      return "space-evenly";
    default:
      return "center";
  }
}

export { VStack, HStack };
