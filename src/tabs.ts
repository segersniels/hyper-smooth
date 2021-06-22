import Palette from "enums/Palette";
import Config from "types/Config";
import ColorConfig from "config/color";
import DefaultConfig from "config/default";

const useAppearance = (window: any) => {
  let appearance = {
    isDarkMode: true,
    light: Palette.Light,
    dark: Palette.Dark,
  };

  if (window.matchMedia("(prefers-color-scheme)").media !== "not all") {
    const isDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    const config = window.config.getConfig();
    const updatedConfig: Config = {
      ...DefaultConfig,
      ...config.updatedConfig,
      appearance: {
        ...DefaultConfig.appearance,
        ...(config.updatedConfig ? config.updatedConfig.appearance : {}),
      },
    };

    appearance = {
      isDarkMode,
      ...updatedConfig.appearance,
    };
  }

  return appearance;
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
      const { isDarkMode, light, dark } = useAppearance(window);

      this.setState({
        palette: isDarkMode ? ColorConfig[dark] : ColorConfig[light],
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
      const { isDarkMode, light, dark } = useAppearance(window);

      this.setState({
        palette: isDarkMode ? ColorConfig[dark] : ColorConfig[light],
      });
    }

    render() {
      return React.createElement(Tab, this.props);
    }
  };
};
