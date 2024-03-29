import Palette from "enums/Palette";
import Colors from "types/Colors";

const ColorConfig: Record<Palette, Colors> = {
  [Palette.Dark]: {
    Red: "#eb6f92",
    Yellow: "#f6c177",
    Cyan: "#ebbcba",
    Green: "#00D894",
    Blue: "#00D5D2",
    Magenta: "#AAA2FF",
    Text: "#e0def4",
    SubtleText: "#6e6a86",
    IgnoredText: "#555169",
    Overlay: "#252525",
    Surface: "#1B1B1B",
    Base: "#383838",
    OverlayHighlight: "rgba(246, 193, 119, .4)",
    Highlight: "rgba(246, 193, 119, .2)",
    InactiveHighlight: "rgba(246, 193, 119, .1)",
  },
  [Palette.Light]: {
    Red: "#eb6f92",
    Yellow: "#f6c177",
    Cyan: "#d7827e",
    Green: "#00A572",
    Blue: "#56949f",
    Magenta: "#907aa9",
    Text: "#575279",
    SubtleText: "#6e6a86",
    IgnoredText: "#9893a5",
    Overlay: "#f2e9de",
    Surface: "#fffaf3",
    Base: "#faf4ed",
    OverlayHighlight: "rgba(246, 193, 119, .15)",
    Highlight: "rgba(246, 193, 119, .2)",
    InactiveHighlight: "rgba(246, 193, 119, .1)",
  },
};

export default ColorConfig;
