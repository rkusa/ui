import React from 'react'
import { render } from "@testing-library/react";
import { HStack, VStack } from "./Stack";
import { defaultTheme } from "../theme";
import { ThemeProvider } from "@emotion/react";

describe("HStack", () => {
  test("no extra attrs", () => {
    const spy = jest.spyOn(global.console, "error");
    const { getByTestId } = render(
      <ThemeProvider theme={defaultTheme}>
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
      <ThemeProvider theme={defaultTheme}>
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
