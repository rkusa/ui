import { default as BaseApp } from "next/app";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import { theme } from "../theme";

export default class App extends BaseApp {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Component {...pageProps} />
      </ThemeProvider>
    );
  }
}

const GlobalStyle = createGlobalStyle`
  html, body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    font-weight: 400;
    font-size: 14px;
    background-color: ${props => props.theme.palette.white};
    color: ${props => props.theme.palette.gray800};
    margin: 0;
    padding: 0;
  }

  a,
  a:any-link {
    color: ${({ theme }) => theme.palette.primary};
  }
`;
