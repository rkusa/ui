import React from "react";
import styled from "styled-components";

interface StackProps {
  inline?: boolean;
  pd?: boolean;
  multiLine?: boolean;
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

const Stack = styled.div<VStackProps | HStackProps | ConditionalStackProps>`
  display: flex;
  flex-direction: ${({ direction }) =>
    direction === "horizontal" ? "row" : "column"};
  justify-content: ${props =>
    props.direction === "horizontal"
      ? hJustifyContent(props)
      : vJustifyContent(props)};
  align-items: ${props =>
    props.direction === "horizontal" ? hAlignItems(props) : vAlignItems(props)};
  width: 100%;
  flex-grow: ${({ inline }) => (inline ? 0 : 1)};
  padding: ${({ pd }) => (pd ? "32px 0" : "0")};
  flex-wrap: ${({ multiLine }) => (multiLine ? "wrap" : "no-wrap")};
  margin-top: ${({ mt }) => (mt ? "16px" : "0")};
  margin-bottom: ${({ mb }) => (mb ? "16px" : "0")};
`;

const InlineStack = styled(Stack.withComponent("span"))`
  width: auto;
  flex-grow: 0;
`;

function VStack({
  children,
  ...props
}: React.HTMLAttributes<HTMLElement> & VStackAlignmentProps) {
  return (
    <Stack direction="vertical" {...props}>
      {children}
    </Stack>
  );
}

function HStack({
  children,
  ...props
}: React.HTMLAttributes<HTMLElement> & HStackAlignmentProps) {
  return (
    <Stack direction="horizontal" {...props}>
      {children}
    </Stack>
  );
}

export default Stack;
export { InlineStack, VStack, HStack };

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
