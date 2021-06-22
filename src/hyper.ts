import ColorConfig from "config/color";
import Palette from "enums/Palette";
import * as ConfigHelper from "helpers/config";
import Colors from "types/Colors";
import HyperConfig from "types/HyperConfig";

const transformPaletteToConfig = (palette: Colors) => {
  return {
    foregroundColor: palette.Text,
    backgroundColor: palette.Base,
    selectionColor: palette.Highlight,
    cursorColor: palette.IgnoredText,
    cursorAccentColor: palette.Text,
    colors: {
      black: palette.Overlay,
      lightBlack: palette.SubtleText,
      red: palette.Red,
      lightRed: palette.Red,
      green: palette.Green,
      lightGreen: palette.Green,
      yellow: palette.Yellow,
      lightYellow: palette.Yellow,
      blue: palette.Blue,
      lightBlue: palette.Blue,
      magenta: palette.Magenta,
      lightMagenta: palette.Magenta,
      cyan: palette.Cyan,
      lightCyan: palette.Cyan,
      white: palette.Text,
      lightWhite: palette.Text,
    },
    css: `
      .hyper_main {
        border: 0;
        background: ${palette.Base};
      }

      .header_header {
        top: 0;
        left: 0;
        right: 0;
      }

      .tabs_list {
        background: ${palette.Overlay};
        margin-left: 0;
        max-height: 38px;
      }

      .tab_text {
        height: 38px;
        display: flex;
        align-items: center;
      }

      .tab_textInner {
        position: initial;
        width: 100%;
      }

      .tabs_nav {
        color: ${palette.Text};
        height: 38px;
      }

      .tab_tab, .tab_icon {
        color: ${palette.IgnoredText};
      }

      .tab_icon {
        right: 8px;
        top: 11px;
        width: 16px;
        height: 16px;
      }

      .tab_shape {
        width: 8px;
        height: 8px;
      }

      .tab_tab, .tabs_borderShim {
        border-color: transparent !important;
      }

      .tab_tab.tab_active {
        background: ${palette.Base};
      }

      .tab_active .tab_text, .tab_active .tab_icon {
        color: ${palette.Text};
      }

      .xterm-viewport::-webkit-scrollbar-thumb {
        background: ${palette.OverlayHighlight} !important;
      }

      .xterm-viewport::-webkit-scrollbar-thumb:window-inactive {
        background: ${palette.OverlayHighlight} !important;
      }

      .splitpane_divider {
        background-color: ${palette.Overlay} !important;
      }

      @keyframes fade-out {
        0% {
          opacity: 1;
          transform:translate(0);
        }
        90% {
          opacity: 0;
          transform:translate(0);
        }
        100% {
          opacity: 0;
          transform:translate(9999px);
        }
      }
    `,
  };
};

export const decorateConfig = (hyperConfig: HyperConfig) => {
  const config = ConfigHelper.get(hyperConfig);

  return {
    ...hyperConfig,
    ...transformPaletteToConfig(ColorConfig[config.smooth.variant]),
  };
};

interface Action {
  type: string;
  isDarkMode: boolean;
  config: HyperConfig;
}

export const reduceUI = (state: any, action: Action) => {
  if (
    action.type === "SMOOTH_THEME_CHANGE" ||
    action.type === "CONFIG_RELOAD"
  ) {
    const config = ConfigHelper.get(action.config);
    let palette = ColorConfig[config.smooth.variant];
    const isDarkMode =
      action.type === "CONFIG_RELOAD" ? state.isDarkMode : action.isDarkMode;

    // Check if we should apply automatic theming
    if (
      typeof isDarkMode !== "undefined" &&
      !config.smooth.disableAutomaticTheming
    ) {
      palette = isDarkMode
        ? ColorConfig[Palette.Dark]
        : ColorConfig[Palette.Light];
    }

    const theme = transformPaletteToConfig(palette);

    return state
      .set("backgroundColor", theme.backgroundColor)
      .set("foregroundColor", theme.foregroundColor)
      .set("cursorColor", theme.cursorColor)
      .set("selectionColor", theme.selectionColor)
      .set("colors", theme.colors)
      .set("css", theme.css)
      .set("isDarkMode", isDarkMode);
  }

  return state;
};

export const decorateHyper = (Hyper: any, { React }: any) => {
  return class extends React.Component {
    componentDidMount() {
      const config = ConfigHelper.get((window as any).config.getConfig());

      // Dispatch theme changes on color scheme changes
      if (
        window.matchMedia("(prefers-color-scheme)").media !== "not all" &&
        !config.smooth?.disableAutomaticTheming
      ) {
        const darkModeQuery = window.matchMedia("(prefers-color-scheme: dark)");

        (window as any).store.dispatch({
          type: "SMOOTH_THEME_CHANGE",
          config: (window as any).config.getConfig(),
          isDarkMode: darkModeQuery.matches,
        });

        darkModeQuery.addEventListener("change", (event) => {
          (window as any).store.dispatch({
            type: "SMOOTH_THEME_CHANGE",
            config: (window as any).config.getConfig(),
            isDarkMode: event.matches,
          });
        });
      }
    }

    render() {
      return React.createElement(Hyper, this.props);
    }
  };
};
