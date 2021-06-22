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
    Overlay: "#26233a",
    Surface: "#1f1d2e",
    Base: "#383838",
    OverlayHighlight: "rgba(110, 106, 134, .4)",
    Highlight: "rgba(110, 106, 134, .2)",
    InactiveHighlight: "rgba(110, 106, 134, .1)",
  },
  [Palette.Light]: {
    Red: "#eb6f92",
    Yellow: "#f6c177",
    Cyan: "#ebbcba",
    Green: "#00D894",
    Blue: "#00D5D2",
    Magenta: "#AAA2FF",
    Text: "#575279",
    SubtleText: "#6e6a86",
    IgnoredText: "#9893a5",
    Overlay: "#f2e9de",
    Surface: "#fffaf3",
    Base: "#faf4ed",
    OverlayHighlight: "rgba(110, 106, 134, .15)",
    Highlight: "rgba(110, 106, 134, .08)",
    InactiveHighlight: "rgba(110, 106, 134, .05)",
  },
};

export default ColorConfig;
