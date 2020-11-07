const defaultTheme = {
  palette: {
    gray100: "hsl(213, 6%, 96%)",
    gray200: "hsl(213, 6%, 88%)",
    gray300: "hsl(213, 6%, 76%)",
    gray400: "hsl(213, 6%, 65%)",
    gray500: "hsl(213, 6%, 46%)",
    gray600: "hsl(213, 6%, 29%)",
    gray700: "hsl(213, 6%, 21%)",
    gray800: "hsl(213, 6%, 14%)",
    gray900: "hsl(213, 6%, 7%)",

    white: "hsl(0, 0%, 98%)",
    black: "hsl(0, 0%, 2%)",

    primary: "#30558F",
    success: "#69A655",
    warning: "#A9A100",
    danger: "#9E383C",
  },

  zindex: {
    backdrop: 1000,
    dialog: 1001,
  },

  spacing: {
    default: 16,
  },
};

export type Theme = typeof defaultTheme;

declare module "@emotion/react" {
  type DerivedTheme = typeof defaultTheme;

  export interface Theme extends DerivedTheme {}
}

export { defaultTheme };
