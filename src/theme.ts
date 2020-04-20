const theme = {
  palette: {
    gray100: "#f0f0f0",
    gray200: "#E0DEE1",
    gray300: "#BCBBBD",
    gray400: "#999999",
    gray500: "#696869",
    gray600: "#50534f",
    gray700: "#3D3F3E",
    gray800: "#292b29",
    gray900: "#080808",
    black: "#000000",
    white: "#ffffff",

    primary: "#30558F",
    success: "#69A655",
    warning: "#A9A100",
    danger: "#9E383C",
  },

  zindex: {
    backdrop: 1000,
    dialog: 1001,
  },
};

export type Theme = typeof theme;

declare module "styled-components" {
  export interface DefaultTheme extends Theme {}
}

export { theme };
