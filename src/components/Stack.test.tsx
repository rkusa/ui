import { render } from "@testing-library/react";
import { HStack, VStack } from "./Stack";
import { theme } from "../theme";
import { ThemeProvider } from "styled-components";

describe("HStack", () => {
  test("no extra attrs", () => {
    const spy = jest.spyOn(global.console, "error");
    const { getByTestId } = render(
      <ThemeProvider theme={theme}>
        <HStack
          data-testid="stack"
          halign="center"
          valign="middle"
          inline
          allowWrap
          pd
          mt
          mb
        />
      </ThemeProvider>
    );
    const stack = getByTestId("stack");
    expect(stack.getAttributeNames()).toEqual(["data-testid", "class"]);
    expect(spy).not.toHaveBeenCalled();
  });
});

describe("VStack", () => {
  test("no extra attrs", () => {
    const spy = jest.spyOn(global.console, "error");
    const { getByTestId } = render(
      <ThemeProvider theme={theme}>
        <VStack
          data-testid="stack"
          halign="center"
          valign="middle"
          inline
          allowWrap
          pd
          mt
          mb
        />
      </ThemeProvider>
    );
    const stack = getByTestId("stack");
    expect(stack.getAttributeNames()).toEqual(["data-testid", "class"]);
    expect(spy).not.toHaveBeenCalled();
  });
});
