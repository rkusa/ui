import { css, Global, ThemeProvider, useTheme } from "@emotion/react";
import { default as BaseApp } from "next/app";
import { defaultTheme } from "../theme";

export default class App extends BaseApp {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <ThemeProvider theme={defaultTheme}>
        <GlobalStyle />
        <Component {...pageProps} />
      </ThemeProvider>
    );
  }
}

function GlobalStyle() {
  const theme = useTheme();
  return (
    <Global
      styles={css`
        html,
        body {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica,
            Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
            "Segoe UI Symbol";
          font-weight: 400;
          font-size: 14px;
          background-color: ${theme.palette.white};
          color: ${theme.palette.gray800};
          margin: 0;
          padding: 0;
        }

        a,
        a:any-link {
          color: ${theme.palette.primary};
        }
      `}
    />
  );
}
