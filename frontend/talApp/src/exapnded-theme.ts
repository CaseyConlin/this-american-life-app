import "@material-ui/core/styles";

declare module "@mui/material/styles" {
  interface Palette {
    buttonFeature: Palette["primary"];
  }

  interface PaletteOptions {
    buttonFeature: PaletteOptions["primary"];
  }

  interface PaletteColor {
    buttonFeature?: string;
  }

  interface SimplePaletteColorOptions {
    buttonFeature?: string;
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    buttonFeature: true;
  }
}
declare module "@mui/material/Chip" {
  interface ChipPropsColorOverrides {
    buttonFeature: true;
  }
}
