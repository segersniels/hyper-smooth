import ColorConfig from "config/color";
import Palette from "enums/Palette";
import * as ConfigHelper from "helpers/config";

const checkIfDarkMode = (window: any) => {
  if (window.matchMedia("(prefers-color-scheme)").media !== "not all") {
    const isDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    return isDarkMode;
  }

  return true;
};

export const decorateTabs = (Tabs: any, { React }: any) => {
  return class extends React.Component {
    constructor(props: any) {
      super(props);

      this.state = {
        palette: ColorConfig[Palette.Dark],
      };
    }

    componentDidMount() {
      const isDarkMode = checkIfDarkMode(window);
      const config = ConfigHelper.get((window as any).config.getConfig());
      const palette = ColorConfig[config.smooth.variant];

      this.setState({
        palette:
          typeof isDarkMode === "undefined"
            ? palette
            : isDarkMode
            ? ColorConfig[Palette.Dark]
            : ColorConfig[Palette.Light],
      });
    }

    render() {
      return React.createElement(Tabs, this.props);
    }
  };
};

export const decorateTab = (Tab: any, { React }: any) => {
  return class extends React.Component {
    constructor(props: any) {
      super(props);

      this.state = {
        palette: ColorConfig[Palette.Dark],
      };
    }

    componentDidMount() {
      const isDarkMode = checkIfDarkMode(window);
      const config = ConfigHelper.get((window as any).config.getConfig());
      const palette = ColorConfig[config.smooth.variant];

      this.setState({
        palette:
          typeof isDarkMode === "undefined"
            ? palette
            : isDarkMode
            ? ColorConfig[Palette.Dark]
            : ColorConfig[Palette.Light],
      });
    }

    render() {
      return React.createElement(Tab, this.props);
    }
  };
};
