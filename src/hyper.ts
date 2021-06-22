import ColorConfig from "config/color";
import DefaultConfig from "config/default";
import Palette from "enums/Palette";
import Colors from "types/Colors";
import Config from "types/Config";

const transformPaletteToConfig = (palette: Colors, config: Config) => {
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
        padding-left: ${config.hideControls ? "0" : "76px"};
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

      .tabs_title > span {
        display: ${config.hideTabTitle ? "none" : "block"};
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

      .notifications_view {
        animation: ${
          config.hideNotifications ? "fade-out 5s ease-out both" : "none"
        };
      }
    `,
  };
};

export const decorateConfig = (config: any) => {
  const updatedConfig: Config = {
    ...DefaultConfig,
    ...config.updatedConfig,
    appearance: {
      ...DefaultConfig.appearance,
      ...(config.updatedConfig ? config.updatedConfig.appearance : {}),
    },
  };

  let palette = ColorConfig[Palette.Dark];
  const selectedPalette = updatedConfig.palette;

  if (Object.values(Palette).includes(selectedPalette)) {
    palette = ColorConfig[selectedPalette];
  }

  return {
    ...config,
    ...transformPaletteToConfig(palette, updatedConfig),
  };
};

export const reduceUI = (state: any, action: any) => {
  if (
    action.type === "SMOOTH_THEME_CHANGE" ||
    action.type === "CONFIG_RELOAD"
  ) {
    const { config } = action;

    const updatedConfig: Config = {
      ...DefaultConfig,
      ...config.updatedConfig,
      appearance: {
        ...DefaultConfig.appearance,
        ...(config.updatedConfig?.appearance ?? {}),
      },
    };

    const isDarkMode =
      action.type === "CONFIG_RELOAD" ? state.isDarkMode : action.isDarkMode;

    const palette = isDarkMode
      ? ColorConfig[updatedConfig.appearance.dark]
      : ColorConfig[updatedConfig.appearance.light];

    const theme = transformPaletteToConfig(palette, updatedConfig);

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
      if (window.matchMedia("(prefers-color-scheme)").media !== "not all") {
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
